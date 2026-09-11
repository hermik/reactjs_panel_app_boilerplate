import { useQuery } from '@tanstack/react-query'

export interface Comment {
    id: number
    name: string
    email: string
    body: string
}

// Publiczne, zewnętrzne API (inny origin) — celowo bez apiClient, bo nie ma tu auth/refresh.
async function getComments(signal: AbortSignal): Promise<Comment[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments', { signal })
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return response.json()
}

export function useCommentsQuery() {
    return useQuery({
        queryKey: ['comments'],
        queryFn: ({ signal }) => getComments(signal),
    })
}
