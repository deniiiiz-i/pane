import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { getGlassSource, getStyleCssVars } from "@/lib/registry-source";

export const metadata: Metadata = {
  title: "Theming",
  description:
    "Customize the Pane glass material with CSS variables and the glass configuration.",
};

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5";

export default function ThemingPage() {
  const configSource = getGlassSource("config");
  const cssVars = getStyleCssVars();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Theming</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Customize the glass material through CSS variables and the glass
          configuration. Changes apply to every component that uses{" "}
          <code className={code}>{"<Pane>"}</code>.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Glass tokens — globals.css</h2>
        <p className="text-sm text-muted-foreground">
          Installation adds the <code className={code}>--pane-*</code> variables
          below to the stylesheet configured in{" "}
          <code className={code}>components.json</code>, usually{" "}
          <code className={code}>app/globals.css</code>. Edit them in your
          project to change blur, saturation, tint, borders, highlights and
          shadows, and the green accent that fills an active Switch and Slider.
          The <code className={code}>.dark</code> rule overrides the light
          values when dark mode is active.
        </p>
        <CodeBlock lang="css" code={cssVars} />
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
          <code className={code}>use-glass-support</code> checks for
          backdrop-filter support, honors{" "}
          <code className={code}>prefers-reduced-transparency</code>, and
          returns one of three tiers:
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
            <code className={code}>backdrop-filter</code>).
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
