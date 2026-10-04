import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Share</Button>
      </PopoverTrigger>
      <PopoverContent className="grid gap-3">
        <div className="grid gap-1">
          <p className="font-medium">Share this album</p>
          <p className="text-muted-foreground">
            Anyone with the link can view it.
          </p>
        </div>
        <Input readOnly defaultValue="pane.theui.company/a/summer" />
      </PopoverContent>
    </Popover>
  );
}
