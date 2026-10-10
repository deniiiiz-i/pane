"use client";

import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  type LucideIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";

const items: { title: string; icon: LucideIcon; badge?: number }[] = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon, badge: 12 },
  { title: "Calendar", icon: CalendarIcon },
  { title: "Search", icon: SearchIcon },
  { title: "Settings", icon: SettingsIcon },
];

export default function SidebarDemo() {
  const [active, setActive] = React.useState("Inbox");

  return (
    // `collapsible="none"` keeps the sidebar in the flow of this preview;
    // in an app it pins to the edge of the window and collapses
    <SidebarProvider className="min-h-0 w-auto">
      <Sidebar collapsible="none" className="h-auto w-56">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={active === item.title}
                      onClick={() => setActive(item.title)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge ? (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}
