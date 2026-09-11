import { Suspense, useTransition } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'
import SidebarToggle from './SidebarToggle'
import DarkModeToggle from './DarkModeToggle'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import LogoutButton from './LogoutButton'

export default function Layout() {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="layout">
            <header className="main">
                <div className="logo">
                    <NavLink to="/">My super app</NavLink>
                </div>
                <div>
                    <NavBar startTransition={startTransition} />
                </div>
                <div>
                    <DarkModeToggle />
                    <SidebarToggle />
                    <LogoutButton />
                </div>
            </header>
            <section className="content">
                <Sidebar />
                <div className="main-content relative flex align-center justify-center">
                    {isPending && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-background/60 backdrop-blur-sm">
                            <Spinner className="size-6" />
                            <span className="text-sm text-muted-foreground">Loading...</span>
                        </div>
                    )}
                    <Suspense
                        fallback={
                            <div className="flex flex-1 items-center justify-center gap-3 p-10 text-muted-foreground">
                                <Spinner className="size-6" />
                                <span>Loading...</span>
                            </div>
                        }
                    >
                        <Outlet />
                    </Suspense>
                </div>
            </section>
        </div>
    )
}
