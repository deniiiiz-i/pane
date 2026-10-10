"use client";

import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <Pane
      variant="clear"
      radius={999}
      className={cn(
        "inline-flex size-5 shrink-0 has-[:disabled]:opacity-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--pane-highlight)]",
        // Checked: the glass fills with the accent, rim included — both fill
        // tokens, as in Switch, so it still fills inside a card or dialog.
        "has-[[data-state=checked]]:[--pane-tint-clear:var(--pane-tint-accent)]",
        "has-[[data-state=checked]]:[--pane-nested-clear:var(--pane-tint-accent)]",
        "has-[[data-state=checked]]:[--pane-border-clear:var(--pane-border-accent)]",
      )}
    >
      <CheckboxPrimitive.Root
        data-slot="checkbox"
        className={cn(
          "peer flex size-full items-center justify-center rounded-[inherit] border border-foreground/20 bg-transparent text-white outline-none disabled:cursor-not-allowed data-[state=checked]:border-transparent data-[state=indeterminate]:border-transparent",
          className,
        )}
        {...props}
      >
        {/* an unchecked box needs its own edge: clear glass on a light page
            has none */}
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          className="grid place-content-center"
        >
          <CheckIcon className="size-3.5" strokeWidth={3} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    </Pane>
  );
}

export { Checkbox };
