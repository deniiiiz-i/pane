import type { ReactNode } from "react";
import { DocsShell } from "@/components/docs/docs-shell";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <DocsShell>{children}</DocsShell>
      <Footer />
    </div>
  );
}
