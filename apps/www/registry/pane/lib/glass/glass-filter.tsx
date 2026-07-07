"use client";

import * as React from "react";
import { GLASS_DISPLACEMENT } from "./config";
import { buildDisplacementMapSvg } from "./displacement";
import type { GlassVariant } from "./types";

interface GlassFilterProps {
  id: string;
  variant: GlassVariant;
  width: number;
  height: number;
  radius: number;
}

/**
 * Renders the hidden SVG that holds the actual refraction filter. Referenced
 * from CSS as `backdrop-filter: blur(...) url(#id)`. Chromium applies the
 * full displacement + chromatic-aberration chain; browsers that don't
 * support an SVG filter reference inside backdrop-filter simply ignore it
 * and fall back to the blur/saturate/specular layers, which is why this
 * only ever adds a bonus layer, never load-bearing.
 */
export function GlassFilter({
  id,
  variant,
  width,
  height,
  radius,
}: GlassFilterProps) {
  const cfg = GLASS_DISPLACEMENT[variant];

  const mapUri = React.useMemo(() => {
    if (width <= 0 || height <= 0) return null;
    return buildDisplacementMapSvg({ width, height, radius, band: cfg.band });
  }, [width, height, radius, cfg.band]);

  if (!mapUri) return null;

  const base = cfg.strength;
  const aberration = cfg.chromaticAberration * 10;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="absolute h-0 w-0 overflow-hidden"
    >
      <defs>
        <filter
          id={id}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={mapUri}
            x="0"
            y="0"
            width={width}
            height={height}
            result="map"
          />
          <feGaussianBlur
            in="map"
            stdDeviation={cfg.blur}
            result="mapBlurred"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="mapBlurred"
            scale={base - aberration}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispR"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="mapBlurred"
            scale={base}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispG"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="mapBlurred"
            scale={base + aberration}
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispB"
          />

          <feColorMatrix
            in="dispR"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="onlyR"
          />
          <feColorMatrix
            in="dispG"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="onlyG"
          />
          <feColorMatrix
            in="dispB"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="onlyB"
          />

          <feBlend in="onlyR" in2="onlyG" mode="screen" result="rg" />
          <feBlend in="rg" in2="onlyB" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}
