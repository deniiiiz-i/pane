import type { ComponentType } from "react";
import BadgeDemo from "@/registry/pane/examples/badge-demo";
import ButtonDemo from "@/registry/pane/examples/button-demo";
import CardDemo from "@/registry/pane/examples/card-demo";
import DialogDemo from "@/registry/pane/examples/dialog-demo";
import InputDemo from "@/registry/pane/examples/input-demo";
import PaneDemo from "@/registry/pane/examples/pane-demo";
import SheetDemo from "@/registry/pane/examples/sheet-demo";
import SwitchDemo from "@/registry/pane/examples/switch-demo";
import TabsDemo from "@/registry/pane/examples/tabs-demo";
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
];

export function getComponentMeta(slug: string) {
  return componentsMeta.find((component) => component.slug === slug);
}
