import { useMutation } from '@tanstack/react-query'
import { ApiError, apiRequest } from '../../api/apiClient'
import { setAccessToken } from '../../api/tokenStore'
import { useUserStore } from '../../stores/userStore'
import type { LoginFormValues } from './loginSchema'

interface LoginResponse {
    accessToken: string
    user: {
        id: string
        email: string
        name: string
        role: string
        createdAt: string
    }
}

/**
 * Mapuje błąd logowania na komunikat dla usera. 401 to jedyny przypadek
 * "złe dane" — inne statusy (500 przy padniętej bazie itp.) albo błąd sieci
 * nie mają nic wspólnego z poprawnością hasła i nie powinny tak być nazwane.
 */
export function getLoginErrorMessage(error: unknown): string {
    if (error instanceof ApiError && error.status === 401) {
        return 'Nieprawidłowy email lub hasło.'
    }
    return 'Wystąpił błąd serwera. Spróbuj ponownie później.'
}

/** POST /v1/auth/login — skipAuth: true, bo nie mamy jeszcze tokenu i złe hasło (401) ma tu nie odpalać refresh-retry. */
export function useLoginMutation() {
    return useMutation({
        mutationFn: (credentials: LoginFormValues) =>
            apiRequest<LoginResponse>('/v1/auth/login', {
                method: 'POST',
                skipAuth: true,
                body: JSON.stringify(credentials),
            }),
        onSuccess: ({ accessToken, user }) => {
            setAccessToken(accessToken)
            const { setName, setEmail, login } = useUserStore.getState().actions
            setName(user.name)
            setEmail(user.email)
            login()
        },
    })
}
