import Link from "next/link";
import { cn } from "@/lib/cn";
import { MoonMark } from "./MoonMark";

/** Marken-Lockup: Emblem + Wortmarke „Sugar Moon Sweets". */
export function Logo({
  className,
  href = "/",
  compact = false,
}: {
  className?: string;
  href?: string;
  compact?: boolean;
}) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2.5", className)}>
      <MoonMark
        size={compact ? 30 : 36}
        dust={!compact}
        className="transition-transform duration-500 group-hover:-rotate-6"
      />
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] tracking-tight text-moon">
          Sugar<span className="text-honey">Moon</span>
          <span className="sr-only"> Sweets — Startseite</span>
        </span>
        {!compact && (
          <span
            aria-hidden="true"
            className="mt-0.5 block font-mono text-[0.5rem] uppercase tracking-[0.42em] text-moon-mute"
          >
            Sweets · Fulda
          </span>
        )}
      </span>
    </Link>
  );
}
