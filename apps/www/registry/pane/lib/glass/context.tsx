"use client";

import * as React from "react";
import { GLASS_DISPLACEMENT, GLASS_SPECULAR, GLASS_SPRING } from "./config";
import type {
  GlassDisplacementConfig,
  GlassSpecularConfig,
  GlassSpringConfig,
  GlassVariant,
} from "./types";

export interface GlassConfig {
  spring: Record<"press" | "hover" | "drag", GlassSpringConfig>;
  displacement: Record<GlassVariant, GlassDisplacementConfig>;
  specular: GlassSpecularConfig;
}

const defaultConfig: GlassConfig = {
  spring: GLASS_SPRING,
  displacement: GLASS_DISPLACEMENT,
  specular: GLASS_SPECULAR,
};

const GlassConfigContext = React.createContext<GlassConfig>(defaultConfig);

type GlassConfigOverride = {
  spring?: Partial<GlassConfig["spring"]>;
  displacement?: Partial<GlassConfig["displacement"]>;
  specular?: Partial<GlassSpecularConfig>;
};

/**
 * Overrides the JS-side tunables — springs, refraction, specular — for every
 * Pane component inside it. Optional: without a provider, components read the
 * values in `config.ts`. Overrides merge onto the nearest parent, so a subtree
 * can change just the springs and keep everything else.
 */
export function GlassConfigProvider({
  value,
  children,
}: {
  value: GlassConfigOverride;
  children: React.ReactNode;
}) {
  const parent = React.useContext(GlassConfigContext);
  const merged = React.useMemo<GlassConfig>(
    () => ({
      spring: { ...parent.spring, ...value.spring },
      displacement: { ...parent.displacement, ...value.displacement },
      specular: { ...parent.specular, ...value.specular },
    }),
    [parent, value],
  );

  return (
    <GlassConfigContext.Provider value={merged}>
      {children}
    </GlassConfigContext.Provider>
  );
}

export function useGlassConfig() {
  return React.useContext(GlassConfigContext);
}
