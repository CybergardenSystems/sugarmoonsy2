"use client";

/**
 * Zentrale Scroll-Sperre für Sheet/Menü — Lenis-fest (Council R2, Blocker):
 * Die reine CSS-Klasse reicht nicht, weil Lenis Wheel-Events abfängt und
 * programmatisch weiterscrollt; erst `lenis.stop()` hält es wirklich an.
 * Ein Zähler erlaubt überlappende Sperren (Sheet + Menü).
 */

interface LenisLike {
  stop: () => void;
  start: () => void;
}

let lenis: LenisLike | null = null;
let locks = 0;

export function registerLenis(instance: LenisLike | null) {
  lenis = instance;
  if (locks > 0) lenis?.stop();
}

export function lockScroll() {
  locks += 1;
  document.documentElement.classList.add("sms-locked");
  lenis?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) {
    document.documentElement.classList.remove("sms-locked");
    lenis?.start();
  }
}
