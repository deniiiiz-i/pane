"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { docsNav } from "@/lib/site-config";

/**
 * The docs navigation, built from the registry's own Sidebar so the site
 * dogfoods it. On desktop it sits on a glass panel; in the mobile sheet,
 * which is glass already, the groups go straight in.
 */
export function DocsNav({
  onNavigate,
  panel = false,
}: {
  onNavigate?: () => void;
  panel?: boolean;
}) {
  const pathname = usePathname();

  const groups = docsNav.map((group) => (
    <SidebarGroup key={group.title}>
      <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {group.items.map((item) => {
            const active = pathname === item.href;
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={active}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));

  return (
    // only here for the menu's context; the layout around it is the docs'
    <SidebarProvider className="min-h-0">
      {panel ? (
        <Sidebar collapsible="none" className="h-auto w-full">
          <SidebarContent className="gap-0">
            <nav aria-label="Documentation">{groups}</nav>
          </SidebarContent>
        </Sidebar>
      ) : (
        <nav aria-label="Documentation" className="flex w-full flex-col">
          {groups}
        </nav>
      )}
    </SidebarProvider>
  );
}
