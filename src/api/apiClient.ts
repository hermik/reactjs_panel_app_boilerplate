import { useUserStore } from '../stores/userStore'

const API_BASE_URL = 'http://localhost:3000'

type ApiOptions = RequestInit & { skipAuth?: boolean }

// Odświeżanie w toku jest współdzielone, żeby równoległe 401 nie odpaliły kilku refreshy naraz.
let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // wysyła httpOnly cookie z refresh tokenem
    })

    if (!response.ok) {
        throw new Error('Refresh token invalid or expired')
    }

    const data: { accessToken: string } = await response.json()
    return data.accessToken
}

function getOrCreateRefreshPromise(): Promise<string> {
    if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
            refreshPromise = null
        })
    }
    return refreshPromise
}

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
 */
export async function apiClient(path: string, options: ApiOptions = {}): Promise<Response> {
    const { skipAuth, headers, ...rest } = options
    const accessToken = useUserStore.getState().accessToken

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...rest,
        headers: buildHeaders(skipAuth ? null : accessToken, headers),
        credentials: 'include',
    })

    if (response.status !== 401 || skipAuth) {
        return response
    }

    try {
        const newAccessToken = await getOrCreateRefreshPromise()
        useUserStore.getState().actions.setAccessToken(newAccessToken)

        return await fetch(`${API_BASE_URL}${path}`, {
            ...rest,
            headers: buildHeaders(newAccessToken, headers),
            credentials: 'include',
        })
    } catch (error) {
        useUserStore.getState().actions.logout()
        throw error
    }
}

/** Wygodny helper: apiClient + parsowanie JSON + rzucanie błędu na !ok */
export async function apiRequest<T>(path: string, options?: ApiOptions): Promise<T> {
    const response = await apiClient(path, options)

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }

    return response.json() as Promise<T>
}
