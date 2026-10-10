import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const gettingStarted = [
  {
    title: "Introduction",
    href: "/docs",
    description: "What Pane is and what makes the material glass.",
  },
  {
    title: "Installation",
    href: "/docs/installation",
    description: "Add your first component with the shadcn CLI.",
  },
  {
    title: "Theming",
    href: "/docs/theming",
    description: "Tune tint, blur, refraction and springs.",
  },
];

const components = [
  { title: "Button", href: "/docs/components/button" },
  { title: "Dialog", href: "/docs/components/dialog" },
  { title: "Select", href: "/docs/components/select" },
  { title: "Slider", href: "/docs/components/slider" },
];

export default function NavigationMenuDemo() {
  return (
    // room below the triggers, so an open panel isn't cut off by the preview
    <div className="flex min-h-72 items-start">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-72 gap-1">
                {gettingStarted.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink href={item.href}>
                      <div className="font-medium">{item.title}</div>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-60 grid-cols-2 gap-1">
                {components.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink href={item.href}>
                      {item.title}
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              href="/docs/changelog"
            >
              Changelog
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
