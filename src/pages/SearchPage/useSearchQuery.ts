import { useQuery } from '@tanstack/react-query'
import { apiClient, ApiError } from '../../api/apiClient'

export function useSearchQuery(query: string) {
    return useQuery({
        queryKey: ['search', query],
        // GET /v1/test/delay/500 — przez apiClient, więc korzysta z auto-refresh na 401.
        queryFn: async ({ signal }) => {
            const response = await apiClient(`/v1/test/delay/500?query=${encodeURIComponent(query)}`, { signal })

            if (!response.ok) {
                throw new ApiError(`Search failed: ${response.status}`, response.status)
            }

            return response.json() as Promise<string[]>
        },
        enabled: !!query.trim(),
    })
}
