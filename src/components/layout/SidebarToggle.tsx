import { useAppLayoutStore } from '../../stores/layoutStore'

export default function SidebarToggle() {
    const toggleSidebar = useAppLayoutStore((state) => state.toggleSidebar)
    return (
        <button className="sidebar-toggle" onClick={toggleSidebar}>
            Toggle Sidebar
        </button>
    );
}