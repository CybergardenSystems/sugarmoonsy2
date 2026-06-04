"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/cn";

type Variant = "fill" | "line" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-[0.9rem] font-medium tracking-tight transition-colors duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  fill: "bg-honey text-ink hover:bg-honey-glow",
  line: "border border-honey/40 text-moon hover:border-honey hover:text-honey",
  ghost: "text-moon-dim hover:text-honey",
};

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
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
  className,
  strength = 0.35,
  type = "button",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.5, ease: "power3.out" });
    gsap.to(inner.current, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
  };

  const onLeave = () => {
    gsap.to([ref.current, inner.current], {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });
  };

  const content = (
    <span ref={inner} className="inline-flex items-center gap-2">
      {children}
    </span>
  );

  const shared = {
    className: cn(base, variants[variant], className),
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    "data-cursor": "drop",
    ...rest,
  };

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        {...shared}
      >
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
