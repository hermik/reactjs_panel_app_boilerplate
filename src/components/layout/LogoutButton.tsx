import { useUserStore } from '../../stores/userStore'
import { setAccessToken } from '../../api/tokenStore'

export default function LogoutButton() {
    const logout = useUserStore((state) => state.actions.logout)

    const handleLogout = () => {
        setAccessToken(null)
        logout()
    }

    return <button onClick={handleLogout}>Logout</button>
}