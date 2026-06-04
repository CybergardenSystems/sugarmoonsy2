"use client";

import { useState } from "react";
import { products, productsBySeason, SEASONS, type SeasonKey } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/cn";

/** Filterbare Produktliste mit Saison-Tabs (Ambient bleibt im Card-Accent). */
export function ShopGrid() {
  const [filter, setFilter] = useState<SeasonKey | "all">("all");
  const list = filter === "all" ? products : productsBySeason(filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {SEASONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={cn(
              "rounded-full border px-4 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.12em] transition-colors",
              filter === s.key
                ? "border-honey bg-honey text-ink"
                : "border-honey/15 text-moon-dim hover:border-honey/40 hover:text-moon",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
