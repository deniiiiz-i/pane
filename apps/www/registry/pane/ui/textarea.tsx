import type * as React from "react";
import { Pane } from "@/components/ui/pane";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <Pane
      variant="clear"
      radius={14}
      className="w-full focus-within:ring-2 focus-within:ring-[var(--pane-highlight)] focus-within:ring-offset-0 has-[:disabled]:opacity-50"
    >
      <textarea
        data-slot="textarea"
        className={cn(
          "flex field-sizing-content min-h-20 w-full bg-transparent px-3.5 py-2.5 text-base outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed md:text-sm",
          className,
        )}
        {...props}
      />
    </Pane>
  );
}

export { Textarea };
