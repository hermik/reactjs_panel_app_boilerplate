import { NavLink, useNavigate } from 'react-router-dom'
import { memo, type TransitionStartFunction } from 'react'
import { navItems } from './navItems'

function NavBar({ startTransition }: { startTransition: TransitionStartFunction }) {
    const navigate = useNavigate()

    return (
        <nav>
            <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
                <ul className="flex items-center gap-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                onClick={(event) => {
                                    event.preventDefault()
                                    startTransition(() => navigate(item.to))
                                }}
                                className={({ isActive }) =>
                                    `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
export default memo(NavBar)
