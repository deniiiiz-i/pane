"use client";

import { motion } from "motion/react";
import * as React from "react";
import { useGlassPointer } from "@/hooks/use-glass-pointer";
import { useGlassSupport } from "@/hooks/use-glass-support";
import {
  GLASS_MIN_FILTER_AREA,
  GLASS_SPECULAR,
  GLASS_SPRING,
} from "@/lib/glass/config";
import { GlassFilter } from "@/lib/glass/glass-filter";
import type { GlassVariant } from "@/lib/glass/types";
import { type PaneVariantProps, paneVariants } from "@/lib/glass/variants";
import { cn } from "@/lib/utils";

export interface PaneProps
  extends Omit<React.ComponentProps<typeof motion.div>, "children" | "ref">,
    Omit<PaneVariantProps, "variant"> {
  variant?: GlassVariant;
  /** corner radius in px — kept numeric so the refraction filter can match it exactly */
  radius?: number;
  children?: React.ReactNode;
}

function usePaneSize(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver(([entry]) => {
      const box = entry.contentRect;
      setSize({ width: box.width, height: box.height });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

/**
 * The base liquid-glass surface every Pane component is built on. Renders
 * the layered material (blur/refraction, tint, specular highlight, border
 * sheen) and reacts to pointer position and press. Also exported directly
 * for wrapping arbitrary content in glass.
 */
export function Pane({
  variant = "regular",
  interactive = false,
  radius = 28,
  className,
  style,
  children,
  ...props
}: PaneProps) {
  const reactId = React.useId().replace(/:/g, "");
  const filterId = `pane-filter-${reactId}`;
  const { ref, active } = useGlassPointer<HTMLDivElement>();
  const quality = useGlassSupport();
  const { width, height } = usePaneSize(ref);
  const canDisplace =
    quality === "full" && width * height >= GLASS_MIN_FILTER_AREA;

  const blurVar = `var(--pane-blur-${variant})`;
  const backdropFilter =
    quality === "none"
      ? undefined
      : canDisplace
        ? `blur(${blurVar}) saturate(var(--pane-saturation)) url(#${filterId})`
        : `blur(${blurVar}) saturate(var(--pane-saturation))`;

  return (
    <motion.div
      ref={ref}
      data-slot="pane"
      data-variant={variant}
      className={cn(
        paneVariants({ variant, interactive }),
        "overflow-hidden rounded-[var(--pane-radius)]",
        className,
      )}
      style={
        {
          ...style,
          "--pane-radius": `${radius}px`,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          backgroundColor:
            quality === "none" ? `var(--pane-tint-${variant})` : undefined,
          boxShadow:
            "0 1px 1px 0 var(--pane-shadow), 0 16px 40px -20px var(--pane-shadow)",
        } as React.CSSProperties
      }
      whileTap={interactive ? { scale: 0.97 } : undefined}
      whileHover={interactive ? { scale: 1.015 } : undefined}
      transition={GLASS_SPRING.press}
      {...props}
    >
      <span
        aria-hidden="true"
        className="-z-10 pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ backgroundColor: `var(--pane-tint-${variant})` }}
      />
      <span
        aria-hidden="true"
        className="-z-10 pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-screen transition-opacity duration-300 ease-out"
        style={{
          opacity: active
            ? GLASS_SPECULAR.intensity
            : GLASS_SPECULAR.intensity * 0.5,
          background: `radial-gradient(${GLASS_SPECULAR.size}px circle at var(--pane-mx, 50%) var(--pane-my, 32%), var(--pane-highlight), transparent 70%)`,
        }}
      />
      <span
        aria-hidden="true"
        className="-z-10 pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          boxShadow: `inset 0 1px 0 0 var(--pane-highlight), inset 0 0 0 1px var(--pane-border-${variant})`,
        }}
      />
      {children}
      {canDisplace ? (
        <GlassFilter
          id={filterId}
          variant={variant}
          width={width}
          height={height}
          radius={radius}
        />
      ) : null}
    </motion.div>
  );
}
