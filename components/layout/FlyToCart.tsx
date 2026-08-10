"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * Hört auf 'sms-fly' und lässt einen goldenen Tropfen von der Klickstelle in
 * das Warenkorb-Icon (data-cart-icon) fliegen — Abschluss des Tropfen-Motivs
 * im Moment der Conversion. Reduced-motion → kein Flug (Toast/Count genügen).
 */
export function FlyToCart() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onFly = (e: Event) => {
      const { x, y } = (e as CustomEvent<{ x: number; y: number }>).detail;
      const cart = document.querySelector<HTMLElement>("[data-cart-icon]");
      if (!cart) return;
      const r = cart.getBoundingClientRect();
      const tx = r.left + r.width / 2;
      const ty = r.top + r.height / 2;

      const el = document.createElement("div");
      el.setAttribute("aria-hidden", "true");
      el.style.cssText =
        "position:fixed;left:0;top:0;z-index:125;pointer-events:none;will-change:transform,opacity";
      el.innerHTML =
        '<svg width="14" height="21" viewBox="0 0 20 30" fill="none"><path d="M10 0C10 0 1 14 1 21a9 9 0 0 0 18 0C19 14 10 0 10 0Z" fill="#E8B25E"/></svg>';
      document.body.appendChild(el);

      const peak = Math.min(x, tx) - 40;
      gsap.set(el, { x, y, xPercent: -50, yPercent: -50 });
      gsap
        .timeline({
          onComplete: () => {
            el.remove();
            gsap.fromTo(
              cart,
              { scale: 1 },
              {
                scale: 1.28,
                duration: 0.18,
                yoyo: true,
                repeat: 1,
                ease: "power2.out",
                transformOrigin: "center",
              },
            );
          },
        })
        .to(el, { x: tx, duration: 0.72, ease: "power1.inOut" }, 0)
        .to(el, { y: peak, duration: 0.34, ease: "power2.out" }, 0)
        .to(el, { y: ty, duration: 0.4, ease: "power2.in" }, 0.32)
        .to(el, { scale: 0.4, opacity: 0.5, duration: 0.72, ease: "power1.in" }, 0);
    };

    window.addEventListener("sms-fly", onFly);
    return () => window.removeEventListener("sms-fly", onFly);
  }, []);

  return null;
}
