import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { apiRequest, ApiError } from '../../api/apiClient'
import { setAccessToken } from '../../api/tokenStore'
import { useUserStore } from '../../stores/userStore'
import type { LoginFormValues } from './loginSchema'

export function isServerError(error: unknown): boolean {
    return error instanceof ApiError && error.status >= 500
}

export function getLoginErrorMessage(error: unknown): string {
    if (error instanceof ApiError) {
        return error.message
    }
    return 'Something went wrong. Please try again.'
}

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
            toast.success(`Welcome, ${user.name}! :)`, { position: 'top-center' })
        },
        onError: (error) => {
            if (isServerError(error)) {
                toast.error(getLoginErrorMessage(error), { position: 'top-center' })
            }
        },
    })
}
