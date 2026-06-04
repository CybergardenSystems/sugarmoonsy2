import { cn } from "@/lib/cn";

/**
 * Das Sugar-Moon-Emblem: ein dünner Gold-Sichelmond mit Goldstaub —
 * neu gezeichnet nach dem echten Etikett. Rein dekorativ (aria-hidden).
 */

// Deterministischer Goldstaub rund um die Sichel (keine Hydration-Mismatches).
const DUST: [number, number, number, number][] = [
  // x, y, r, opacity
  [50, 12, 0.9, 0.9],
  [38, 16, 0.6, 0.6],
  [62, 18, 0.7, 0.7],
  [28, 26, 1.0, 0.8],
  [72, 30, 0.6, 0.5],
  [22, 40, 0.7, 0.7],
  [78, 46, 0.8, 0.6],
  [24, 58, 0.6, 0.5],
  [30, 72, 0.9, 0.7],
  [40, 82, 0.7, 0.6],
  [55, 86, 0.6, 0.5],
  [68, 78, 0.8, 0.6],
  [46, 30, 0.5, 0.4],
  [34, 48, 0.5, 0.4],
];

export function MoonMark({
  className,
  size = 64,
  dust = true,
}: {
  className?: string;
  size?: number;
  dust?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="smm-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4D9A0" />
          <stop offset="0.5" stopColor="#E8B25E" />
          <stop offset="1" stopColor="#C6892F" />
        </linearGradient>
        <radialGradient id="smm-glow" cx="0.42" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#E8B25E" stopOpacity="0.22" />
          <stop offset="1" stopColor="#E8B25E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* sanfter Schein */}
      <circle cx="46" cy="50" r="42" fill="url(#smm-glow)" />

      {/* feiner äußerer Ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="url(#smm-gold)"
        strokeWidth="0.6"
        opacity="0.45"
      />

      {/* leuchtende Sichel: fast geschlossener Bogen, oben rechts offen */}
      <path
        d="M70 22 A38 38 0 1 0 78 70"
        fill="none"
        stroke="url(#smm-gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Goldstaub */}
      {dust &&
        DUST.map(([x, y, r, o], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#E8B25E" opacity={o} />
        ))}
    </svg>
  );
}
