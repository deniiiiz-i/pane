import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CodeBlock } from "@/components/docs/code-block";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { componentsMeta, getComponentMeta } from "@/lib/components-meta";

export function generateStaticParams() {
  return componentsMeta.map((component) => ({ slug: component.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const component = getComponentMeta(slug);
  if (!component) return {};

  return {
    title: component.title,
    description: component.description,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const component = getComponentMeta(slug);

  if (!component) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          {component.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {component.description}
        </p>
      </div>

      <ComponentPreview
        registryName={component.registryName}
        demo={component.demo}
      />

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock
          lang="bash"
          code={`npx shadcn@latest add @pane/${component.registryName}`}
        />
        <p className="text-sm text-muted-foreground">
          First time using Pane in this project? See{" "}
          <Link
            href="/docs/installation"
            className="font-medium text-foreground underline underline-offset-4"
          >
            installation
          </Link>{" "}
          to register the{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            @pane
          </code>{" "}
          namespace.
        </p>
      </section>

      {component.props ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Props</h2>
          <PropsTable rows={component.props} />
        </section>
      ) : null}
    </div>
  );
}
