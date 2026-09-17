import { TriangleAlert } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { ErrorBoundary, getErrorMessage, type FallbackProps } from 'react-error-boundary'
import { Button } from '@/components/ui/button'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <TriangleAlert className="size-6" />
            </div>
            <div className="space-y-1">
                <h2 className="text-lg font-semibold text-foreground">Something went wrong</h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                    {getErrorMessage(error) ?? 'An unexpected error occurred.'}
                </p>
            </div>
            <Button onClick={resetErrorBoundary}>Try again</Button>
        </div>
    )
}

/**
 * Isolates a page render crash (e.g. a bad API response shape) to the content
 * area, so the header/sidebar/nav stay usable instead of the whole app going
 * blank. resetKeys is tied to the pathname so navigating away and back gets a
 * fresh render attempt instead of being stuck on the fallback forever.
 */
export default function RouteErrorBoundary({ children }: { children: React.ReactNode }) {
    const location = useLocation()

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
            {children}
        </ErrorBoundary>
    )
}
