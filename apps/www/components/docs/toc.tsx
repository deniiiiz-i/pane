"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocEntry = {
  id: string;
  title: string;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function Toc() {
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>("main h2"),
    );

    const seen = new Map<string, number>();
    const next = headings.map((heading) => {
      const title = heading.textContent ?? "";
      if (!heading.id) {
        const base = slugify(title) || "section";
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        heading.id = count === 0 ? base : `${base}-${count}`;
      }
      heading.style.scrollMarginTop = "6rem";
      return { id: heading.id, title };
    });

    setEntries(next);
    setActiveId(next[0]?.id ?? null);

    if (next.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    for (const heading of headings) {
      observer.observe(heading);
    }

    return () => observer.disconnect();
  }, []);

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="px-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On This Page
      </p>
      <nav className="flex flex-col gap-0.5">
        {entries.map((entry) => (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm transition-colors",
              activeId === entry.id
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {entry.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
