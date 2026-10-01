import { useSidebarOpen } from '../../stores/layoutStore'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from '@/components/ui/sidebar'
import { NavLink } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Network } from 'lucide-react'
const projects = [
    {
        name: 'Project 1',
        url: '#',
        icon: () => (
            <span>
                <Network />
            </span>
        ),
    },
    {
        name: 'Project 2',
        url: '#',
        icon: () => (
            <span>
                <Network />
            </span>
        ),
    },
]

export default function AppSidebar({ ...props }) {
    const sidebarOpen = useSidebarOpen()
    return (
        <Sidebar collapsible="icon" variant="inset" className="bg-transparent">
            <SidebarHeader className="border-t p-1.5 border-l border-r border-gray-300 rounded-t-2xl">
                <NavLink
                    to="/"
                    className="flex  items-center w-100 gap-2.5 font-semibold text-foreground transition-opacity hover:opacity-80"
                >
                    <span className="flex size-9 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/60 text-primary-foreground shadow-sm">
                        <Sparkles className={`size-4`} />
                    </span>
                    <span className={`text-base tracking-tight ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                        My super app
                    </span>
                </NavLink>
                {/* <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger render={<SidebarMenuButton />}>
                                    Select Workspace
                                    <ChevronDown className="ml-auto" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <span>Acme Inc</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu> */}
            </SidebarHeader>
            <SidebarContent className="pattern rounded-b-2xl border-b border-l border-r border-gray-300 relative overflow-hidden">
                {/* <div className=""> */}
                <div className="absolute bg-[#ffffff] dark:bg-red-300/10  size-190 -top-50 -left-130 blur-3xl"></div>
                <SidebarGroup>
                    <SidebarMenu>
                        {projects.map((project) => (
                            <SidebarMenuItem key={project.name}>
                                <SidebarMenuButton render={<a href={project.url} />}>
                                    <project.icon />
                                    <span>{project.name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                {/* </div> */}
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}
