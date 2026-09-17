import { useState } from 'react'
import { usePostsQuery } from './usePostsQuery'
import { PostCard, PostCardSkeleton } from './PostCard'
import { PaginationControls } from '../../components/PaginationControls'

const SKELETON_COUNT = 6
const PAGE_SIZE = SKELETON_COUNT

export default function PostsPage() {
    const [page, setPage] = useState(1)
    const { data: postsResponse, isLoading } = usePostsQuery({ page, pageSize: PAGE_SIZE })
    const totalPages = postsResponse?.meta.totalPages ?? 1

    return (
        <div className="flex w-full flex-col gap-4">
            {/* <header className="flex w-full items-center justify-end bg-gray-100 px-4 py-3">
                <div className="action-buttons">
                    <Button>Add post</Button>
                </div>
            </header> */}

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {isLoading
                    ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <PostCardSkeleton key={i} />)
                    : postsResponse?.data.map((post) => <PostCard key={post.id} post={post} />)}
            </div>

            <PaginationControls page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    )
}
