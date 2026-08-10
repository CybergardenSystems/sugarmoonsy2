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
    let running = false;
    const tick = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Außerhalb des Viewports die Schleife wirklich anhalten (kein Leerlauf-rAF).
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0,
    });
    io.observe(canvas);

    seed();
    if (reduce) draw(0);
    else start();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        seed();
        if (reduce) draw(0);
      }, 160);
    };
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Mond — schmale Gold-Sichel, konsistent zur Bildmarke/Etikett
          (Council R1: die alte Vollscheibe widersprach dem Crescent-Logo) */}
      <svg
        className="absolute right-[6%] top-[12%] w-[40vw] min-w-[240px] max-w-[520px]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ms-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F4D9A0" />
            <stop offset="0.55" stopColor="#E8B25E" />
            <stop offset="1" stopColor="#C6892F" />
          </linearGradient>
          <radialGradient id="ms-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0.55" stopColor="#E8B25E" stopOpacity="0.16" />
            <stop offset="1" stopColor="#E8B25E" stopOpacity="0" />
          </radialGradient>
          <mask id="ms-crescent">
            <circle cx="100" cy="100" r="64" fill="#fff" />
            <circle cx="82" cy="86" r="60" fill="#000" />
          </mask>
        </defs>
        {/* weiter Schein */}
        <circle cx="100" cy="100" r="100" fill="url(#ms-glow)" />
        {/* Erdschein-Ring der dunklen Mondseite */}
        <circle
          cx="100"
          cy="100"
          r="64"
          fill="none"
          stroke="#E8B25E"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        {/* die Sichel selbst */}
        <circle cx="100" cy="100" r="64" fill="url(#ms-gold)" mask="url(#ms-crescent)" />
      </svg>
      {/* obere Tiefe */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/60 to-transparent" />
    </div>
  );
}
