import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

const wrapperVariants = cva("inline-flex shrink-0", {
  variants: {
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: { size: "default" },
});

const radiusBySize: Record<string, number> = {
  default: 16,
  sm: 13,
  lg: 20,
  icon: 16,
};

const buttonVariants = cva(
  // flex-1: when a parent stretches the glass (a stacked dialog footer, say)
  // the button fills it and keeps its label centred
  "inline-flex flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap text-sm font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-foreground",
        prominent: "text-[var(--pane-accent-foreground)]",
        destructive: "text-white",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "size-9 px-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Pane
      variant="clear"
      interactive
      radius={radiusBySize[size ?? "default"]}
      className={cn(
        wrapperVariants({ size }),
        // keyboard only: `focus-within` leaves the ring painted around the pane
        // after every mouse click
        "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-offset-0",
        // filled variants: the glass takes the color, denser than a Switch so
        // the label reads, but the rim and glint still show
        variant === "prominent" &&
          "[--pane-tint-clear:color-mix(in_oklab,var(--pane-accent)_92%,transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-accent)_92%,transparent)] [--pane-border-clear:var(--pane-border-accent)]",
        variant === "destructive" &&
          "[--pane-tint-clear:color-mix(in_oklab,var(--pane-destructive)_92%,transparent)] [--pane-nested-clear:color-mix(in_oklab,var(--pane-destructive)_92%,transparent)] [--pane-border-clear:var(--pane-border-accent)]",
      )}
    >
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(
          buttonVariants({ variant, size, className }),
          "bg-transparent",
        )}
        {...props}
      />
    </Pane>
  );
}

export { Button, buttonVariants };
