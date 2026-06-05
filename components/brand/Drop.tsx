import { cn } from "@/lib/cn";

/** Der goldene Sirup-Tropfen — Signatur-Element („der Tropfen führt"). */
export function Drop({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 1.5}
      viewBox="0 0 20 30"
      fill="none"
      className={cn("drop-shadow-[0_0_6px_rgba(232,178,94,0.5)]", className)}
      aria-hidden="true"
    >
      <path
        d="M10 0C10 0 1 14 1 21a9 9 0 0 0 18 0C19 14 10 0 10 0Z"
        fill="url(#sms-drop-grad)"
      />
      <defs>
        <linearGradient id="sms-drop-grad" x1="10" y1="0" x2="10" y2="30">
          <stop stopColor="#F7E2B0" />
          <stop offset="1" stopColor="#C6892F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
