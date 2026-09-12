import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '../../api/apiClient'
import type { Post } from '../PostsPage/usePostsQuery'

export const usePostQuery = (id: string | undefined) => {
    return useQuery({
        queryFn: () => apiRequest<Post>(`/v1/posts/${id}`),
        queryKey: ['posts', id],
        enabled: Boolean(id),
    })
}
