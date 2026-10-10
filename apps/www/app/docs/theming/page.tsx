import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import { Pane } from "@/components/ui/pane";
import {
  getGlassSource,
  getStyleCssVars,
  getStyleTokens,
} from "@/lib/registry-source";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Customize the Pane glass material with CSS variables and the glass configuration.",
};

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground";

// What each token does, grouped the way the material is built. Values come
// from registry.json, so a token missing here still shows up under "Other".
const groups: { title: string; tokens: Record<string, string> }[] = [
  {
    title: "Surface",
    tokens: {
      "pane-fg": "Text color on glass.",
      "pane-tint-regular": "Body tint of regular glass.",
      "pane-tint-clear": "Body tint of clear glass.",
      "pane-blur-regular": "Backdrop blur behind regular glass.",
      "pane-blur-clear": "Backdrop blur behind clear glass.",
      "pane-saturation": "How much the backdrop's color is boosted.",
    },
  },
  {
    title: "Nested",
    tokens: {
      "pane-nested-regular":
        "Flat tint for regular glass inside another pane, where glass can't stack.",
      "pane-nested-clear": "Flat tint for clear glass inside another pane.",
    },
  },
  {
    title: "Overlay",
    tokens: {
      "pane-blur-overlay": "Blur of the denser Dialog and Sheet material.",
      "pane-tint-overlay": "Tint of the denser Dialog and Sheet material.",
    },
  },
  {
    title: "Edge and light",
    tokens: {
      "pane-border-width": "Width of the rim.",
      "pane-border-regular": "Rim color of regular glass.",
      "pane-border-clear": "Rim color of clear glass.",
      "pane-highlight": "Rim arcs, the pointer glint and focus rings.",
      "pane-shadow": "Drop shadow under every pane.",
    },
  },
  {
    title: "Controls",
    tokens: {
      "pane-tint-accent": "Fill of an active Switch and the Slider range.",
      "pane-border-accent": "Rim of a Switch that is on.",
      "pane-knob": "Switch and Slider knob.",
    },
  },
];

const tiers = [
  {
    name: "full",
    who: "Chrome, Edge and most Chromium browsers",
    description:
      "The complete effect: blur, saturation, edge refraction and chromatic aberration.",
  },
  {
    name: "reduced",
    who: "Safari, Firefox and everyone else",
    description:
      "Blur, saturation and the pointer-reactive highlight, without edge lensing.",
  },
  {
    name: "none",
    who: "No backdrop-filter, or reduced transparency",
    description: "A flat translucent tint with no backdrop filtering.",
  },
];

/**
 * Each value sits on its own theme's background, over a checkerboard so the
 * alpha reads as alpha: a light-mode tint is shown on light, a dark one on dark.
 */
const swatchBase: Record<"light" | "dark", CSSProperties> = {
  light: {
    backgroundColor: "#f5f5f7",
    backgroundImage:
      "conic-gradient(rgb(0 0 0 / 0.1) 25%, transparent 0 50%, rgb(0 0 0 / 0.1) 0 75%, transparent 0)",
    backgroundSize: "8px 8px",
  },
  dark: {
    backgroundColor: "#1c1c1e",
    backgroundImage:
      "conic-gradient(rgb(255 255 255 / 0.1) 25%, transparent 0 50%, rgb(255 255 255 / 0.1) 0 75%, transparent 0)",
    backgroundSize: "8px 8px",
  },
};

function TokenValue({
  scheme,
  value,
}: {
  scheme: "light" | "dark";
  value: string;
}) {
  const isColor = value.startsWith("rgb") || value.startsWith("#");
  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="w-9 font-sans text-muted-foreground capitalize">
        {scheme}
      </span>
      {isColor ? (
        <span
          className="size-4 shrink-0 overflow-hidden rounded-[5px] ring-1 ring-foreground/10"
          style={swatchBase[scheme]}
        >
          <span className="block size-full" style={{ background: value }} />
        </span>
      ) : null}
      <span className="text-foreground">{value}</span>
    </div>
  );
}

export default function ThemingPage() {
  const { light, dark } = getStyleTokens();
  const described = new Set(groups.flatMap((g) => Object.keys(g.tokens)));
  const other = Object.keys(light).filter((name) => !described.has(name));
  const allGroups = other.length
    ? [
        ...groups,
        {
          title: "Other",
          tokens: Object.fromEntries(other.map((name) => [name, ""])),
        },
      ]
    : groups;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Theming</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          The glass is driven by CSS variables and one config file. Change them
          once and every component built on{" "}
          <code className="text-foreground">{"<Pane>"}</code> follows.
        </p>
      </div>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Glass tokens</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Installation adds these <code className={code}>--pane-*</code>{" "}
          variables to the stylesheet set in{" "}
          <code className={code}>components.json</code>, usually{" "}
          <code className={code}>app/globals.css</code>. Light values live on{" "}
          <code className={code}>:root</code>, and{" "}
          <code className={code}>.dark</code> overrides them in dark mode.
        </p>

        {allGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <h3 className="font-medium text-sm">{group.title}</h3>
            <Pane radius={20} className="flex flex-col">
              {Object.entries(group.tokens).map(([name, description]) => (
                <div
                  key={name}
                  className="flex flex-col gap-3 border-foreground/5 border-t px-5 py-4 first:border-t-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div className="flex min-w-0 flex-col gap-1">
                    <code className="font-mono text-[13px] text-foreground">
                      --{name}
                    </code>
                    {description ? (
                      <p className="text-sm text-muted-foreground">
                        {description}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 flex-col gap-1.5 sm:w-64">
                    <TokenValue scheme="light" value={light[name] ?? "—"} />
                    <TokenValue
                      scheme="dark"
                      value={dark[name] ?? light[name] ?? "—"}
                    />
                  </div>
                </div>
              ))}
            </Pane>
          </div>
        ))}

        <details className="group">
          <summary className="w-fit cursor-pointer text-sm font-medium underline-offset-4 hover:underline">
            Show the full CSS
          </summary>
          <div className="mt-3">
            <CodeBlock lang="css" code={getStyleCssVars()} />
          </div>
        </details>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Refraction and springs</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Anything that feeds the SVG refraction filter or the spring physics
          has to live in JS, in{" "}
          <code className={code}>lib/glass/config.ts</code>. Open it for more or
          less lensing, a stronger chromatic edge, or snappier or softer press
          feedback.
        </p>
        <CodeBlock lang="tsx" code={getGlassSource("config")} />
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Quality tiers</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          <code className={code}>use-glass-support</code> checks what the
          browser can do, honors{" "}
          <code className={code}>prefers-reduced-transparency</code>, and picks
          one of three tiers. Nothing to configure — it&apos;s automatic.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {tiers.map((tier) => (
            <Pane
              key={tier.name}
              radius={20}
              className="flex flex-col gap-2 p-5"
            >
              <code className="w-fit font-mono font-medium text-sm">
                {tier.name}
              </code>
              <p className="text-xs text-muted-foreground">{tier.who}</p>
              <p className="text-sm">{tier.description}</p>
            </Pane>
          ))}
        </div>
      </section>
    </div>
  );
}
