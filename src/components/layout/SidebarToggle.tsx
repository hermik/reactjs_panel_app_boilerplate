import { PanelLeft } from 'lucide-react'
import { useAppLayoutStore } from '../../stores/layoutStore'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function SidebarToggle() {
    const toggleSidebar = useAppLayoutStore((state) => state.toggleSidebar)
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle sidebar"
                    className="text-muted-foreground hover:text-foreground"
                    onClick={toggleSidebar}
                >
                    <PanelLeft className="size-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle sidebar</TooltipContent>
        </Tooltip>
    )
}
