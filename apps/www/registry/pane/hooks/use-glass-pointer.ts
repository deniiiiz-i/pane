"use client";

import { useMotionValue, useSpring } from "motion/react";
import * as React from "react";
import { GLASS_SPRING } from "../lib/glass/config";

const IDLE_X = 50;
const IDLE_Y = 32;

/**
 * Tracks pointer position relative to a glass surface and writes it to
 * `--pane-mx` / `--pane-my` (percentages) directly on the node, smoothed
 * through a spring so the specular highlight glides instead of snapping to
 * the cursor. Values are written imperatively so mouse movement never
 * triggers a React re-render.
 */
export function useGlassPointer<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [active, setActive] = React.useState(false);

  const mx = useMotionValue(IDLE_X);
  const my = useMotionValue(IDLE_Y);
  const smoothX = useSpring(mx, GLASS_SPRING.hover);
  const smoothY = useSpring(my, GLASS_SPRING.hover);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.setProperty("--pane-mx", `${IDLE_X}%`);
    node.style.setProperty("--pane-my", `${IDLE_Y}%`);

    const unsubX = smoothX.on("change", (value) => {
      node.style.setProperty("--pane-mx", `${value}%`);
    });
    const unsubY = smoothY.on("change", (value) => {
      node.style.setProperty("--pane-my", `${value}%`);
    });

    const handleMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mx.set(clamp01((event.clientX - rect.left) / rect.width) * 100);
      my.set(clamp01((event.clientY - rect.top) / rect.height) * 100);
      setActive(true);
    };

    const handleLeave = () => {
      setActive(false);
      mx.set(IDLE_X);
      my.set(IDLE_Y);
    };

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);
    return () => {
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
      unsubX();
      unsubY();
    };
  }, [mx, my, smoothX, smoothY]);

  return { ref, active };
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}
