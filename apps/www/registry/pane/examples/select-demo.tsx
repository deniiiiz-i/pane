import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Choose a city" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Cities</SelectLabel>
          <SelectItem value="cupertino">Cupertino</SelectItem>
          <SelectItem value="berlin">Berlin</SelectItem>
          <SelectItem value="istanbul">Istanbul</SelectItem>
          <SelectItem value="tokyo">Tokyo</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
