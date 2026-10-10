import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm font-medium">
          Accept terms and conditions
        </label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="notifications" defaultChecked />
        <div className="grid gap-1">
          <label htmlFor="notifications" className="text-sm font-medium">
            Enable notifications
          </label>
          <p className="text-sm text-muted-foreground">
            You can turn them off at any time.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id="disabled" disabled />
        <label
          htmlFor="disabled"
          className="text-sm font-medium text-muted-foreground"
        >
          Disabled
        </label>
      </div>
    </div>
  );
}
