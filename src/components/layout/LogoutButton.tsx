import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'
import { useLogoutMutation } from './useLogoutMutation'

import { LogOut } from 'lucide-react'
export default function LogoutButton() {
    const logoutMutation = useLogoutMutation()

    return (
        <Button
            variant="outline"
            className="sidebar-toggle-translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
        >
            {logoutMutation.isPending ? <Spinner className="ml-2 h-4 w-4" /> : <LogOut className="ml-2 h-4 w-4" />}
        </Button>
    )
}
