"use client";

import { useEffect, useRef, useState } from "react";
import { MoonScene } from "./MoonScene";
import { media } from "@/data/media";

/**
 * Hero-Hintergrund: cinematisches Higgsfield-Video als Basis, darunter die
 * animierte MoonScene als Fallback (reduced-motion oder Video lädt nicht).
 * Dunkle Overlays sichern die Text-Lesbarkeit.
 */
export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    // Video nur, wenn sinnvoll: keine reduced-motion, gen. Viewport, kein Data-Saver.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData === true;
    setUseVideo(!reduce && wide && !saveData);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Fallback / Tiefe — immer vorhanden */}
      <MoonScene />

      {/* Higgsfield-Video (nur Desktop, ohne reduced-motion / Data-Saver) */}
      {useVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoOk ? "opacity-[0.55]" : "opacity-0"
          }`}
          src={media.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoOk(true)}
        />
      )}

      {/* Legibility & color unification */}
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/55 to-night/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/40" />
      <div className="absolute inset-0 bg-night/20" />
    </div>
  );
}
