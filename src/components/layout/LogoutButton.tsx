import { useUserStore } from '../../stores/userStore'

export default function LogoutButton() {
    const logout = useUserStore((state) => state.actions.logout)

    const handleLogout = () => {
        logout()
    }

    return <button onClick={handleLogout}>Logout</button>
}