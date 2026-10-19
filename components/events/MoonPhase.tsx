import { cn } from "@/lib/cn";

/**
 * Der Mond in einer bestimmten Phase — als Knoten auf der Termin-Zeitleiste.
 *
 * `phase` ist der Anteil am Mondzyklus (0 = Neumond, 0,5 = Vollmond), siehe
 * `lib/moon.ts`. Gezeichnet wird wie am Himmel über Mitteleuropa: zunehmend
 * rechts beleuchtet, abnehmend links. Die dunkle Scheibe ist gefüllt, damit
 * die Zeitleiste dahinter verschwindet.
 */
export function MoonPhase({
  phase,
  size = 22,
  glow = false,
  className,
}: {
  phase: number;
  size?: number;
  /** Nächster Termin: der Mond bekommt einen goldenen Schein. */
  glow?: boolean;
  className?: string;
}) {
  const r = 10;
  const cx = 12;
  const cy = 12;
  const p = ((phase % 1) + 1) % 1;

  // Breite der Schattengrenze: 0 bei Halbmond, r bei Neu-/Vollmond.
  const rx = Math.abs(Math.cos(2 * Math.PI * p)) * r;
  const waxing = p < 0.5;
  const crescent = p < 0.25 || p > 0.75;

  // Beleuchteter Rand (oben → unten) auf der hellen Seite, dann die
  // Schattengrenze als Halbellipse zurück nach oben. Bei Sichel wölbt sie
  // sich zur hellen Seite, bei Dreiviertelmond zur dunklen.
  const limbSweep = waxing ? 1 : 0;
  const terminatorSweep = waxing ? (crescent ? 0 : 1) : crescent ? 1 : 0;
  const lit = `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${limbSweep} ${cx} ${cy + r} A ${rx.toFixed(3)} ${r} 0 0 ${terminatorSweep} ${cx} ${cy - r} Z`;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn(
        "shrink-0 text-honey",
        glow && "drop-shadow-[0_0_10px_rgba(232,178,94,0.55)]",
        className,
      )}
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="var(--color-night-3)"
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeWidth={0.8}
      />
      <path d={lit} fill="currentColor" />
    </svg>
  );
}
