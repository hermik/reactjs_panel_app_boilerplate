import { useUserStore } from '../stores/userStore'
import { Navigate, Outlet } from 'react-router-dom'

export default function RequireAuth() {
    const isLogged = useUserStore((state) => state.isLogged)

    if (isLogged) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}