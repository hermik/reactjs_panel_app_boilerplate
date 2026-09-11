import { useAppLayoutStore } from '../../stores/layoutStore'
import { Button } from '../ui/button'

export default function SidebarToggle() {
    const toggleSidebar = useAppLayoutStore((state) => state.toggleSidebar)
    return (
        <Button
            variant="outline"
            className="sidebar-toggle-translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={toggleSidebar}
        >
            Toggle Sidebar
        </Button>
    )
}
