import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '../../api/apiClient'

export interface Profile {
    name: string
    email: string
}

/** GET /v1/users/me — przez apiClient, więc auto-refresh na 401 działa bez dodatkowego kodu tutaj. */
export function useProfileQuery() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: () => apiRequest<Profile>('/v1/users/me'),
    })
}
