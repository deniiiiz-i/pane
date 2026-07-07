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
        tinted: "text-[oklch(0.35_0.14_255)] dark:text-white",
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
    <Pane variant="clear" radius={999} className="inline-flex w-fit shrink-0">
      <Comp
        data-slot="badge"
        className={cn(badgeVariants({ variant, className }), "bg-transparent")}
        {...props}
      />
    </Pane>
  );
}

export { Badge, badgeVariants };
