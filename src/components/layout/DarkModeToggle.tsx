import { useAppLayoutStore } from '../../stores/layoutStore'
import { Button } from '../ui/button'
import { Moon, Sun } from 'lucide-react'
export default function DarkModeToggle() {
    const toggleDarkMode = useAppLayoutStore((state) => state.toggleDarkMode)
    const isDarkMode = useAppLayoutStore((state) => state.isDarkMode)
    return (
        <Button
            variant="outline"
            className="darkmode-toggle sidebar-toggle-translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={toggleDarkMode}
        >
            {!isDarkMode ? <Moon className="w-4 h-4 mr-2" /> : <Sun className="w-4 h-4 mr-2" />}
            Toggle Darkmode
        </Button>
    )
}
