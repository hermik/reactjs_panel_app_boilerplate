import { NavLink } from 'react-router-dom'
import { memo } from 'react'
function NavBar() {
    return (
        <nav className="d">
            <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
                <ul className="flex items-center gap-1">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/About', label: 'About' },
                        { to: '/Contact', label: 'Contact' },
                        { to: '/Profile', label: 'Profile' },
                    ].map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-gray-800 hover:bg-gray-100 hover:text-black'
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
