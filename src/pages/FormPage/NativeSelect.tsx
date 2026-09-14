import * as React from 'react'
import { cn } from 'cn'

/**
 * Plain native <select>, not the Radix component — Radix's Select in this
 * package version has no hidden native input syncing its value, so it
 * doesn't participate in FormData. This form is read via ref/FormData, so
 * controls must be native.
 */
function NativeSelect({ className, children, ...props }: React.ComponentProps<'select'>) {
    return (
        <select
            className={cn(
                'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                className,
            )}
            {...props}
        >
            {children}
        </select>
    )
}

export { NativeSelect }
