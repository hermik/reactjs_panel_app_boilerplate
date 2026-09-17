import { useQuery } from '@tanstack/react-query'
import { apiRequest } from '../../api/apiClient'

export interface Post {
    id: string
    title: string
    content: string
    published: boolean
    authorId: string
    createdAt: string
    updatedAt: string
}
export interface PostsMeta {
    total: number
    page: number
    pageSize: number
    totalPages: number
}
export interface PostsResponse {
    data: Post[]
    meta: PostsMeta
}
export const usePostsQuery = ({ page = 1, pageSize = 10 } = {}) => {
    return useQuery({
        queryFn: () => apiRequest<PostsResponse>(`/v1/posts?page=${page}&pageSize=${pageSize}`),
        queryKey: ['posts', page, pageSize],
    })
}
