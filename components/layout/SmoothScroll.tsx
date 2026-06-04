"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

/**
 * Lenis Smooth-Scroll, an den GSAP-Ticker gekoppelt und mit ScrollTrigger
 * synchronisiert. Respektiert prefers-reduced-motion (dann nativ).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    // Bridge for in-page anchor jumps.
    const anchorHandler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest('a[href*="#"]');
      if (!a) return;
      const url = new URL((a as HTMLAnchorElement).href);
      if (url.pathname !== window.location.pathname) return;
      const el = document.querySelector(url.hash);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -90 });
      }
    };
    document.addEventListener("click", anchorHandler);

    return () => {
      document.removeEventListener("click", anchorHandler);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  // Refresh triggers after route changes.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
