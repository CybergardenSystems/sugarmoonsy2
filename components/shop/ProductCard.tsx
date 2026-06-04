"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { AccentKey, Product } from "@/lib/products";
import { useCart, formatMoney } from "@/components/cart/CartProvider";
import { MoonMark } from "@/components/brand/MoonMark";
import { photoSrc } from "@/lib/photos";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/cn";

export const accentVar: Record<AccentKey, string> = {
  honey: "var(--color-honey)",
  amber: "var(--color-amber)",
  cinnamon: "var(--color-cinnamon)",
  sage: "var(--color-sage)",
  lavender: "var(--color-lavender)",
  plum: "var(--color-plum)",
  moon: "var(--color-silver)",
  pumpkin: "var(--color-pumpkin)",
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0].label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const active = product.sizes.find((s) => s.label === size) ?? product.sizes[0];
  const ac = accentVar[product.accent] ?? "var(--color-honey)";
  const src = photoSrc(product);

  const onAdd = () => {
    add(
      {
        id: product.id,
        name: product.name,
        size: active.label,
        price: active.price,
        photo: product.photo,
      },
      qty,
    );
    toast(`${qty}× ${product.name} (${active.label}) hinzugefügt`);
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-honey/10 bg-night-2/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-honey/30"
      style={{ ["--ac" as string]: ac }}
    >
      {product.badge && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-honey px-2.5 py-0.5 font-mono text-[0.58rem] font-bold uppercase tracking-wide text-ink">
          {product.badge}
        </span>
      )}

      <Link
        href={`/shop/${product.slug}`}
        data-cursor="view"
        aria-label={`${product.name} ansehen`}
        className="relative block aspect-[4/5] overflow-hidden"
      >
        {src ? (
          <>
            {/* dunkles Photo-Well — die Fotos sind bereits moody/dark-studio */}
            <div className="absolute inset-0 bg-night-3" />
            <Image
              src={src}
              alt={`${product.name} — Flasche mit grünem Mond-Etikett`}
              fill
              sizes="(max-width:768px) 50vw, 300px"
              priority={priority}
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-2 to-transparent" />
          </>
        ) : (
          <Placeholder accent={ac} season={product.season} />
        )}
        <span
          className="absolute bottom-3 left-3 rounded-full bg-night/70 px-2.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-wide backdrop-blur"
          style={{ color: ac }}
        >
          {product.season}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-xl text-moon transition-colors group-hover:text-honey">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-[0.82rem] leading-snug text-moon-mute">
          {product.flavor}
        </p>

        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="font-display text-2xl text-honey">
            {formatMoney(active.price)}
          </span>
          <span className="font-mono text-[0.66rem] text-moon-mute">/ {active.label}</span>
        </div>

        {product.sizes.length > 1 && (
          <div className="mt-3 flex gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => setSize(s.label)}
                className={cn(
                  "rounded-full border px-2.5 py-1 font-mono text-[0.62rem] transition-colors",
                  s.label === size
                    ? "border-honey bg-honey/15 text-honey"
                    : "border-honey/15 text-moon-dim hover:border-honey/40",
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-4">
          <div className="flex items-center rounded-lg border border-honey/15">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Weniger"
              className="flex h-8 w-8 items-center justify-center text-moon transition-colors hover:text-honey"
            >
              −
            </button>
            <span className="w-6 text-center text-sm">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label="Mehr"
              className="flex h-8 w-8 items-center justify-center text-moon transition-colors hover:text-honey"
            >
              +
            </button>
          </div>
          <button
            onClick={onAdd}
            data-cursor="drop"
            className={cn(
              "flex-1 rounded-lg py-2.5 text-[0.8rem] font-semibold transition-colors",
              added
                ? "bg-sage text-ink"
                : "bg-honey text-ink hover:bg-honey-glow",
            )}
          >
            {added ? "✓ Hinzugefügt" : "In den Warenkorb"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Placeholder({ accent, season }: { accent: string; season: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-night-3">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(60% 50% at 50% 42%, ${accent}22, transparent 70%)`,
        }}
      />
      <MoonMark size={104} className="relative opacity-90" />
      <span className="relative mt-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-moon-mute">
        Foto folgt
      </span>
      <span className="sr-only">{season}</span>
    </div>
  );
}
