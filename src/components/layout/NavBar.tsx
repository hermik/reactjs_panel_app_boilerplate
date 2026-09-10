import { NavLink } from 'react-router-dom'
import { memo } from 'react'
function NavBar() {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/About">About</NavLink></li>
                <li><NavLink to="/Contact">Contact</NavLink></li>
                 <li><NavLink to="/Profile">Profile</NavLink></li>
            </ul>
        </nav>
    )
}
export default memo(NavBar)
    