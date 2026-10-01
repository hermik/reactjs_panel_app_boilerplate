import { useCallback, useSyncExternalStore } from 'react'

/**
 * Zwraca true, gdy media query pasuje (np. '(min-width: 768px)').
 * useSyncExternalStore czyta matchMedia synchronicznie już przy pierwszym renderze,
 * więc nie ma mignięcia "zła wersja -> poprawna" jak przy useState + useEffect.
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onChange: () => void) => {
            const mql = window.matchMedia(query)
            mql.addEventListener('change', onChange)
            return () => mql.removeEventListener('change', onChange)
        },
        [query],
    )

    return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches)
}
