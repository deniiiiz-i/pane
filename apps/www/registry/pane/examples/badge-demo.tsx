import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="prominent">Pro</Badge>
      <Badge variant="destructive">Beta</Badge>
    </div>
  );
}
