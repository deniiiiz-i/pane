import { AtomIcon, GlobeIcon, type LucideIcon, WindIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { Step, Steps } from "@/components/docs/steps";
import { Pane } from "@/components/ui/pane";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "Install Pane components directly with the shadcn CLI using the @pane namespace, or copy the source from any component page.",
};

const code = "rounded bg-foreground/[0.06] px-1.5 py-0.5 text-foreground";
const link = "font-medium text-foreground underline underline-offset-4";

const usage = `import { Button } from "@/components/ui/button";

export function Example() {
  return <Button>Continue</Button>;
}`;

const requirements: { icon: LucideIcon; title: string; description: string }[] =
  [
    {
      icon: AtomIcon,
      title: "React 19",
      description: "Components take ref as a regular prop, without forwardRef.",
    },
    {
      icon: WindIcon,
      title: "Tailwind CSS v4",
      description: "Styles are written for v4 and its CSS-first config.",
    },
    {
      icon: GlobeIcon,
      title: "Any modern browser",
      description:
        "Full refraction in Chromium; blur and highlights everywhere else.",
    },
  ];

export default function InstallationPage() {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">Installation</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Pane ships as a shadcn registry. Add components with the shadcn CLI,
          or copy the source from any component page — both put the same code in
          your project.
        </p>
      </div>

      <Steps>
        <Step number={1} title="Set up shadcn/ui">
          <p className="text-sm text-muted-foreground">
            Skip this if your project already has a{" "}
            <code className={code}>components.json</code>. Otherwise initialize
            shadcn in it first:
          </p>
          <CodeBlock lang="bash" code="npx shadcn@latest init" />
        </Step>
        <Step number={2} title="Add a component">
          <CodeBlock lang="bash" code="npx shadcn@latest add @pane/button" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Swap <code className={code}>button</code> for any name from the{" "}
            <Link href="/docs/components" className={link}>
              components
            </Link>{" "}
            list. Dependencies come along automatically: the{" "}
            <code className={code}>Pane</code> primitive, the glass engine, and
            the <code className={code}>--pane-*</code> variables in your{" "}
            <code className={code}>globals.css</code>.
          </p>
        </Step>
        <Step number={3} title="Use it">
          <CodeBlock lang="tsx" code={usage} />
          <p className="text-sm text-muted-foreground">
            Glass shows best over something colorful. To change how it looks,
            see{" "}
            <Link href="/docs/theming" className={link}>
              Theming
            </Link>
            .
          </p>
        </Step>
      </Steps>

      <Callout title="Already using shadcn/ui?">
        Pane components install into{" "}
        <code className={code}>components/ui/</code> under their own names, so
        adding <code className={code}>@pane/button</code> to a project that has
        the shadcn <code className={code}>button</code> asks to overwrite it.
        Keep both by pointing the <code className={code}>ui</code> alias
        elsewhere, or rename the file after install.
      </Callout>

      <section className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold">Requirements</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {requirements.map(({ icon: Icon, title, description }) => (
            <Pane key={title} radius={20} className="flex flex-col gap-3 p-5">
              <Icon className="size-5 text-muted-foreground" />
              <div className="flex flex-col gap-1">
                <h3 className="font-medium">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </Pane>
          ))}
        </div>
      </section>
    </div>
  );
}
