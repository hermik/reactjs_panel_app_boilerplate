import * as React from 'react'
import { Search } from 'lucide-react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SearchInput({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
    return (
        <div className="relative">
            <Input type="text" className={cn('pr-8', className)} {...props} />
            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1/2 right-0.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Search"
            >
                <Search />
            </Button>
        </div>
    )
}

export { SearchInput }
