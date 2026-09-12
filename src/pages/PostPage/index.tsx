import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePostQuery } from './usePostQuery'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

export default function PostPage() {
    const { id } = useParams<{ id: string }>()
    const { data: post, isLoading, isError } = usePostQuery(id)
    const navigate = useNavigate()
    const location = useLocation()

    //back button can be from different pages, so we check if the location key is not 'default' to navigate back, otherwise go to the posts list
    const handleBack = () => {
        if (location.key !== 'default') {
            navigate(-1)
        } else {
            navigate('/posts')
        }
    }

    return (
        <div className="flex w-full max-w-3xl flex-col gap-4 p-4">
            <Button variant="outline" size="sm" className="self-start" onClick={handleBack}>
                ← Back
            </Button>

            {isLoading ? (
                <Card>
                    <CardHeader>
                        <Skeleton className="h-7 w-3/5" />
                        <Skeleton className="h-4 w-1/4" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                </Card>
            ) : isError || !post ? (
                <p className="text-muted-foreground">Post not found.</p>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <CardDescription>
                            {new Date(post.createdAt).toLocaleDateString()}
                            {post.published ? '' : ' · Draft'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap text-card-foreground">{post.content}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
