"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/**
 * Lenis Smooth-Scroll, an den GSAP-Ticker gekoppelt und mit ScrollTrigger
 * synchronisiert. Respektiert prefers-reduced-motion (dann nativ).
 *
 * Lenis + GSAP werden dynamisch im Effect geladen — sie hängen damit nicht
 * im First-Load-Bundle jeder Route (Council R1, Tech #5).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let lenis: Lenis | null = null;
    let cleanup: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      const [{ default: LenisImpl }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      lenis = new LenisImpl({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      // Bridge für In-Page-Anker. Der Skip-Link (#main) bleibt nativ, damit
      // der Fokus-Transfer funktioniert (Council R1, B2); alle anderen Ziele
      // bekommen nach dem Scroll explizit den Fokus.
      const anchorHandler = (e: MouseEvent) => {
        const a = (e.target as HTMLElement)?.closest<HTMLAnchorElement>('a[href*="#"]');
        if (!a) return;
        let url: URL;
        try {
          url = new URL(a.href);
        } catch {
          return;
        }
        if (url.protocol !== "http:" && url.protocol !== "https:") return;
        if (url.pathname !== window.location.pathname) return;
        if (!url.hash || url.hash === "#" || url.hash === "#main") return;
        let el: Element | null = null;
        try {
          el = document.querySelector(url.hash);
        } catch {
          return;
        }
        if (el) {
          e.preventDefault();
          lenis?.scrollTo(el as HTMLElement, { offset: -90 });
          (el as HTMLElement).focus?.({ preventScroll: true });
        }
      };
      document.addEventListener("click", anchorHandler);

      cleanup = () => {
        document.removeEventListener("click", anchorHandler);
        gsap.ticker.remove(onTick);
        lenis?.destroy();
        lenis = null;
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // ScrollTrigger nach Routenwechseln aktualisieren (nur falls schon geladen).
  useEffect(() => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return <>{children}</>;
}
