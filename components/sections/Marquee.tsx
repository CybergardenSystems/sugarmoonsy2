"use client";

import { useState } from "react";
import { marqueeItems } from "@/data/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Endlos-Laufschrift der Trust-Begriffe. Pausierbar per Button, Hover und
 * Fokus (WCAG 2.2.2); die zweite Listenhälfte ist rein visuell und für
 * Screenreader versteckt (Council R1, UX#12).
 */
export function Marquee() {
  const [paused, setPaused] = useState(false);

  const renderItems = (hidden: boolean) =>
    marqueeItems.map((item, i) => (
      <span
        key={(hidden ? "b" : "a") + i}
        aria-hidden={hidden || undefined}
        className="flex items-center gap-3 px-7 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-moon-dim sm:text-[0.72rem]"
      >
        <Icon name="spark" size={11} className="text-honey" />
        {item}
      </span>
    ));

  return (
    <div
      className="marquee relative overflow-hidden border-y border-honey/10 bg-ink py-3.5"
      data-paused={paused || undefined}
    >
      <div className="marquee-track pr-14">
        {renderItems(false)}
        {renderItems(true)}
      </div>
      <button
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        aria-label={paused ? "Laufschrift fortsetzen" : "Laufschrift pausieren"}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-honey/20 bg-ink/90 text-moon-mute transition-colors hover:border-honey/50 hover:text-honey"
      >
        <Icon name={paused ? "play" : "pause"} size={12} />
      </button>
    </div>
  );
}
