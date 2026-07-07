import type { Metadata } from "next";
import Link from "next/link";
import { ComponentPreview } from "@/components/docs/component-preview";
import { componentsMeta } from "@/lib/components-meta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Introduction",
  description: siteConfig.description,
};

export default function DocsIntroductionPage() {
  const pane = componentsMeta.find((component) => component.slug === "pane");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Introduction</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>

      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
        <p>
          {siteConfig.name} is not an npm package. Every component is source you
          copy into your own project — via{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground">
            npx shadcn add
          </code>{" "}
          or by hand — so you own the code, can read it, and can change it.
        </p>
        <p>
          Every component is built on top of one primitive,{" "}
          <Link
            href="/docs/components/pane"
            className="font-medium text-foreground underline underline-offset-4"
          >
            {"<Pane>"}
          </Link>
          , which recreates Apple&apos;s liquid glass material: real-time
          refraction at the edges, a pointer-reactive specular highlight, and
          spring physics on press — not just a blurred background.
        </p>
      </div>

      {pane ? (
        <ComponentPreview registryName={pane.registryName} demo={pane.demo} />
      ) : null}
    </div>
  );
}
