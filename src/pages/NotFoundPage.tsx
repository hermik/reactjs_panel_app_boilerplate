import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
    return (
        <div className="flex min-h-svh w-full flex-col items-center justify-center gap-4 p-4 text-center">
            <span className="text-sm font-medium text-muted-foreground">404</span>
            <h1 className="text-2xl font-semibold text-foreground">Page not found</h1>
            <p className="max-w-sm text-sm text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
                <Link to="/">Back to home</Link>
            </Button>
        </div>
    )
}
