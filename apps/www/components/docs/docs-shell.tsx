"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { DocsPager } from "@/components/docs/docs-pager";
import { docsNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 gap-10 px-4 pt-6 pb-24 lg:pt-10">
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24 flex flex-col gap-6">
          {docsNav.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {group.title}
              </p>
              <nav className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "rounded-lg px-3 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-foreground/[0.06] font-medium text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </aside>
      <main className="min-w-0 flex-1">
        {children}
        <DocsPager />
      </main>
    </div>
  );
}
