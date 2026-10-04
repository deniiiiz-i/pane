import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every Pane release, newest first.",
};

interface Release {
  version: string;
  /** ISO date the GitHub release was published */
  date: string;
  prerelease?: boolean;
  summary: string;
  changes: string[];
}

// Newest first, published GitHub releases only. Each entry links to its
// release by tag.
const releases: Release[] = [
  {
    version: "0.2.0",
    date: "2026-10-04",
    summary: "Five new components for menus, forms and selection.",
    changes: [
      "Popover: a floating glass panel anchored to a trigger.",
      "Dropdown Menu: a glass menu with checkbox and radio items, shortcuts and submenus.",
      "Select: a clear glass field that opens a glass list of options.",
      "Slider: a glass track with a green fill, whose knob swells into clear glass while it is dragged.",
      "Toggle Group: a single-choice control with a glass indicator that springs between items.",
      "Fixed the page falling back to a serif font after installing Pane into a fresh Next.js app.",
      'Removed the "tinted" Badge variant. Badges now come in the default style only.',
      "Dialog and Sheet use a denser overlay material so their content stays readable over busy pages.",
      "Tooltip, Popover, Dropdown Menu, Select, Dialog and Sheet keep their glass when opened from inside another pane, via the new nested prop on Pane.",
    ],
  },
  {
    version: "0.1.0",
    date: "2026-09-21",
    prerelease: true,
    summary:
      "The first public release of Pane as a shadcn registry, installable through the @pane namespace.",
    changes: [
      "The Pane primitive: a refracted rim, a tinted backdrop and a specular highlight that follows the pointer, in regular and clear variants.",
      "Button, Card, Badge, Input, Switch, Tabs, Tooltip, Dialog and Sheet, all built on Pane.",
      "Glass degrades to blur or a flat tint where the browser can't render it, and honors prefers-reduced-transparency.",
      "The --pane-* design tokens for light and dark, generated into the registry from globals.css.",
    ],
  },
];

function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function ChangelogPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Changelog</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Every Pane release, newest first. Full release notes live on{" "}
          <Link
            href={`${siteConfig.links.github}/releases`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>

      {releases.map((release) => (
        <section key={release.version} className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold">v{release.version}</h2>
            {release.prerelease ? <Badge>Pre-release</Badge> : null}
            <time
              dateTime={release.date}
              className="text-sm text-muted-foreground"
            >
              {formatDate(release.date)}
            </time>
          </div>
          <p className="text-sm text-muted-foreground">{release.summary}</p>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted-foreground marker:text-foreground/30">
            {release.changes.map((change) => (
              <li key={change}>{change}</li>
            ))}
          </ul>
          <Link
            href={`${siteConfig.links.github}/releases/tag/v${release.version}`}
            className="w-fit text-sm font-medium underline underline-offset-4"
          >
            View on GitHub
          </Link>
        </section>
      ))}
    </div>
  );
}
