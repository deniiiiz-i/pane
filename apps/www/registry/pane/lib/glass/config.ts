import type {
  GlassDisplacementConfig,
  GlassSpecularConfig,
  GlassSpringConfig,
  GlassVariant,
} from "./types";

/**
 * Single tuning surface for the whole glass engine. Every Pane-based component
 * reads from here, so the entire library's material quality can be adjusted
 * from this one file. Static color/blur tokens live in `app/globals.css`
 * (`--pane-*` custom properties) since they don't need JS; only values that
 * feed the SVG filter or the spring physics live here.
 */

export const GLASS_DISPLACEMENT: Record<GlassVariant, GlassDisplacementConfig> =
  {
    regular: {
      strength: 46,
      band: 0.55,
      chromaticAberration: 1.2,
      blur: 6,
    },
    clear: {
      strength: 64,
      band: 0.7,
      chromaticAberration: 2,
      blur: 5,
    },
  };

export const GLASS_SPECULAR: GlassSpecularConfig = {
  intensity: 0.55,
  size: 260,
  angle: 115,
};

export const GLASS_SPRING: Record<
  "press" | "hover" | "drag",
  GlassSpringConfig
> = {
  press: { stiffness: 500, damping: 30, mass: 0.6 },
  hover: { stiffness: 300, damping: 24, mass: 0.8 },
  drag: { stiffness: 260, damping: 26, mass: 1 },
};

/** Minimum element area (px^2) below which the displacement filter is skipped. */
export const GLASS_MIN_FILTER_AREA = 64;
