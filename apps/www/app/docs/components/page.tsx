import type { Metadata } from "next";
import Link from "next/link";
import { componentsMeta } from "@/lib/components-meta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Components",
  description: "All available liquid-glass components.",
};

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Components</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Explore all the liquid-glass components available in {siteConfig.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {componentsMeta.map((component) => (
          <Link
            key={component.slug}
            href={`/docs/components/${component.slug}`}
            className="group flex flex-col gap-2 rounded-xl border border-foreground/10 bg-foreground/[0.02] p-5 transition-colors hover:bg-foreground/[0.04]"
          >
            <h2 className="text-xl font-semibold">{component.title}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
