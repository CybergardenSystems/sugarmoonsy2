"use client";

import { useSyncExternalStore } from "react";

/**
 * Höhe des tatsächlich sichtbaren Viewports in Pixeln.
 *
 * Auf Mobilgeräten schrumpft dieser Wert, sobald die Bildschirmtastatur
 * aufgeht — `100dvh` tut das nicht. Dialoge mit Formular können sich damit auf
 * den sichtbaren Bereich begrenzen, statt unter die Tastatur zu rutschen.
 * Liefert `null`, solange kein Client-Wert vorliegt (SSR, alte Browser).
 */
function subscribe(onChange: () => void) {
  const vv = window.visualViewport;
  if (!vv) return () => {};
  vv.addEventListener("resize", onChange);
  return () => vv.removeEventListener("resize", onChange);
}

export function useVisualViewportHeight(): number | null {
  return useSyncExternalStore(
    subscribe,
    // gerundet, damit Sub-Pixel-Jitter keine Render-Schleife auslöst
    () => (window.visualViewport ? Math.round(window.visualViewport.height) : null),
    () => null,
  );
}
