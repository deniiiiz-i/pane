"use client";

import { useTheme } from "next-themes";
import * as React from "react";
import { BACKGROUNDS } from "@/components/docs/preview-surface";

/**
 * A colorful, moving backdrop for the home showcase. Glass needs something
 * behind it to bend — over the flat page it reads as plain white cards.
 */
export function ShowcaseBackdrop({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [still, setStill] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // The theme is only known on the client, so the clip waits for mount:
  // rendering it during hydration would mismatch the server HTML, and
  // guessing would flash the light clip at dark-theme visitors.
  const src = !mounted
    ? null
    : resolvedTheme === "dark"
      ? BACKGROUNDS.dark
      : resolvedTheme === "light"
        ? BACKGROUNDS.light
        : null;

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] p-3 sm:p-6">
      {/* shown while the clip loads, and wherever video can't play */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(at_15%_20%,#f97316_0,transparent_55%),radial-gradient(at_85%_25%,#8b5cf6_0,transparent_55%),radial-gradient(at_50%_90%,#06b6d4_0,transparent_55%)] opacity-60 dark:opacity-40"
      />
      {src ? (
        // keyed to remount on theme change: swapping `src` on a playing
        // <video> leaves the old frame up until load() is called
        <video
          key={src}
          src={src}
          autoPlay={!still}
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
