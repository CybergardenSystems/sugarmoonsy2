"use client";

import { useEffect, useRef, useState } from "react";
import { MoonScene } from "./MoonScene";
import { media } from "@/data/media";

/**
 * Hero-Hintergrund: cinematisches Higgsfield-Video als Basis (Hochformat auf
 * Mobile, Querformat auf Desktop), darunter die animierte MoonScene als
 * Fallback (reduced-motion oder Video lädt nicht). Dunkle Overlays sichern die
 * Text-Lesbarkeit.
 */
export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const portrait = window.matchMedia("(max-width: 767px)").matches;
    setSrc(portrait ? media.heroVideoPortrait : media.heroVideo);
  }, []);

  // Quelle bei Orientierungs-/Größenwechsel aktualisieren.
  useEffect(() => {
    if (!src) return;
    const onResize = () => {
      const portrait = window.matchMedia("(max-width: 767px)").matches;
      const next = portrait ? media.heroVideoPortrait : media.heroVideo;
      setSrc((prev) => (prev === next ? prev : next));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [src]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Fallback / Tiefe — immer vorhanden */}
      <MoonScene />

      {src && (
        <video
          key={src}
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoOk ? "opacity-[0.55]" : "opacity-0"
          }`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoOk(true)}
        />
      )}

      {/* Legibility & color unification */}
      {/* Mobile: vertikaler Scrim (Text füllt die Breite) */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/75 via-night/35 to-night/80 sm:hidden" />
      {/* Desktop: linker Scrim (Text steht links) */}
      <div className="absolute inset-0 hidden bg-gradient-to-r from-night via-night/55 to-night/10 sm:block" />
      <div className="absolute inset-0 hidden bg-gradient-to-t from-night via-transparent to-night/40 sm:block" />
      <div className="absolute inset-0 bg-night/20" />
    </div>
  );
}
