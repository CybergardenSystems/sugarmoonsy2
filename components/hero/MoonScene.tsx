"use client";

import { useEffect, useRef } from "react";

/**
 * Nächtlicher Hintergrund: glühender Mond (DOM/CSS) + driftendes Goldstaub-
 * Sternenfeld (Canvas2D). Performance-budgetiert: DPR-Cap, rAF-pausiert
 * außerhalb des Viewports, statisch bei reduced-motion.
 */
export function MoonScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    type Star = { x: number; y: number; r: number; a: number; tw: number; vx: number };
    let stars: Star[] = [];

    const seed = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.round((w * h) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.6 + 0.15,
        tw: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const twinkle = reduce ? s.a : s.a + Math.sin(t * 0.001 + s.tw) * 0.25;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,178,94,${Math.max(0, twinkle)})`;
        ctx.fill();
        if (!reduce) {
          s.x += s.vx;
          if (s.x < 0) s.x = w;
          if (s.x > w) s.x = 0;
        }
      }
    };

    let raf = 0;
    let running = true;
    const tick = (t: number) => {
      if (running) draw(t);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([e]) => (running = e.isIntersecting),
      { threshold: 0 },
    );
    io.observe(canvas);

    seed();
    if (reduce) {
      draw(0);
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onResize = () => seed();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mond — glühende Scheibe, oben rechts */}
      <div
        className="absolute right-[6%] top-[14%] aspect-square w-[44vw] max-w-[560px] min-w-[260px] rounded-full"
        style={{
          background:
            "radial-gradient(42% 42% at 37% 33%, #fbf3df 0%, #f0d49a 26%, #d9a85a 44%, #c6892f 62%, #5d3f1b 100%)",
          boxShadow:
            "0 0 120px 30px rgba(232,178,94,0.18), inset -22px -14px 60px rgba(8,15,11,0.55)",
        }}
      />
      {/* Mond-Schein-Halo */}
      <div className="absolute right-[2%] top-[8%] aspect-square w-[58vw] max-w-[760px] rounded-full bg-honey/10 blur-[90px]" />
      {/* obere Tiefe */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/60 to-transparent" />
    </div>
  );
}
