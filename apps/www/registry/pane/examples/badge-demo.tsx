import { Badge } from "@/components/ui/badge";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>New</Badge>
      <Badge variant="secondary">v1.0</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge appearance="tinted">Pro</Badge>
      <Badge variant="destructive" appearance="tinted">
        Beta
      </Badge>
    </div>
  );
}
