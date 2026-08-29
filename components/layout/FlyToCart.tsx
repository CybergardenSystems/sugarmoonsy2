"use client";

import { useEffect } from "react";

/**
 * Hört auf 'sms-fly' und lässt einen goldenen Tropfen von der Klickstelle in
 * das Warenkorb-Icon (data-cart-icon) fliegen — Abschluss des Tropfen-Motivs
 * im Moment der Conversion. Web Animations API statt GSAP (kein Bundle-Ballast
 * auf allen Routen). Reduced-motion → kein Flug (Toast/Count genügen).
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
      const peakY = Math.min(y, ty) - 60;

      const el = document.createElement("div");
      el.setAttribute("aria-hidden", "true");
      el.style.cssText =
        "position:fixed;left:0;top:0;z-index:125;pointer-events:none;will-change:transform,opacity";
      el.innerHTML =
        '<svg width="14" height="21" viewBox="0 0 20 30" fill="none"><path d="M10 0C10 0 1 14 1 21a9 9 0 0 0 18 0C19 14 10 0 10 0Z" fill="#E8B25E"/></svg>';
      document.body.appendChild(el);

      const anim = el.animate(
        [
          { transform: `translate(${x - 7}px, ${y - 10}px) scale(1)`, opacity: 1 },
          {
            transform: `translate(${(x + tx) / 2 - 7}px, ${peakY}px) scale(0.85)`,
            opacity: 0.95,
            offset: 0.45,
          },
          { transform: `translate(${tx - 7}px, ${ty - 10}px) scale(0.4)`, opacity: 0.5 },
        ],
        { duration: 720, easing: "cubic-bezier(0.5, 0, 0.6, 1)" },
      );
      anim.onfinish = () => {
        el.remove();
        cart.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.28)" },
            { transform: "scale(1)" },
          ],
          { duration: 360, easing: "ease-out" },
        );
      };
    };

    window.addEventListener("sms-fly", onFly);
    return () => window.removeEventListener("sms-fly", onFly);
  }, []);

  return null;
}
