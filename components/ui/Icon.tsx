import type { SVGProps } from "react";

/**
 * Hauseigenes Icon-Set — dünne Linien, 24er-Grid, currentColor.
 * Ersetzt sämtliche Emojis (Konsistenz statt „AI-Look").
 */

export type IconName =
  | "leaf"
  | "craft"
  | "delivery"
  | "star"
  | "coffee"
  | "cocktail"
  | "gift"
  | "check"
  | "droplet"
  | "moon"
  | "arrow"
  | "quote"
  | "plus"
  | "minus"
  | "cart"
  | "spark";

const STROKE: Record<string, React.ReactNode> = {
  leaf: (
    <>
      <path d="M5 20c-1-7 3-14 14-15 1 9-4 15-12 15" />
      <path d="M5 20C8 15 12 12 17 10.5" />
    </>
  ),
  craft: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M7.5 7.5l2.2 2.2M14.3 14.3l2.2 2.2M16.5 7.5l-2.2 2.2M9.7 14.3l-2.2 2.2" />
    </>
  ),
  delivery: (
    <>
      <path d="M3 7h10v8H3zM13 10h4l4 3v2h-8" />
      <circle cx="7" cy="17.5" r="1.6" />
      <circle cx="17.5" cy="17.5" r="1.6" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 8h12v4a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5z" />
      <path d="M17 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M8 3.5c-.5.8-.5 1.5 0 2.3M11 3.5c-.5.8-.5 1.5 0 2.3" />
    </>
  ),
  cocktail: (
    <>
      <path d="M4 5h16l-8 8z" />
      <path d="M12 13v6M8.5 19h7" />
      <path d="M16 5l2-2" />
    </>
  ),
  gift: (
    <>
      <path d="M4 11h16v9H4zM4 11V8h16v3M12 8v12" />
      <path d="M12 8C10 8 7.5 7.5 7.5 5.8 7.5 4.8 8.3 4 9.3 4 11 4 12 6.5 12 8zM12 8c2 0 4.5-.5 4.5-2.2 0-1-.8-1.8-1.8-1.8C13 4 12 6.5 12 8z" />
    </>
  ),
  droplet: <path d="M12 3.5s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11z" />,
  moon: <path d="M20.5 14.5A8 8 0 1 1 10.2 4.1a6.2 6.2 0 0 0 10.3 10.4z" />,
  arrow: <path d="M5 12h13M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  cart: (
    <>
      <path d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.78L21 8H6.2" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </>
  ),
};

const FILL: Record<string, React.ReactNode> = {
  star: <path d="M12 3.2l2.5 5.3 5.7.7-4.2 4 1.1 5.7L12 16.9 6.9 18.9 8 13.2 3.8 9.2l5.7-.7z" />,
  check: <path d="M5 12.5l4 4 10-10" />,
  quote: (
    <path d="M9.5 6C6.4 7 4.5 9.6 4.5 13v5h6v-6H7.4c0-2 1-3.5 3-4.2zM19.5 6c-3.1 1-5 3.6-5 7v5h6v-6h-3.1c0-2 1-3.5 3-4.2z" />
  ),
  spark: <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />,
};

export function Icon({
  name,
  size = 20,
  className,
  strokeWidth = 1.6,
  ...props
}: { name: IconName; size?: number; strokeWidth?: number } & SVGProps<SVGSVGElement>) {
  const isFill = name in FILL;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFill ? "currentColor" : "none"}
      stroke={isFill ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {isFill ? FILL[name] : STROKE[name]}
    </svg>
  );
}

/** Fünf-Sterne-Bewertung als saubere SVG-Reihe. */
export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span className={className} role="img" aria-label={`${count} von 5 Sternen`}>
      <span className="inline-flex gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
          <Icon key={i} name="star" size={13} />
        ))}
      </span>
    </span>
  );
}
