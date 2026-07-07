import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-3">
      <Switch id="airplane-mode" defaultChecked />
      <label htmlFor="airplane-mode" className="text-sm font-medium">
        Airplane mode
      </label>
    </div>
  );
}
