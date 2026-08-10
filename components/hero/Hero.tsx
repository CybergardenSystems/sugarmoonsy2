"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon, type IconName } from "@/components/ui/Icon";
import { HeroBackground } from "./HeroBackground";
import { heroPicks } from "@/lib/products";

const trust: { icon: IconName; label: string }[] = [
  { icon: "leaf", label: "100% Bio" },
  { icon: "craft", label: "Handgemacht" },
  { icon: "delivery", label: "Direkt zu dir" },
  { icon: "star", label: "5-Sterne Bewertungen" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const drop = useRef<HTMLDivElement>(null);

  // Intro-Animationen laufen als reines CSS ab dem ersten Paint (siehe
  // globals.css .hero-line/.hero-fade) — kein Hydration-Warten, kein
  // Flash, kein LCP-Render-Delay (Council R1). Hier nur der Drop-Scrub.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    let cleanup: (() => void) | null = null;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !drop.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.to(drop.current, {
        yPercent: 1400,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 pt-28 sm:pt-32"
    >
      <HeroBackground />

      {/* Signature: der goldene Tropfen an der Mondspitze */}
      <div
        ref={drop}
        aria-hidden
        className="pointer-events-none absolute right-[20%] top-[42%] z-10 hidden md:block"
      >
        <svg width="18" height="28" viewBox="0 0 20 30" fill="none">
          <path
            d="M10 0C10 0 1 14 1 21a9 9 0 0 0 18 0C19 14 10 0 10 0Z"
            fill="url(#drop-g)"
          />
          <defs>
            <linearGradient id="drop-g" x1="10" y1="0" x2="10" y2="30">
              <stop stopColor="#F4D9A0" />
              <stop offset="1" stopColor="#C6892F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="shell relative z-20 grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <span className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full border border-honey/20 bg-honey/[0.06] px-3.5 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-honey/90 sm:text-[0.7rem]">
            <Icon name="leaf" size={13} />
            Bio-zertifiziert · Handgemacht in Fulda
          </span>

          <h1 className="font-display text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.06] text-moon">
            <span className="hero-line">
              <span>
                Sirup mit <span className="italic text-honey glow-honey">Seele</span> —
              </span>
            </span>
            <span className="hero-line">
              <span style={{ animationDelay: "0.12s" }}>gebraut vom Mond.</span>
            </span>
          </h1>

          <p className="hero-fade lede mt-6 max-w-md" style={{ animationDelay: "0.35s" }}>
            Handgemachte Bio-Sirupe für Kaffee, Cocktails &amp; Desserts. Aus erlesenen
            Zutaten, ohne künstliche Zusätze — direkt aus unserer Manufaktur in Fulda zu
            dir.
          </p>

          <div
            className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            style={{ animationDelay: "0.45s" }}
          >
            <MagneticButton href="/shop" variant="fill">
              Zum Shop
              <Icon name="arrow" size={16} />
            </MagneticButton>
            <MagneticButton href="/story" variant="line">
              Unsere Geschichte
            </MagneticButton>
          </div>

          <ul
            style={{ animationDelay: "0.55s" }}
            className="hero-fade mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-3.5 text-[0.82rem] text-moon-dim sm:flex sm:max-w-none sm:flex-wrap sm:gap-x-7"
          >
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2">
                <Icon name={t.icon} size={16} className="shrink-0 text-honey/75" />
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        {/* rechte Spalte luftig — der Mond besitzt diesen Raum */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* Beliebte Sorten — auf Mobil horizontal scrollbar statt gequetscht */}
      <div
        className="hero-fade shell relative z-20 mt-14"
        style={{ animationDelay: "0.6s" }}
      >
        <p className="mb-4 flex items-center justify-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-moon-mute">
          <Icon name="spark" size={11} className="text-honey" />
          Beliebte Sorten
        </p>
        <div className="-mx-[var(--spacing-edge)] flex gap-2 overflow-x-auto px-[var(--spacing-edge)] pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 sm:overflow-visible">
          {heroPicks.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              data-cursor="view"
              className="group flex shrink-0 items-center gap-2 rounded-full border border-white/8 bg-night-2/60 px-4 py-2 backdrop-blur transition-colors hover:border-honey/40"
            >
              <span className="font-display text-sm text-moon transition-colors group-hover:text-honey">
                {p.name.replace("Bio-", "")}
              </span>
              <span className="font-mono text-[0.7rem] text-honey/80">
                {p.sizes[0].label} · {p.sizes[0].price.toFixed(2).replace(".", ",")} €
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-5 z-20 hidden justify-center sm:flex"
        aria-hidden
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-moon-mute">
          Scrollen
        </span>
      </div>
    </section>
  );
}
