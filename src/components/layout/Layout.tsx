import { NavLink, Outlet } from 'react-router-dom'
import SidebarToggle from './SidebarToggle'
import Sidebar from './Sidebar'
import NavBar from './NavBar';
import LogoutButton from './LogoutButton';

export default function Layout() {
    return (
        <div className="layout">
            <header className="main">
                <div className="logo"><NavLink to="/">My super app</NavLink></div>
                <div>
                    <NavBar />
                </div>
                <div>
                    <SidebarToggle />
                    <LogoutButton />
                </div>
            </header>
            <section className="content">
                <Sidebar /> 
                <Outlet />
            </section>
        </div>
    );
}