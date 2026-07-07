export interface DisplacementMapOptions {
  width: number;
  height: number;
  radius: number;
  /** 0-1, how deep into the shape the lens-bevel band extends */
  band: number;
}

function ring(
  inset: number,
  radius: number,
  w: number,
  h: number,
  stroke: string,
  strokeWidth: number,
) {
  const r = Math.max(0, radius - inset);
  const width = Math.max(0, w - inset * 2);
  const height = Math.max(0, h - inset * 2);
  return `<rect x="${inset}" y="${inset}" width="${width}" height="${height}" rx="${r}" fill="none" stroke="${stroke}" stroke-width="${strokeWidth}" />`;
}

function toBase64(svg: string) {
  if (typeof window === "undefined") {
    return Buffer.from(svg).toString("base64");
  }
  return window.btoa(svg);
}

/**
 * Builds a grayscale bump map that encodes a lens-like bevel around the
 * border of a rounded rect: neutral (no displacement) deep in the interior,
 * a dip, then a bright ridge right at the edge, back to neutral outside the
 * shape. Fed into feDisplacementMap (after a feGaussianBlur softens the
 * rings into a continuous ramp) this reads as light bending through a
 * convex glass edge.
 */
export function buildDisplacementMapSvg({
  width,
  height,
  radius,
  band,
}: DisplacementMapOptions): string {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const r = Math.max(0, Math.min(radius, Math.min(w, h) / 2));
  const depth = Math.max(
    4,
    Math.min(w, h) * 0.5 * Math.min(Math.max(band, 0.05), 0.95),
  );

  const outerInset = depth * 0.16;
  const innerInset = depth * 0.6;
  const outerWidth = Math.max(1, depth * 0.55);
  const innerWidth = Math.max(1, depth * 0.65);

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<rect width="${w}" height="${h}" fill="#808080" />` +
    ring(innerInset, r, w, h, "#000000", innerWidth) +
    ring(outerInset, r, w, h, "#ffffff", outerWidth) +
    `</svg>`;

  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}
