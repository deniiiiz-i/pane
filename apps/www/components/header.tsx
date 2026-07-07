import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/docs/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Pane } from "@/components/ui/pane";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex justify-center px-4 pt-4">
      <Pane
        variant="clear"
        radius={22}
        className="flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-2.5"
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/pane.png"
            alt="Pane"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="text-sm font-semibold tracking-tight">Pane</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            href="/docs"
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          <Link
            href="/docs/components/pane"
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </Pane>
    </header>
  );
}
