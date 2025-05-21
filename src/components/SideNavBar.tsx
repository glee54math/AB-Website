import * as Icons from "lucide-react";
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
import icons from "../assets/nav-icons.json";
import type { SkillData } from "../pages/Dashboard";
import { useState } from "react";

interface AppSidebarProps {
  userSkills: Record<string, SkillData>;
  setActiveSkillCard: (skillName: string) => void;
}

export default function AppSidebar({
  userSkills,
  setActiveSkillCard,
}: AppSidebarProps) {
  // const [activeSkillCard, setActiveSkillCard] = useState("");
  // type NavIconsMap = {
  //   [key: string]: {
  //     level: string;
  //     icon: string;
  //     color?: string;
  //     textSize?: string;
  //   };
  // }; // consider looking into json2ts CLI

  return (
    <div className="w-64 min-h-screen bg-zinc-900 text-white">
      <Sidebar collapsible="offcanvas">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>AutoMATHically Better</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {icons.items.map((item) => {
                  const LucideIcon =
                    Icons[
                      item.icon as keyof typeof Icons
                    ]; /* Convert string to component */
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          {LucideIcon && (
                            <LucideIcon className="mr-2 h-4 w-4" />
                          )}
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroupLabel>Skills</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.entries(userSkills).map(([skillName, skillData]) => {
                const iconName = icons.navIcons[skillName]?.icon; // even with red underline, it works fine.
                const LucideIcon =
                  Icons[iconName as keyof typeof Icons]; /* string->Component */
                return (
                  <SidebarMenuItem key={skillName}>
                    <SidebarMenuButton asChild>
                      <button onClick={() => setActiveSkillCard(skillName)}>
                        {LucideIcon && <LucideIcon className="mr-4 h-6 w-6" />}
                        <span>{skillName}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
