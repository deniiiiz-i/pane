"use client";

import { motion } from "motion/react";
import { Switch as SwitchPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { GLASS_SPRING } from "@/lib/glass/config";
import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <Pane
      variant="clear"
      radius={999}
      className={cn(
        "inline-flex h-6 w-10 shrink-0 items-center",
        "has-[[data-state=checked]]:[--pane-tint-clear:var(--pane-tint-regular)]",
      )}
    >
      <SwitchPrimitive.Root
        data-slot="switch"
        className={cn(
          "peer inline-flex h-6 w-10 shrink-0 items-center rounded-full bg-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--pane-highlight)] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb asChild>
          <motion.span
            layout
            transition={GLASS_SPRING.press}
            className="pointer-events-none block size-5 translate-x-0.5 data-[state=checked]:translate-x-[18px]"
          >
            <Pane variant="clear" radius={999} className="size-5" />
          </motion.span>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    </Pane>
  );
}

export { Switch };
