interface GrainProps {
  opacity?: number;
  blendMode?: React.CSSProperties["mixBlendMode"];
  baseFrequency?: number;
  /** Unique-ish id so multiple grains don't share a filter definition. */
  idSuffix?: string;
}

/**
 * Procedural film-grain overlay (SVG fractal noise). Adds the subtle texture that
 * separates a "designed" card from a flat CSS fill. Because it's vector, it
 * rasterizes crisply at the higher pixelRatio used during PNG export.
 */
export function Grain({
  opacity = 0.12,
  blendMode = "overlay",
  baseFrequency = 0.82,
  idSuffix = "card",
}: GrainProps) {
  const id = `grain-${idSuffix}`;
  return (
    <svg
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        mixBlendMode: blendMode,
        pointerEvents: "none",
      }}
    >
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency={baseFrequency}
          numOctaves={2}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
