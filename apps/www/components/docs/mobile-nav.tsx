"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { docsNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" aria-label="Open navigation">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Documentation</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 overflow-y-auto">
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
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm transition-colors",
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
      </SheetContent>
    </Sheet>
  );
}
