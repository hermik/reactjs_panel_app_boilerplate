import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function PasswordInput({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
    const [visible, setVisible] = React.useState(false)

    return (
        <div className="relative">
            <Input type={visible ? 'text' : 'password'} className={cn('pr-8', className)} {...props} />
            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1/2 right-0.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setVisible((current) => !current)}
                aria-label={visible ? 'Ukryj hasło' : 'Pokaż hasło'}
            >
                {visible ? <EyeOff /> : <Eye />}
            </Button>
        </div>
    )
}

export { PasswordInput }
