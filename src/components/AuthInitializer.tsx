import { useEffect, useState, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'
import { useAppLayoutStore } from '../stores/layoutStore'
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
    const isDarkMode = useAppLayoutStore((state) => state.isDarkMode)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])
    useEffect(() => {
        if (!hasSessionHint()) {
            return
        }
        restoreSession().finally(() => setIsChecking(false))
    }, [])

    if (isChecking) {
        return (
            <div className="flex min-h-svh w-full items-center justify-center p-6">
                <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
                    <Loader2 className="size-10 shrink-0 animate-spin text-primary" />
                    <div className="flex flex-col gap-0.5">
                        <p className="font-medium text-card-foreground">Restoring your session</p>
                        <p className="text-sm text-muted-foreground">Please wait while we reconnect you...</p>
                    </div>
                </div>
            </div>
        )
    }

    return children
}
