import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap px-2.5 py-0.5 text-xs font-medium [&_svg]:size-3 [&_svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-foreground",
        prominent: "text-[var(--pane-accent-foreground)]",
        destructive: "text-white",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Pane
      variant="clear"
      radius={999}
      className={cn(
        "inline-flex w-fit shrink-0",
        // filled variants, the same fills as Button's
        variant === "prominent" &&
          "[--pane-tint-clear:color-mix(in_oklab,var(--pane-accent)_92%,transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-accent)_92%,transparent)] [--pane-border-clear:var(--pane-border-accent)]",
        variant === "destructive" &&
          "[--pane-tint-clear:color-mix(in_oklab,var(--pane-destructive)_92%,transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-destructive)_92%,transparent)] [--pane-border-clear:var(--pane-border-accent)]",
      )}
    >
      <Comp
        data-slot="badge"
        className={cn(badgeVariants({ variant, className }), "bg-transparent")}
        {...props}
      />
    </Pane>
  );
}

export { Badge, badgeVariants };
