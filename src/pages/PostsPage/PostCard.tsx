import { Link } from 'react-router-dom'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import type { Post } from './usePostsQuery'

export function PostCard({ post }: { post: Post }) {
    return (
        <Link to={`/posts/${post.id}`}>
            <Card className="min-h-45 transition-colors hover:bg-muted/50">
                <CardHeader>
                    <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                    <CardDescription>
                        {new Date(post.createdAt).toLocaleDateString()}
                        {post.published ? '' : ' · Draft'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="line-clamp-3 text-muted-foreground">{post.content}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

export function PostCardSkeleton() {
    return (
        <Card className="min-h-45">
            <CardHeader>
                <Skeleton className="h-5 w-3/5" />
                <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>
    )
}
