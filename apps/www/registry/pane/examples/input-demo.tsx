import { Input } from "@/components/ui/input";

export default function InputDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Input type="email" placeholder="Email address" />
      <Input type="password" placeholder="Password" />
    </div>
  );
}
