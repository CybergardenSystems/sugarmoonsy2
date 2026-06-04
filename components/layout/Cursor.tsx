"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom Cursor mit Zuständen: default (Goldpunkt), hover/link (Ring),
 * „drop" über Produkten, „text". Deaktiviert auf Touch / reduced-motion.
 * data-cursor="drop|view|text" steuert den Zustand pro Element.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      const state = target?.dataset.cursor;
      ring.dataset.state = state ?? (target ? "hover" : "");
      setLabel(state === "drop" ? "" : state === "view" ? "Ansehen" : "");
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = "";
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-honey"
      />
      <div
        ref={ringRef}
        data-state=""
        className="cursor-ring absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border border-honey/60 transition-[width,height,background-color,border-color,opacity] duration-300 ease-out"
      >
        {label && (
          <span className="font-mono text-[0.5rem] uppercase tracking-widest text-honey">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
