import { useSidebarOpen } from '../../stores/layoutStore'

export default function Sidebar() {

    const sidebarOpen = useSidebarOpen()
    return (
        <aside className={`sidebar ${sidebarOpen ? 'opened' : ''}`}>
            <div className="sidebar-content">
                <h3>Sidebar</h3>
            </div>
        </aside>
    )
}