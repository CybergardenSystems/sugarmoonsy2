"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroBackground } from "./HeroBackground";
import { heroPicks } from "@/lib/products";

const trust = [
  { icon: "🌱", label: "100% Bio" },
  { icon: "✋", label: "Handgemacht" },
  { icon: "📦", label: "Direkt zu dir" },
  { icon: "★", label: "5-Sterne bewertet" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const drop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger, SplitText);
    const ctx = gsap.context(() => {
      // Headline split reveal (masked lines slide up)
      let split: SplitText | null = null;
      if (headline.current) {
        split = new SplitText(headline.current, { type: "lines", mask: "lines" });
        gsap.from(split.lines, {
          yPercent: 115,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.15,
        });
      }

      // Staggered fade for hero meta
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.45,
      });

      // The golden drop falls as you scroll through the hero
      if (drop.current) {
        gsap.to(drop.current, {
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
      }

      return () => split?.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      <HeroBackground />

      {/* Signature: the golden drop hanging from the moon's tip */}
      <div
        ref={drop}
        aria-hidden
        className="pointer-events-none absolute right-[20%] top-[42%] z-10 hidden md:block"
      >
        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
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

      <div className="shell relative z-20 grid items-center gap-10 pb-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span
            data-hero-fade
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-honey/25 bg-honey/5 px-4 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-honey"
          >
            🌿 Bio-zertifiziert · Handgemacht in Fulda
          </span>

          <h1
            ref={headline}
            className="font-display text-[clamp(2.7rem,7vw,5.4rem)] leading-[1.02] text-moon"
          >
            Sirup mit <em className="italic text-honey glow-honey">Seele</em> —
            gebraut vom Mond.
          </h1>

          <p
            data-hero-fade
            className="lede mt-6 max-w-md"
          >
            Handgemachte Bio-Sirupe für Kaffee, Cocktails & Desserts. Aus erlesenen
            Zutaten, ohne künstliche Zusätze — direkt aus unserer Manufaktur in Fulda
            zu dir.
          </p>

          <div data-hero-fade className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="/shop" variant="fill">
              Zum Shop
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton href="/story" variant="line">
              Unsere Geschichte
            </MagneticButton>
          </div>

          <ul
            data-hero-fade
            className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-[0.8rem] text-moon-mute"
          >
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-1.5">
                <span className="text-honey">{t.icon}</span>
                {t.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column kept airy — the moon owns this space */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* Popular picks */}
      <div data-hero-fade className="shell relative z-20 pb-14">
        <p className="mb-4 text-center font-mono text-[0.62rem] uppercase tracking-[0.22em] text-moon-mute">
          ✦ Beliebte Sorten
        </p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {heroPicks.map((p) => (
            <Link
              key={p.id}
              href={`/shop/${p.slug}`}
              data-cursor="view"
              className="group flex items-center gap-2 rounded-full border border-honey/12 bg-night-2/60 px-4 py-2 backdrop-blur transition-colors hover:border-honey/40"
            >
              <span className="font-display text-sm text-moon transition-colors group-hover:text-honey">
                {p.name.replace("Bio-", "")}
              </span>
              <span className="font-mono text-[0.62rem] text-honey/80">
                ab {p.sizes[p.sizes.length - 1].price.toFixed(2).replace(".", ",")} €
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center" aria-hidden>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-moon-mute">
          Scrollen
        </span>
      </div>
    </section>
  );
}
