"use client";

import { useEffect, useRef, useState } from "react";
import { Drop } from "@/components/brand/Drop";

/**
 * Die „Goldene Spine": ein fixierter Tropfen wandert auf einer feinen Schiene
 * am rechten Rand mit dem Scroll-Fortschritt nach unten, während ein kleiner
 * Mond darüber von Neumond zu Vollmond wächst. Macht das Marken-Motiv
 * („der Tropfen führt", Sugar *Moon*) über die ganze Seite kontinuierlich.
 *
 * Performance: nur Transforms, rAF-gedrosselt. Reduced-motion → statisch.
 * Erst ab Tablet sichtbar, damit Mobile ruhig bleibt.
 */
export function GoldenSpine() {
  const railRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const moonMaskRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setEnabled(true);

    let raf = 0;
    let ticking = false;

    const apply = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      const rail = railRef.current;
      const drop = dropRef.current;
      if (rail && drop) {
        const travel = rail.clientHeight - drop.clientHeight;
        drop.style.transform = `translateY(${p * travel}px)`;
      }
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${p})`;
      }
      // Mond wächst: dunkle Maske wandert nach rechts heraus (Neumond → Vollmond)
      if (moonMaskRef.current) {
        moonMaskRef.current.style.transform = `translateX(${p * 112}%)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(apply);
      }
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-3 top-0 z-50 hidden h-screen flex-col items-center justify-center md:flex lg:right-6"
    >
      {/* kleiner Mond oben */}
      <div className="relative mb-4 h-4 w-4 overflow-hidden rounded-full ring-1 ring-honey/40">
        <div className="absolute inset-0 rounded-full bg-honey/90" />
        <div
          ref={moonMaskRef}
          className="absolute inset-0 rounded-full bg-night"
          style={{ transform: "translateX(0%)" }}
        />
      </div>

      {/* Schiene */}
      <div ref={railRef} className="relative h-[46vh] w-px overflow-visible bg-honey/12">
        {/* gefüllter Fortschritt */}
        <div
          ref={progressRef}
          className="absolute inset-0 origin-top bg-gradient-to-b from-honey/70 to-honey/10"
          style={{ transform: "scaleY(0)" }}
        />
        {/* der Tropfen */}
        <div
          ref={dropRef}
          className="absolute -left-[8px] top-0 will-change-transform"
          style={{ transform: "translateY(0px)" }}
        >
          <Drop size={16} />
        </div>
      </div>
    </div>
  );
}
