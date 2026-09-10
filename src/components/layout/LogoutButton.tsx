import { useLogoutMutation } from './useLogoutMutation'

export default function LogoutButton() {
    const logoutMutation = useLogoutMutation()

    return (
        <button onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
            {logoutMutation.isPending ? 'Wylogowywanie...' : 'Logout'}
        </button>
    )
}
