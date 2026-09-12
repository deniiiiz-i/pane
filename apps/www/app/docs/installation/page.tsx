import type { Metadata } from "next";
import { CodeBlock } from "@/components/docs/code-block";
import { getSiteUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Pane components with the shadcn CLI or copy the source directly — set up shadcn/ui, register the @pane namespace once, and add any component.",
};

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5";

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
        <h2 className="text-xl font-semibold">1. Set up shadcn/ui</h2>
        <p className="text-sm text-muted-foreground">
          Pane sits on top of the shadcn/ui project setup: a{" "}
          <code className={code}>components.json</code>, the Tailwind v4 theme
          tokens in <code className={code}>globals.css</code>, and the{" "}
          <code className={code}>@/</code> path aliases. Run init once — skip
          this step if the project already has shadcn/ui.
        </p>
        <CodeBlock lang="bash" code="npx shadcn@latest init" />
        <p className="text-sm text-muted-foreground">
          The CLI will ask which primitives to build on (Base UI, React Aria,
          Radix UI) and which theme to start from (Nova, Vega, Maia…). Neither
          answer affects Pane: our components ship their own{" "}
          <code className={code}>radix-ui</code> dependency, and the only base
          tokens they read are <code className={code}>--foreground</code> and{" "}
          <code className={code}>--muted-foreground</code>, which every theme
          defines. Pick whatever suits the rest of your app.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">
          2. Register the Pane namespace
        </h2>
        <p className="text-sm text-muted-foreground">
          Components reference each other internally (a{" "}
          <code className={code}>Button</code> depends on{" "}
          <code className={code}>{"<Pane>"}</code>, which depends on the glass
          engine). So the CLI doesn&apos;t confuse those with the official
          shadcn/ui components of the same name, add Pane as a named registry —
          a one-time step per project — in{" "}
          <code className={code}>components.json</code>:
        </p>
        <CodeBlock
          lang="json"
          code={`{
  "registries": {
    "@pane": "${siteUrl}/r/{name}.json"
  }
}`}
        />
        <p className="text-sm text-muted-foreground">
          Add it alongside the keys <code className={code}>init</code> already
          wrote — don&apos;t replace the file.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">3. Install a component</h2>
        <CodeBlock lang="bash" code="npx shadcn@latest add @pane/button" />
        <p className="text-sm text-muted-foreground">
          Swap <code className={code}>button</code> for any component name on
          the{" "}
          <a
            href="/docs/components/pane"
            className="font-medium text-foreground underline underline-offset-4"
          >
            components
          </a>{" "}
          pages. The CLI resolves{" "}
          <code className={code}>registryDependencies</code> automatically —
          installing <code className={code}>button</code> also pulls in the{" "}
          <code className={code}>Pane</code> primitive, the glass engine, and
          injects the <code className={code}>--pane-*</code> CSS variables into
          your <code className={code}>globals.css</code>.
        </p>
        <p className="text-sm text-muted-foreground">
          Pane components land in <code className={code}>components/ui/</code>{" "}
          under their own name, so adding{" "}
          <code className={code}>@pane/button</code> to a project that already
          has the shadcn/ui <code className={code}>button</code> will ask to
          overwrite it. Keep both by pointing the{" "}
          <code className={code}>ui</code> alias elsewhere, or by renaming the
          file after install.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Requirements</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
          <li>React 19 and Tailwind CSS v4</li>
          <li>
            A build that supports modern CSS —{" "}
            <code className={code}>backdrop-filter</code> and, for the full
            refraction pass, a Chromium-based browser at runtime
          </li>
        </ul>
      </section>
    </div>
  );
}
