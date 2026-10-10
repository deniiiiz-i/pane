"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { GLASS_SPRING } from "@/lib/glass/config";
import { docsNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * The docs navigation, shared by the sidebar and the mobile sheet. The active
 * page sits on a glass pill that springs between items as you navigate.
 */
export function DocsNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  // one indicator per instance, so the sidebar and the sheet never share it
  const indicatorId = React.useId();

  return (
    <div className="flex flex-col gap-6">
      {docsNav.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">
            {group.title}
          </p>
          <nav className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative isolate rounded-[12px] px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active ? (
                    <Pane
                      layoutId={indicatorId}
                      transition={GLASS_SPRING.hover}
                      variant="clear"
                      radius={12}
                      className="-z-10 absolute inset-0"
                    />
                  ) : null}
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}
