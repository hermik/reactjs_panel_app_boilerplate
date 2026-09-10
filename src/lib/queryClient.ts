import { QueryClient } from '@tanstack/react-query'
import { ApiError, AuthError } from '../api/apiClient'

/**
 * Domyślny retry React Query próbowałby ponownie nawet wtedy, gdy apiClient
 * już wie, że to nie ma sensu:
 * - AuthError -> refresh cookie padł, apiClient już wylogował usera; kolejne
 *   próby to tylko kolejne, skazane na porażkę POST /auth/refresh.
 * - ApiError 4xx -> błąd po stronie requestu (zły input, brak zasobu), sieć
 *   tu nic nie zmieni.
 * W pozostałych przypadkach (5xx, błąd sieci) zostawiamy zachowanie zbliżone
 * do domyślnego React Query — do 3 prób.
 */
function shouldRetry(failureCount: number, error: unknown): boolean {
    if (error instanceof AuthError) return false
    if (error instanceof ApiError && error.status >= 400 && error.status < 500) return false
    return failureCount < 3
}

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: shouldRetry,
        },
    },
})
