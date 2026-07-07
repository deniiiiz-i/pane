export type GlassVariant = "regular" | "clear";

export type GlassQuality = "full" | "reduced" | "none";

export interface GlassDisplacementConfig {
  /** feDisplacementMap scale, in px */
  strength: number;
  /** 0-1, how deep into the shape the lens-bevel band extends */
  band: number;
  /** extra +/- scale applied per channel to fake chromatic aberration at the edge */
  chromaticAberration: number;
  /** feGaussianBlur stdDeviation applied to the bump map before displacing, in px */
  blur: number;
}

export interface GlassSpecularConfig {
  /** peak highlight opacity, 0-1 */
  intensity: number;
  /** highlight radius in px */
  size: number;
  /** static sweep angle (deg) used when there is no pointer signal */
  angle: number;
}

export interface GlassSpringConfig {
  stiffness: number;
  damping: number;
  mass?: number;
}
