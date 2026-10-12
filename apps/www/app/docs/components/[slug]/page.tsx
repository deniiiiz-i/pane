import type { Metadata } from "next";
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
      </section>

      {component.usage ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Usage</h2>
          <CodeBlock lang="tsx" code={component.usage} />
        </section>
      ) : null}

      {component.props || component.reference ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">
            {component.props ? "Props" : "API reference"}
          </h2>
          {component.props ? <PropsTable rows={component.props} /> : null}
          {component.reference ? (
            <p className="text-sm text-muted-foreground">
              {component.props ? "Also accepts" : "Accepts"} every prop of{" "}
              <a
                href={component.reference.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-foreground underline underline-offset-4"
              >
                {component.reference.label}
              </a>
              .
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
