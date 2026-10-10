"use client";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <Pane
      variant="clear"
      radius={999}
      className={cn(
        "inline-flex size-5 shrink-0 has-[:disabled]:opacity-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--pane-highlight)]",
        // Selected: the accent fills the glass, as in Checkbox and Switch
        "has-[[data-state=checked]]:[--pane-tint-clear:var(--pane-tint-accent)]",
        "has-[[data-state=checked]]:[--pane-nested-clear:var(--pane-tint-accent)]",
        "has-[[data-state=checked]]:[--pane-border-clear:var(--pane-border-accent)]",
      )}
    >
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(
          "flex size-full items-center justify-center rounded-full border border-foreground/20 bg-transparent outline-none disabled:cursor-not-allowed data-[state=checked]:border-transparent",
          className,
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="size-2 rounded-full bg-[var(--pane-knob)]"
        />
      </RadioGroupPrimitive.Item>
    </Pane>
  );
}

export { RadioGroup, RadioGroupItem };
