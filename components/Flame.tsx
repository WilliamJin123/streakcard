interface FlameProps {
  size?: number;
  /** "fire" paints a vertical ember gradient; any other string is a solid fill. */
  tone?: string;
  glow?: boolean;
  /** Unique suffix so multiple gradient defs on one page don't collide. */
  idSuffix?: string;
  className?: string;
  style?: React.CSSProperties;
}

const FLAME_PATH =
  "M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z";

/**
 * Custom flame icon (not the 🔥 emoji — that renders inconsistently across devices
 * and inside html-to-image). Supports an ember gradient fill and an optional glow.
 */
export function Flame({
  size = 24,
  tone = "currentColor",
  glow = false,
  idSuffix = "x",
  className,
  style,
}: FlameProps) {
  const isFire = tone === "fire";
  const gradId = `flame-grad-${idSuffix}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      style={{
        ...(glow
          ? { filter: "drop-shadow(0 0 9px rgba(255,120,40,0.55))" }
          : {}),
        ...style,
      }}
    >
      {isFire && (
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE05A" />
            <stop offset="44%" stopColor="#FF8A1E" />
            <stop offset="100%" stopColor="#F0260F" />
          </linearGradient>
        </defs>
      )}
      <path d={FLAME_PATH} fill={isFire ? `url(#${gradId})` : tone} />
    </svg>
  );
}
