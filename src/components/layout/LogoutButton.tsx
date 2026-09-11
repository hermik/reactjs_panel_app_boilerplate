import { Button } from '../ui/button'
import { useLogoutMutation } from './useLogoutMutation'

export default function LogoutButton() {
    const logoutMutation = useLogoutMutation()

    return (
        <Button
            variant="outline"
            className="sidebar-toggle-translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
        >
            {logoutMutation.isPending ? 'Wylogowywanie...' : 'Logout'}
        </Button>
    )
}
