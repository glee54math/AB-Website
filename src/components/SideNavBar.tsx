import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";
import type { SkillData } from "../pages/Dashboard";
import { useState } from "react";

interface AppSidebarProps {
  userSkills: Record<string, SkillData>;
  setActiveSkillCard: (skillName: string) => void;
}

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export default function AppSidebar({
  userSkills,
  setActiveSkillCard,
}: AppSidebarProps) {
  // const [activeSkillCard, setActiveSkillCard] = useState("");

  return (
    <div className="w-64 min-h-screen bg-zinc-900 text-white">
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {Object.entries(userSkills).map(([skillName, skillData]) => (
                  <SidebarMenuItem key={skillName}>
                    <SidebarMenuButton asChild>
                      <button onClick={() => setActiveSkillCard(skillName)}>
                        <span>{skillName}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
