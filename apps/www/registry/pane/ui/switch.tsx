"use client";

import { Switch as SwitchPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
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
        "inline-flex h-7 w-14 shrink-0 items-center",
        // On: the track's glass fills with system green, rim included. Both
        // fill tokens are needed — a Pane reads `--pane-tint-*` normally but
        // `--pane-nested-*` inside another Pane, so setting only the first
        // leaves the switch grey in a card or dialog.
        "has-[[data-state=checked]]:[--pane-tint-clear:var(--pane-tint-accent)]",
        "has-[[data-state=checked]]:[--pane-nested-clear:var(--pane-tint-accent)]",
        "has-[[data-state=checked]]:[--pane-border-clear:var(--pane-border-accent)]",
      )}
    >
      <SwitchPrimitive.Root
        data-slot="switch"
        className={cn(
          "peer inline-flex h-7 w-14 shrink-0 items-center rounded-full bg-transparent outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--pane-highlight)] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {/* no asChild: shadcn rewrites it to Base UI's `render` for base-*
            styles, which Radix silently ignores — the knob then loses its
            size and position. The thumb itself carries the slide instead. */}
        <SwitchPrimitive.Thumb className="pointer-events-none block h-6 w-8 translate-x-0.5 transition-[translate] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] data-[state=checked]:translate-x-[22px] motion-reduce:transition-none">
          <Pane
            variant="regular"
            radius={999}
            className="h-6 w-8 [--pane-nested-regular:var(--pane-knob)]"
          />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    </Pane>
  );
}

export { Switch };
