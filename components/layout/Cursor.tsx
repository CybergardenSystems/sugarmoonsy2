"use client";

import { useEffect, useRef } from "react";
import { useHydrated, useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Custom Cursor mit Zuständen: default (Goldpunkt), hover/link (Ring),
 * „drop" über Produkten, „text". Deaktiviert auf Touch / reduced-motion.
 * data-cursor="drop|view|text" steuert den Zustand pro Element.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hydrated = useHydrated();
  const fine = useMediaQuery("(pointer: fine)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = hydrated && fine && !reduce;

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let seen = false;

    const setLabel = (text: string) => {
      if (labelRef.current) labelRef.current.textContent = text;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Erst ab der ersten echten Mausbewegung anzeigen — vorher parkte der
      // Ring sichtbar in der Viewport-Mitte (Council R1, Design#5).
      if (!seen) {
        seen = true;
        rx = mx;
        ry = my;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        document.documentElement.classList.add("sms-cursor");
      }
      dot.style.transform = `translate(${mx}px, ${my}px)`;

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      const state = target?.dataset.cursor;
      ring.dataset.state = state ?? (target ? "hover" : "");
      setLabel(state === "view" ? "Ansehen" : "");
    };

    const onLeaveWindow = () => {
      ring.dataset.state = "";
      setLabel("");
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      seen = false;
      document.documentElement.classList.remove("sms-cursor");
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    window.addEventListener("blur", onLeaveWindow);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      window.removeEventListener("blur", onLeaveWindow);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("sms-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={dotRef}
        style={{ opacity: 0 }}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-honey"
      />
      <div
        ref={ringRef}
        data-state=""
        style={{ opacity: 0 }}
        className="cursor-ring absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full border border-honey/60 transition-[width,height,background-color,border-color] duration-300 ease-out"
      >
        <span
          ref={labelRef}
          className="font-mono text-[0.5rem] uppercase tracking-widest text-honey"
        />
      </div>
    </div>
  );
}
