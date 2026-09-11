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

const projects = [
    { name: 'Project 1', url: '#', icon: () => <span>📁</span> },
    { name: 'Project 2', url: '#', icon: () => <span>📁</span> },
]

export default function AppSidebar() {
    const sidebarOpen = useSidebarOpen()
    return (
        <aside className={`sidebar ${sidebarOpen ? 'opened' : ''}`}>
            <Sidebar>
                <SidebarHeader />
                <SidebarContent>
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
                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </aside>
    )
}
