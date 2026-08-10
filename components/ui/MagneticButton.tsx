"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "fill" | "line" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-[background-color,border-color,color,box-shadow] duration-300 will-change-transform active:translate-y-px";

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[0.85rem]",
  md: "px-7 py-3.5 text-[0.9rem]",
  lg: "px-8 py-4 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  fill: "bg-honey text-ink shadow-[0_10px_30px_-8px_rgba(232,178,94,0.45)] hover:bg-honey-glow hover:shadow-[0_14px_36px_-8px_rgba(232,178,94,0.55)]",
  line: "border border-honey/35 text-moon hover:border-honey/70 hover:text-honey hover:shadow-[0_0_24px_-6px_rgba(232,178,94,0.4)]",
  ghost: "text-moon-dim hover:text-honey",
};

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  strength?: number;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "fill",
  size = "md",
  className,
  strength = 0.35,
  type = "button",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  // Magnet-Effekt als rAF-Lerp statt GSAP — hält gsap aus dem Layout-Bundle
  // (Council R1, Tech#5).
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const tick = () => {
    const el = ref.current;
    if (!el) return;
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * 0.18;
    c.y += (t.y - c.y) * 0.18;
    el.style.transform = `translate(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px)`;
    if (inner.current) {
      inner.current.style.transform = `translate(${(c.x * 0.3).toFixed(2)}px, ${(c.y * 0.3).toFixed(2)}px)`;
    }
    if (Math.abs(t.x - c.x) > 0.2 || Math.abs(t.y - c.y) > 0.2) {
      raf.current = requestAnimationFrame(tick);
    }
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    target.current = {
      x: (e.clientX - r.left - r.width / 2) * strength,
      y: (e.clientY - r.top - r.height / 2) * strength,
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };

  const onLeave = () => {
    target.current = { x: 0, y: 0 };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  };

  const content = (
    <span ref={inner} className="inline-flex items-center gap-2">
      {children}
    </span>
  );

  const shared = {
    className: cn(base, sizes[size], variants[variant], className),
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    "data-cursor": "drop",
    ...rest,
  };

  if (href) {
    return (
      <Link href={href} ref={ref as React.Ref<HTMLAnchorElement>} {...shared}>
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      {...shared}
    >
      {content}
    </button>
  );
}
