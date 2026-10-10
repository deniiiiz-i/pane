import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="px-4 py-8 text-center text-sm text-muted-foreground">
      Designed and Built by{" "}
      <a
        href="https://theui.company"
        target="_blank"
        rel="noreferrer"
        className="font-medium text-foreground underline underline-offset-4"
      >
        Uniform Interface
      </a>
      , with open{" "}
      <a
        href={siteConfig.links.github}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-foreground underline underline-offset-4"
      >
        source code
      </a>
      .
    </footer>
  );
}
