import { useUserStore } from '../stores/userStore'
import { getAccessToken, setAccessToken } from './tokenStore'

/**
 * This is general apiClient that handles access token and refresh token logic.
 * AccessToken is keept in memory (tokenStore) and injected to header Authorization.
 * Refresh token is stored in httpOnly cookie and used to get a new access token when needed.
 * So you need Restful server that implements refresh token endpoints and returns new access tokens accordingly.
 *
 */

const API_BASE_URL = 'http://localhost:3000'

type ApiOptions = RequestInit & { skipAuth?: boolean }

/**
 * Odpowiedź serwera z kodem != 2xx (ale request w ogóle doszedł — to nie jest
 * błąd sieci). Niesie `status`, żeby konsument (np. queryClient) mógł podjąć
 * decyzję bez parsowania message'a, np. "4xx = nie retry'uj, to nie kwestia sieci".
 */
export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

/**
 * Rzucany tylko wtedy, gdy próba odświeżenia tokenu (POST /auth/refresh)
 * zawiodła — czyli refresh-cookie jest nieważny/wygasł. To sygnał "sesja jest
 * martwa": apiClient przy okazji już wylogował usera (patrz catch niżej),
 * więc kolejne retry przez React Query nie mają sensu — i po tym błędzie
 * je wyłączamy (zobacz `shouldRetry` w lib/queryClient.ts).
 */
export class AuthError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'AuthError'
    }
}

// Odświeżanie w toku jest współdzielone (jeden Promise na wszystkie równoległe
// 401), żeby np. 3 zapytania odpalone naraz nie wywołały 3x POST /auth/refresh
// — druga i trzecia "poczekają" na tę samą, już trwającą próbę.
let refreshPromise: Promise<string> | null = null

/** Woła backend po nowy access token, korzystając z httpOnly refresh-cookie. */
async function refreshAccessToken(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/v1/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // wysyła httpOnly cookie z refresh tokenem
    })

    if (!response.ok) {
        throw new Error('Refresh token invalid or expired')
    }

    const data: { accessToken: string } = await response.json()
    return data.accessToken
}

/**
 * Zwraca trwający refresh, jeśli jakiś jest w toku, zamiast startować nowy.
 * `finally` czyści `refreshPromise`, żeby KOLEJNY 401 (już po zakończeniu tego
 * refreshu) odpalił nową, świeżą próbę zamiast dostać stary, rozstrzygnięty Promise.
 */
function getOrCreateRefreshPromise(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null
        })
    }
    return refreshPromise
}

/**
 * Bootstrap sesji przy starcie appki: F5 zeruje tokenStore i userStore (żyją
 * tylko w JS), ale httpOnly refresh-cookie przeżywa reload. Bez tego wywołania
 * RequireAuth widziałby isLogged=false zanim cokolwiek zdążyłoby się odświeżyć
 * i przekierowywałby na /login mimo wciąż ważnej sesji po stronie serwera.
 * Reużywa `getOrCreateRefreshPromise`, więc dzieli tę samą deduplikację co
 * reaktywny refresh w apiClient().
 */
export async function restoreSession(): Promise<boolean> {
    try {
        const token = await getOrCreateRefreshPromise()
        setAccessToken(token)
        useUserStore.getState().actions.login()
        return true
    } catch {
        return false
    }
}

/**
 * Nagłówki requestu: Content-Type zawsze, Authorization tylko gdy mamy token
 * i request go potrzebuje (patrz `skipAuth` w apiClient). `extra` na końcu,
 * żeby wywołujący mógł nadpisać dowolny z tych nagłówków przez `options.headers`.
 */
function buildHeaders(accessToken: string | null, extra?: HeadersInit): HeadersInit {
    return {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...extra,
    }
}

/**
 * fetch wrapper: dokłada access token, a po 401 próbuje jednorazowo odświeżyć
 * token przez refresh-cookie i powtórzyć request.
 *
 * Przebieg dla typowego requestu, który trafi na wygasły token:
 *  1. request leci z aktualnym (już nieważnym) access tokenem -> 401
 *  2. odpalamy/dołączamy się do refreshu (POST /auth/refresh, cookie)
 *  3. nowy token trafia do tokenStore, request jest powtarzany z nim raz
 *  4. jeśli refresh się nie uda (cookie martwe) -> logout + AuthError, bez
 *     kolejnych prób (nie ma sensu próbować dalej bez ważnej sesji)
 *
 * `skipAuth` jest po to, żeby np. request logowania (który z definicji jeszcze
 * nie ma tokenu) nie próbował dokładać Authorization ani reagować na 401 tak,
 * jakby to był wygasły token.
 */
export async function apiClient(path: string, options: ApiOptions = {}): Promise<Response> {
    const { skipAuth, headers, ...rest } = options
    const accessToken = getAccessToken()

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: buildHeaders(skipAuth ? null : accessToken, headers),
        credentials: 'include',
    })

    // Brak 401 (albo request jawnie omija auth) -> nic do zrobienia, oddajemy
    // odpowiedź tak, jak przyszła (nawet jeśli to inny błąd, np. 500 — to nie
    // nasza sprawa tutaj, obsłuży to apiRequest/konsument).
    if (response.status !== 401 || skipAuth) {
        return response
    }

    try {
        // Tu może się "zawiesić" na cudzym, już trwającym refreshu — to celowe.
        const newAccessToken = await getOrCreateRefreshPromise()
        setAccessToken(newAccessToken)

        // Powtórka orginalnego requestu — RAZ, z nowym tokenem. Jeśli ten
        // request też dostanie 401 (np. token unieważniony z innego powodu),
        // NIE wchodzimy w kolejną rundę refreshu — po prostu oddajemy tę
        // odpowiedź dalej, żeby uniknąć nieskończonej pętli refresh->401->refresh.
        return await fetch(`${API_BASE_URL}${path}`, {
            ...rest,
            headers: buildHeaders(newAccessToken, headers),
            credentials: 'include',
        })
    } catch (error) {
        // Refresh padł (sieć albo nieważne cookie) -> sesja jest martwa:
        // czyścimy token, wylogowujemy usera w UI i sygnalizujemy to wyżej
        // dedykowanym typem błędu, żeby React Query wiedziało "nie retry'uj".
        setAccessToken(null)
        useUserStore.getState().actions.logout()
        const message = error instanceof Error ? error.message : 'Refresh token invalid or expired'
        throw new AuthError(message)
    }
}

/**
 * Wygodny helper: apiClient + parsowanie JSON + rzucanie błędu na !ok.
 * To jest to, czego w praktyce używają query hooki (queryFn) — apiClient
 * "gołego" fetcha używa się bezpośrednio tylko wtedy, gdy potrzebny jest
 * dostęp do samego Response (np. inny content-type, streaming, status bez parsowania body).
 */
export async function apiRequest<T>(path: string, options?: ApiOptions): Promise<T> {
    const response = await apiClient(path, options)

    if (!response.ok) {
        throw new ApiError(`Request failed: ${response.status}`, response.status)
    }

    return response.json() as Promise<T>
}
