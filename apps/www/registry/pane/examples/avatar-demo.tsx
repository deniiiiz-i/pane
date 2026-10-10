import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>DI</AvatarFallback>
        <AvatarBadge />
      </Avatar>
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
