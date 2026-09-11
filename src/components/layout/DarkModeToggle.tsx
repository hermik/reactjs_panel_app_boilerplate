import { useAppLayoutStore } from '../../stores/layoutStore'
import { Button } from '../ui/button'

export default function DarkModeToggle() {
    const toggleDarkMode = useAppLayoutStore((state) => state.toggleDarkMode)
    return (
        <Button
            variant="outline"
            className="darkmode-toggle sidebar-toggle-translate-y-1/2 text-muted-foreground hover:text-foreground"

            onClick={toggleDarkMode}
        >
            Toggle Darkmode
        </Button>
    )
}
