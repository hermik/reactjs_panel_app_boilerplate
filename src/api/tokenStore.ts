/**
 * Access token żyje poza reactowym stanem (zustand) celowo — nikt go nie
 * renderuje, więc nie ma powodu, żeby jego zmiana (np. po refreshu) triggerowała
 * re-render subskrybentów userStore. To czysty implementation detail apiClienta.
 */
let accessToken: string | null = null

export function getAccessToken(): string | null {
    return accessToken
}

export function setAccessToken(token: string | null): void {
    accessToken = token
}
