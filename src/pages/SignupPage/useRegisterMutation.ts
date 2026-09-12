import { useMutation } from '@tanstack/react-query'
import { apiRequest } from '../../api/apiClient'
import { setAccessToken } from '../../api/tokenStore'
import { useUserStore } from '../../stores/userStore'

interface RegisterData {
    name: string
    email: string
    password: string
}
interface RegisterResponse {
    accessToken: string
    user: {
        id: string
        email: string
        name: string
        role: string
        createdAt: string
    }
}
export function useRegisterMutation() {
    return useMutation({
        mutationFn: (data: RegisterData) =>
            apiRequest<RegisterResponse>('/v1/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
                skipAuth: true,
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
