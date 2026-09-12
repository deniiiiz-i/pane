import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { getGlassSource } from "@/lib/registry-source";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Tune the liquid glass material — blur, tint, borders, refraction and spring physics — from one tuning surface.",
};

export default function ThemingPage() {
  const configSource = getGlassSource("config");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Theming</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          The glass material has one tuning surface, split across two files.
          Change either and every component that uses{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            {"<Pane>"}
          </code>{" "}
          updates.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">
          Static tokens — app/globals.css
        </h2>
        <p className="text-sm text-muted-foreground">
          Blur radius, saturation, tint, border and shadow colors don&apos;t
          need JavaScript, so they live as CSS custom properties with light/dark
          pairs, the same way shadcn/ui themes work.
        </p>
        <CodeBlock
          lang="css"
          code={`:root {
  --pane-fg: var(--foreground);
  --pane-blur-regular: 12px;
  --pane-blur-clear: 5px;
  --pane-saturation: 1.7;
  --pane-tint-regular: rgba(255, 255, 255, 0.26);
  --pane-tint-clear: rgba(255, 255, 255, 0.08);
  --pane-nested-regular: rgba(255, 255, 255, 0.4);
  --pane-nested-clear: rgba(255, 255, 255, 0.2);
  --pane-border-width: 0.5px;
  --pane-border-regular: rgba(255, 255, 255, 0.85);
  --pane-border-clear: rgba(255, 255, 255, 0.6);
  --pane-tint-accent: rgba(52, 199, 89, 0.82);
  --pane-border-accent: rgba(255, 255, 255, 0.7);
  --pane-knob: rgba(255, 255, 255, 0.92);
  --pane-highlight: rgba(255, 255, 255, 0.85);
  --pane-shadow: rgba(0, 0, 0, 0.1);
}

.dark {
  --pane-tint-regular: rgba(28, 28, 32, 0.3);
  --pane-tint-clear: rgba(18, 18, 22, 0.12);
  --pane-nested-regular: rgba(255, 255, 255, 0.12);
  --pane-nested-clear: rgba(255, 255, 255, 0.07);
  --pane-border-regular: rgba(255, 255, 255, 0.14);
  --pane-border-clear: rgba(255, 255, 255, 0.1);
  --pane-tint-accent: rgba(48, 209, 88, 0.75);
  --pane-border-accent: rgba(255, 255, 255, 0.24);
  --pane-knob: rgba(255, 255, 255, 0.95);
  --pane-highlight: rgba(255, 255, 255, 0.22);
  --pane-shadow: rgba(0, 0, 0, 0.5);
}`}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">
          Dynamic tunables — lib/glass/config.ts
        </h2>
        <p className="text-sm text-muted-foreground">
          Everything that feeds the SVG refraction filter or the spring physics
          has to live in JS. This is the file to open if you want more or less
          lensing, a stronger chromatic-aberration edge, or snappier vs. softer
          press feedback.
        </p>
        <CodeBlock lang="tsx" code={configSource} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Quality tiers</h2>
        <p className="text-sm text-muted-foreground">
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            use-glass-support
          </code>{" "}
          checks for backdrop-filter support, honors{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            prefers-reduced-transparency
          </code>
          , and returns one of three tiers:
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">full</span> — Chrome,
            Chromium and Edge get the complete effect: blur, saturation, edge
            refraction and chromatic aberration.
          </li>
          <li>
            <span className="font-medium text-foreground">reduced</span> —
            everyone else gets blur, saturation and the pointer-reactive
            specular highlight, without edge lensing (their engines don&apos;t
            reliably support an SVG filter referenced inside{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
              backdrop-filter
            </code>
            ).
          </li>
          <li>
            <span className="font-medium text-foreground">none</span> — a flat
            translucent tint without backdrop filtering when the browser has no
            backdrop-filter support, or the user asked for reduced transparency.
          </li>
        </ul>
      </section>
    </div>
  );
}
