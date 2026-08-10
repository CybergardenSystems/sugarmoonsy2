"use client";

import Image from "next/image";
import { useState } from "react";
import { MoonScene } from "./MoonScene";
import { media } from "@/data/media";
import { useHydrated, useMediaQuery } from "@/lib/useMediaQuery";

/** Data-Saver / sehr langsame Verbindungen: kein Hero-Video laden. */
function connectionAllowsVideo(): boolean {
  if (typeof navigator === "undefined") return true;
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return true;
  if (conn.saveData) return false;
  if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g") return false;
  return true;
}

/**
 * Hero-Hintergrund: Poster-Standbild (SSR, sofortiger Paint → LCP-Anker),
 * darüber blendet das cinematische Video ein, sobald es abspielbereit ist.
 * MoonScene liegt als Tiefe/Fallback darunter. Video lädt nur clientseitig,
 * nie bei reduced-motion oder Data-Saver (Council R1).
 */
export function HeroBackground() {
  const [videoOk, setVideoOk] = useState(false);
  const hydrated = useHydrated();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const portrait = useMediaQuery("(max-width: 767px)");
  const src =
    !hydrated || reduce || !connectionAllowsVideo()
      ? null
      : portrait
        ? media.heroVideoPortrait
        : media.heroVideo;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Fallback / Tiefe — immer vorhanden */}
      <MoonScene />

      {/* Poster: server-gerendert, lädt sofort — erster Video-Frame */}
      <div className={`absolute inset-0 opacity-[0.55] ${videoOk ? "hidden" : ""}`}>
        <Image
          src={media.heroPoster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-center md:block"
        />
        <Image
          src={media.heroPosterPortrait}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:hidden"
        />
      </div>

      {src && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoOk ? "opacity-[0.55]" : "opacity-0"
          }`}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoOk(true)}
        />
      )}

      {/* Lesbarkeits-Scrims — bewusst nur je einer pro Breakpoint
          (Council R1: vier gestapelte Layer erstickten Video und Mond) */}
      <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/30 to-night/85 sm:hidden" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(100deg,var(--color-night)_18%,rgba(14,26,20,0.62)_44%,rgba(14,26,20,0.18)_72%,rgba(14,26,20,0.55)_100%)] sm:block" />
    </div>
  );
}
