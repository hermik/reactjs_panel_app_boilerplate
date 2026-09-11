import { useAppLayoutStore } from '../../stores/layoutStore'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
    const toggleDarkMode = useAppLayoutStore((state) => state.toggleDarkMode)
    const isDarkMode = useAppLayoutStore((state) => state.isDarkMode)
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle dark mode"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={toggleDarkMode}
                >
                    {isDarkMode ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle dark mode</TooltipContent>
        </Tooltip>
    )
}
