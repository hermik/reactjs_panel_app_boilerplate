import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '../../api/apiClient'

export interface Post {
    id: number
    title: string
    content: string
    published: boolean
    authorId: string
    createdAt: string
    updatedAt: string
}
export const usePostsQuery = () => {
    return useQuery({
        queryFn: () => apiRequest<Post[]>('/v1/posts'),
        queryKey: ['posts'],
    })
}
