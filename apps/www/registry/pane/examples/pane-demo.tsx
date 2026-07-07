import { Pane } from "@/components/ui/pane";

export default function PaneDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Pane
        variant="regular"
        radius={28}
        className="flex h-28 w-40 items-center justify-center"
      >
        <span className="text-sm font-medium">Regular</span>
      </Pane>
      <Pane
        variant="clear"
        radius={28}
        className="flex h-28 w-40 items-center justify-center"
      >
        <span className="text-sm font-medium">Clear</span>
      </Pane>
    </div>
  );
}
