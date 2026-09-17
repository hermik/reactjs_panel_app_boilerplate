import { Suspense, useState, useTransition } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import SidebarToggle from './SidebarToggle'
import DarkModeToggle from './DarkModeToggle'
import AppSidebar from './AppSidebar'
import NavBar from './NavBar'
import { navItems } from './navItems'
import LogoutButton from './LogoutButton'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar.tsx'
import { useAppLayoutStore } from '../../stores/layoutStore'
import RouteErrorBoundary from './RouteErrorBoundary'

export default function Layout() {
    const isSidebarOpen = useAppLayoutStore((state) => state.isSidebarOpen)
    const setSidebarOpen = useAppLayoutStore((state) => state.setSidebarOpen)
    const [isPending, startTransition] = useTransition()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="layout flex flex-col min-h-screen">
            <main className="flex-1">
                <header className="flex h-16 items-center justify-between gap-4 border-b border-border px-6 shadow-sm backdrop-blur-md">
                    <div className="hidden flex-1 justify-center md:flex">
                        <NavBar startTransition={startTransition} />
                    </div>

                    <div className="hidden items-center gap-2 md:flex">
                        <DarkModeToggle />
                        <SidebarToggle />
                        <Separator orientation="vertical" className="h-6" />
                        <LogoutButton />
                    </div>

                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" aria-label="Open menu" className="md:hidden">
                                <Menu className="size-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="flex flex-col gap-6 p-6"
                            onOpenAutoFocus={(event) => event.preventDefault()}
                        >
                            <SheetHeader className="p-0">
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.to}
                                        to={item.to}
                                        onClick={(event) => {
                                            event.preventDefault()
                                            setIsMobileMenuOpen(false)
                                            startTransition(() => navigate(item.to))
                                        }}
                                        className={({ isActive }) =>
                                            `rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                                isActive
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                            }`
                                        }
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </nav>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <DarkModeToggle />
                                <SidebarToggle />
                                <LogoutButton />
                            </div>
                        </SheetContent>
                    </Sheet>
                </header>
                <section className="content">
                    <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
                        <AppSidebar />
                        <SidebarInset>
                            <div className="main-content relative flex justify-center">
                                {isPending && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-background/60 backdrop-blur-sm">
                                        <Spinner className="size-6" />
                                        <span className="text-sm text-muted-foreground">Loading...</span>
                                    </div>
                                )}
                                <RouteErrorBoundary>
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
                                </RouteErrorBoundary>
                            </div>
                        </SidebarInset>
                    </SidebarProvider>
                </section>
            </main>
        </div>
    )
}
