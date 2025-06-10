import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Users, BookOpen, Settings, Info } from "lucide-react"

export default function AppSidebar() {
  const menuItems = [
    {
      title: "Home",
      icon: Home,
      url: "#",
    },
    {
      title: "Attendance",
      icon: Users,
      url: "#",
    },
    {
      title: "Sessions",
      icon: BookOpen,
      url: "#",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "#",
    },
    {
      title: "About",
      icon: Info,
      url: "#",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="bg-white p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Attendance App</h2>
            <p className="text-xs text-muted-foreground">Teacher Dashboard</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
