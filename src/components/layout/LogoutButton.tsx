import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { useLogoutMutation } from './useLogoutMutation'

import { LogOut } from 'lucide-react'
export default function LogoutButton() {
    const logoutMutation = useLogoutMutation()

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Log out"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                >
                    {logoutMutation.isPending ? <Spinner className="size-4" /> : <LogOut className="size-4" />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>Log out</TooltipContent>
        </Tooltip>
    )
}
