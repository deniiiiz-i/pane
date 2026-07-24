export const siteConfig = {
  name: "Pane",
  tagline: "Liquid glass components for React.",
  description:
    "A shadcn-compatible component registry recreating Apple's liquid glass material. Copy the code or install with the shadcn CLI — no npm package required.",
  links: {
    github: "https://github.com",
  },
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://pane.theui.company";
}

export interface NavItem {
  title: string;
  href: string;
}

export const docsNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Getting started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Pane", href: "/docs/components/pane" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Sheet", href: "/docs/components/sheet" },
    ],
  },
];
