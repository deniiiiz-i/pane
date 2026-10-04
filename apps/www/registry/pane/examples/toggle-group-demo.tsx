import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <ToggleGroup defaultValue="week" aria-label="Calendar view">
      <ToggleGroupItem value="day">Day</ToggleGroupItem>
      <ToggleGroupItem value="week">Week</ToggleGroupItem>
      <ToggleGroupItem value="month">Month</ToggleGroupItem>
      <ToggleGroupItem value="year">Year</ToggleGroupItem>
    </ToggleGroup>
  );
}
