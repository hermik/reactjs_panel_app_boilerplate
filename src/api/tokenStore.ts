/**
 * Access token żyje poza reactowym stanem (zustand) celowo — nikt go nie
 * renderuje, więc nie ma powodu, żeby jego zmiana (np. po refreshu) triggerowała
 * re-render subskrybentów userStore. To czysty implementation detail apiClienta.
 */
let accessToken: string | null = null

const SESSION_HINT_KEY = 'hasSession'

export function getAccessToken(): string | null {
    return accessToken
}

export function setAccessToken(token: string | null): void {
    accessToken = token

    // Czysta podpowiedź w localStorage, NIE źródło prawdy o autoryzacji —
    // refresh-cookie jest httpOnly, więc JS inaczej nie wie, czy warto w ogóle
    // pytać /v1/auth/refresh przy starcie appki (patrz AuthInitializer).
    if (token) {
        localStorage.setItem(SESSION_HINT_KEY, '1')
    } else {
        localStorage.removeItem(SESSION_HINT_KEY)
    }
}

export function hasSessionHint(): boolean {
    return localStorage.getItem(SESSION_HINT_KEY) === '1'
}
