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
        default: "",
        secondary: "text-foreground",
        destructive: "",
      },
      appearance: {
        filled: "",
        tinted: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        appearance: "filled",
        className: "text-[var(--pane-accent-foreground)]",
      },
      {
        variant: "default",
        appearance: "tinted",
        className: "text-[var(--pane-accent-text)]",
      },
      { variant: "destructive", appearance: "filled", className: "text-white" },
      {
        variant: "destructive",
        appearance: "tinted",
        className: "text-[var(--pane-destructive-text)]",
      },
    ],
    defaultVariants: { variant: "default", appearance: "filled" },
  },
);

/** The same glass per variant as Button's. */
const glassByVariant = {
  default: {
    filled:
      "[--pane-tint-clear:color-mix(in_oklab,var(--pane-accent)_92%,transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-accent)_92%,transparent)] [--pane-border-clear:var(--pane-border-accent)]",
    tinted:
      "[--pane-tint-clear:color-mix(in_oklab,var(--pane-accent)_var(--pane-tinted-opacity),transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-accent)_var(--pane-tinted-opacity),transparent)]",
  },
  destructive: {
    filled:
      "[--pane-tint-clear:color-mix(in_oklab,var(--pane-destructive)_92%,transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-destructive)_92%,transparent)] [--pane-border-clear:var(--pane-border-accent)]",
    tinted:
      "[--pane-tint-clear:color-mix(in_oklab,var(--pane-destructive)_var(--pane-tinted-opacity),transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-destructive)_var(--pane-tinted-opacity),transparent)]",
  },
  secondary: { filled: "", tinted: "" },
};

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

function Badge({
  className,
  variant = "default",
  appearance = "filled",
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
        glassByVariant[variant ?? "default"][appearance ?? "filled"],
      )}
    >
      <Comp
        data-slot="badge"
        data-variant={variant}
        data-appearance={appearance}
        className={cn(
          badgeVariants({ variant, appearance, className }),
          "bg-transparent",
        )}
        {...props}
      />
    </Pane>
  );
}

export { Badge, badgeVariants };
