import { useSidebarOpen } from '../../stores/layoutStore'

export default function Sidebar() {
    const sidebarOpen = useSidebarOpen()
    return (
        <aside
            className={`fixed top-0 left-0 h-full w-50 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="sidebar-content">
                <h3>Sidebar</h3>
            </div>
        </aside>
    )
}
