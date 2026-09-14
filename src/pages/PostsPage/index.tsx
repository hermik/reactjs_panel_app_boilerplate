import { usePostsQuery } from './usePostsQuery'
import { Button } from '../../components/ui/button'
import { PostCard, PostCardSkeleton } from './PostCard'

const SKELETON_COUNT = 4

export default function PostsPage() {
    const { data: posts, isLoading } = usePostsQuery()

    return (
        <>
            {/* <header className="flex w-full items-center justify-end bg-gray-100 px-4 py-3">
                <div className="action-buttons">
                    <Button>Add post</Button>
                </div>
            </header> */}

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4">
                {isLoading
                    ? Array.from({ length: SKELETON_COUNT }).map((_, i) => <PostCardSkeleton key={i} />)
                    : posts?.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
        </>
    )
}
