"use client";

import { motion } from "motion/react";
import * as React from "react";
import { Pane } from "@/components/ui/pane";
import { GLASS_SPRING } from "@/lib/glass/config";
import { cn } from "@/lib/utils";

export interface NavbarItem {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface NavbarProps
  extends Omit<React.ComponentProps<"nav">, "onChange"> {
  items: NavbarItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (label: string) => void;
}

/** A floating glass dock — the classic liquid-glass navigation showcase. */
function Navbar({
  items,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: NavbarProps) {
  const indicatorId = React.useId();
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? items[0]?.label,
  );
  const activeLabel = value ?? internalValue;

  return (
    <nav data-slot="navbar" className={cn("inline-flex", className)} {...props}>
      <Pane
        variant="clear"
        radius={999}
        className="inline-flex items-center gap-1 p-1.5"
      >
        {items.map((item) => {
          const isActive = item.label === activeLabel;
          return (
            <motion.button
              key={item.label}
              type="button"
              data-slot="navbar-item"
              data-active={isActive}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              transition={GLASS_SPRING.hover}
              onClick={() => {
                setInternalValue(item.label);
                onValueChange?.(item.label);
                item.onClick?.();
              }}
              className="relative flex size-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            >
              {isActive ? (
                <motion.span
                  layoutId={`${indicatorId}-navbar-indicator`}
                  transition={GLASS_SPRING.hover}
                  className="absolute inset-0"
                >
                  <Pane
                    variant="clear"
                    radius={999}
                    className="h-full w-full"
                  />
                </motion.span>
              ) : null}
              <span className="relative z-10 [&_svg]:size-5">{item.icon}</span>
              <span className="sr-only">{item.label}</span>
            </motion.button>
          );
        })}
      </Pane>
    </nav>
  );
}

export { Navbar };
