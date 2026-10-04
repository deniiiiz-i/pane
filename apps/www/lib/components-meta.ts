import type { ComponentType } from "react";
import BadgeDemo from "@/registry/pane/examples/badge-demo";
import ButtonDemo from "@/registry/pane/examples/button-demo";
import CardDemo from "@/registry/pane/examples/card-demo";
import DialogDemo from "@/registry/pane/examples/dialog-demo";
import DropdownMenuDemo from "@/registry/pane/examples/dropdown-menu-demo";
import InputDemo from "@/registry/pane/examples/input-demo";
import PaneDemo from "@/registry/pane/examples/pane-demo";
import PopoverDemo from "@/registry/pane/examples/popover-demo";
import SelectDemo from "@/registry/pane/examples/select-demo";
import SheetDemo from "@/registry/pane/examples/sheet-demo";
import SliderDemo from "@/registry/pane/examples/slider-demo";
import SwitchDemo from "@/registry/pane/examples/switch-demo";
import TabsDemo from "@/registry/pane/examples/tabs-demo";
import ToggleGroupDemo from "@/registry/pane/examples/toggle-group-demo";
import TooltipDemo from "@/registry/pane/examples/tooltip-demo";

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentMeta {
  slug: string;
  title: string;
  description: string;
  registryName: string;
  demo: ComponentType;
  props?: PropRow[];
}

export const componentsMeta: ComponentMeta[] = [
  {
    slug: "pane",
    title: "Pane",
    description:
      "The base liquid-glass surface every component in this library is built on top of. Wrap any content in it.",
    registryName: "pane",
    demo: PaneDemo,
    props: [
      {
        name: "variant",
        type: '"regular" | "clear"',
        default: '"regular"',
        description: "Material variant, matching Apple's HIG vocabulary.",
      },
      {
        name: "radius",
        type: "number",
        default: "28",
        description: "Corner radius in px — also feeds the refraction filter.",
      },
      {
        name: "interactive",
        type: "boolean",
        default: "false",
        description: "Enables spring-based press/hover feedback.",
      },
      {
        name: "nested",
        type: "boolean",
        description:
          "Overrides nesting detection. Pass false on a pane rendered through a portal so it keeps its own backdrop when opened from inside another pane.",
      },
    ],
  },
  {
    slug: "button",
    title: "Button",
    description: "A glass button with default and destructive variants.",
    registryName: "button",
    demo: ButtonDemo,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "Visual emphasis.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        default: '"default"',
        description: "Button size.",
      },
      {
        name: "asChild",
        type: "boolean",
        default: "false",
        description:
          "Merge props onto the child element instead of rendering a <button>.",
      },
    ],
  },
  {
    slug: "card",
    title: "Card",
    description: "A glass panel with header, content and footer slots.",
    registryName: "card",
    demo: CardDemo,
  },
  {
    slug: "badge",
    title: "Badge",
    description: "A small glass pill for labels and statuses.",
    registryName: "badge",
    demo: BadgeDemo,
  },
  {
    slug: "input",
    title: "Input",
    description: "A text input rendered on a glass surface.",
    registryName: "input",
    demo: InputDemo,
  },
  {
    slug: "switch",
    title: "Switch",
    description: "A toggle with a sliding glass thumb.",
    registryName: "switch",
    demo: SwitchDemo,
  },
  {
    slug: "tabs",
    title: "Tabs",
    description: "A segmented control with a sliding glass indicator.",
    registryName: "tabs",
    demo: TabsDemo,
  },
  {
    slug: "tooltip",
    title: "Tooltip",
    description: "A small glass popover for contextual hints.",
    registryName: "tooltip",
    demo: TooltipDemo,
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "A modal glass panel over a blurred scrim.",
    registryName: "dialog",
    demo: DialogDemo,
  },
  {
    slug: "sheet",
    title: "Sheet",
    description: "A directional slide-over glass panel.",
    registryName: "sheet",
    demo: SheetDemo,
  },
  {
    slug: "popover",
    title: "Popover",
    description: "A floating glass panel anchored to a trigger.",
    registryName: "popover",
    demo: PopoverDemo,
  },
  {
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description:
      "A glass menu with checkbox and radio items, shortcuts and submenus.",
    registryName: "dropdown-menu",
    demo: DropdownMenuDemo,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        default: '"default"',
        description: "Set on DropdownMenuItem to color a destructive action.",
      },
      {
        name: "inset",
        type: "boolean",
        default: "false",
        description:
          "Set on an item, label or sub-trigger to align it with checkbox and radio items.",
      },
    ],
  },
  {
    slug: "select",
    title: "Select",
    description: "A glass field that opens a glass list of options.",
    registryName: "select",
    demo: SelectDemo,
    props: [
      {
        name: "size",
        type: '"default" | "sm"',
        default: '"default"',
        description: "Set on SelectTrigger.",
      },
      {
        name: "position",
        type: '"popper" | "item-aligned"',
        default: '"popper"',
        description:
          "Set on SelectContent. Popper floats the list below the trigger; item-aligned lays it over the trigger like a native macOS menu.",
      },
    ],
  },
  {
    slug: "slider",
    title: "Slider",
    description: "A glass track with a knob that turns to glass while dragged.",
    registryName: "slider",
    demo: SliderDemo,
  },
  {
    slug: "toggle-group",
    title: "Toggle Group",
    description:
      "A single-choice control with a glass indicator that springs between segments.",
    registryName: "toggle-group",
    demo: ToggleGroupDemo,
    props: [
      {
        name: "value",
        type: "string",
        description: "The selected segment, when controlled.",
      },
      {
        name: "defaultValue",
        type: "string",
        description: "The initially selected segment, when uncontrolled.",
      },
      {
        name: "onValueChange",
        type: "(value: string) => void",
        description:
          "Called with the new segment. Never called with an empty value — one segment is always selected.",
      },
    ],
  },
];

export function getComponentMeta(slug: string) {
  return componentsMeta.find((component) => component.slug === slug);
}
