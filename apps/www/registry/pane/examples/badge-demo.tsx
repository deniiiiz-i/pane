import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="tinted">Pro</Badge>
      <Badge>v1.0</Badge>
    </div>
  );
}
