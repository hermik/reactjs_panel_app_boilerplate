import { useMutation } from '@tanstack/react-query'
import { apiClient } from '../../api/apiClient'
import { setAccessToken } from '../../api/tokenStore'
import { useUserStore } from '../../stores/userStore'

/**
 * POST /v1/auth/logout — revokuje refresh-cookie po stronie serwera.
 * `onSettled` (nie `onSuccess`) celowo: nawet jeśli request padnie (serwer
 * nieosiągalny, sieć), user i tak chce wyjść — lokalny stan czyścimy zawsze.
 */
export function useLogoutMutation() {
    return useMutation({
        mutationFn: () => apiClient('/v1/auth/logout', { method: 'POST' }),
        onSettled: () => {
            setAccessToken(null)
            useUserStore.getState().actions.logout()
        },
    })
}
