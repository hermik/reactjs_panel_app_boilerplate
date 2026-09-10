import { useEffect, useState, type ReactNode } from 'react'
import { restoreSession } from '../api/apiClient'
import { hasSessionHint } from '../api/tokenStore'

/**
 * Owija appkę i blokuje jej render, dopóki nie sprawdzimy (przez refresh-cookie),
 * czy sesja sprzed F5 jest wciąż ważna. Bez tej blokady RequireAuth zdążyłby
 * przekierować na /login zanim restoreSession() w ogóle by odpowiedział.
 *
 * `hasSessionHint()` pozwala pominąć ten request całkowicie dla kogoś, kto
 * nigdy się nie logował (albo świadomie się wylogował) — bez podpowiedzi
 * i tak dostalibyśmy gwarantowane 401 z /v1/auth/refresh.
 */
export default function AuthInitializer({ children }: { children: ReactNode }) {
    const [isChecking, setIsChecking] = useState(hasSessionHint)

    useEffect(() => {
        if (!hasSessionHint()) {
            return
        }
        restoreSession().finally(() => setIsChecking(false))
    }, [])

    if (isChecking) {
        return <p>Sprawdzanie sesji...</p>
    }

    return children
}
