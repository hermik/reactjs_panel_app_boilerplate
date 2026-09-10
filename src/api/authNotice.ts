/**
 * Jednorazowy komunikat do pokazania na /login (np. "Zostałeś wylogowany").
 * Osobny kanał od nawigacji celowo — RedirectOfAuth przekierowuje deklaratywnie
 * na podstawie isLogged, więc nie ma tu miejsca na przekazanie "powodu" przez
 * location.state bez ryzyka wyścigu z reaktywnym <Navigate>.
 */
let pendingMessage: string | null = null

export function setAuthNotice(message: string): void {
    pendingMessage = message
}

/** Odczytuje i czyści komunikat — kolejne odczytanie (np. F5 na /login) już nic nie zwróci. */
export function consumeAuthNotice(): string | null {
    const message = pendingMessage
    pendingMessage = null
    return message
}
