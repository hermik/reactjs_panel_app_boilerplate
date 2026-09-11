import { Suspense, useTransition } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Separator } from '@/components/ui/separator'
import SidebarToggle from './SidebarToggle'
import DarkModeToggle from './DarkModeToggle'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import LogoutButton from './LogoutButton'

export default function Layout() {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="layout">
            <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-border bg-muted/80 px-6 shadow-sm backdrop-blur-md">
                <NavLink
                    to="/"
                    className="flex items-center gap-2.5 font-semibold text-foreground transition-opacity hover:opacity-80"
                >
                    <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/60 text-primary-foreground shadow-sm">
                        <Sparkles className="size-4" />
                    </span>
                    <span className="text-base tracking-tight">My super app</span>
                </NavLink>

                <div className="flex flex-1 justify-center">
                    <NavBar startTransition={startTransition} />
                </div>

                <div className="flex items-center gap-2">
                    <DarkModeToggle />
                    <SidebarToggle />
                    <Separator orientation="vertical" className="h-6" />
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
