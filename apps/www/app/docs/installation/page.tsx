import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Pane components with the shadcn CLI or copy the source directly — register the @pane namespace once and add any component.",
};

export default function InstallationPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Installation</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Pane ships as a shadcn-compatible registry. Install components with
          the shadcn CLI, or copy the source straight from any component page —
          both put the same code in your project.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">
          1. Register the Pane namespace
        </h2>
        <p className="text-sm text-muted-foreground">
          Components reference each other internally (a{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            Button
          </code>{" "}
          depends on{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            {"<Pane>"}
          </code>
          , which depends on the glass engine). So the CLI doesn&apos;t confuse
          those with the official shadcn/ui components of the same name, add
          Pane as a named registry — a one-time step per project — in{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            components.json
          </code>
          :
        </p>
        <CodeBlock
          lang="json"
          code={`{
  "registries": {
    "@pane": "${siteUrl}/r/{name}.json"
  }
}`}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">2. Install a component</h2>
        <CodeBlock lang="bash" code="npx shadcn@latest add @pane/button" />
        <p className="text-sm text-muted-foreground">
          Swap{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            button
          </code>{" "}
          for any component name on the{" "}
          <a
            href="/docs/components/pane"
            className="font-medium text-foreground underline underline-offset-4"
          >
            components
          </a>{" "}
          pages. The CLI resolves{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            registryDependencies
          </code>{" "}
          automatically — installing{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            button
          </code>{" "}
          also pulls in the{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            Pane
          </code>{" "}
          primitive, the glass engine, and injects the{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            --pane-*
          </code>{" "}
          CSS variables into your{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            globals.css
          </code>
          .
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">3. Or copy it by hand</h2>
        <p className="text-sm text-muted-foreground">
          Prefer to copy code directly? Open the &quot;Code&quot; tab on any
          component&apos;s preview and paste the file into your project.
          You&apos;ll also need the{" "}
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            Pane
          </code>{" "}
          primitive and the glass engine (
          <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
            lib/glass
          </code>{" "}
          and the two hooks) that every component depends on.
        </p>
        <CodeBlock
          lang="bash"
          code="npm install class-variance-authority clsx tailwind-merge radix-ui lucide-react motion"
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Requirements</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>React 19 and Tailwind CSS v4</li>
          <li>
            A build that supports modern CSS —{" "}
            <code className="rounded bg-foreground/[0.06] px-1.5 py-0.5">
              backdrop-filter
            </code>{" "}
            and, for the full refraction pass, a Chromium-based browser at
            runtime
          </li>
        </ul>
      </section>
    </div>
  );
}
