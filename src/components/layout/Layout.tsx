import { Outlet } from 'react-router-dom'
import SidebarToggle from './SidebarToggle'
import Sidebar from './Sidebar'
import NavBar from './NavBar';
import LogoutButton from './LogoutButton';

export default function Layout() {
    return (
        <div className="layout">
            <header className="main">
                <h1>My super app</h1>
                <NavBar />
                <SidebarToggle />
                <LogoutButton />
            </header>
            <section className="content">
                <Sidebar /> 
                <Outlet />
            </section>
        </div>
    );
}