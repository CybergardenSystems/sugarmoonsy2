"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { accentVar, type Product } from "@/lib/products";
import { useCart, formatMoney } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { photoSrc } from "@/lib/photos";
import { toast } from "@/lib/toast";
import { flyToCart } from "@/lib/flyToCart";
import { cn } from "@/lib/cn";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0].label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const active = product.sizes.find((s) => s.label === size) ?? product.sizes[0];
  const ac = accentVar[product.accent] ?? "var(--color-honey)";
  const src = photoSrc(product);

  const onAdd = (e: React.MouseEvent) => {
    flyToCart(e.clientX, e.clientY);
    add(
      {
        id: product.id,
        name: product.name,
        size: active.label,
        price: active.price,
        photo: src,
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
        <span className="absolute left-3 top-3 z-10 rounded-full bg-honey px-2.5 py-0.5 font-mono text-[0.66rem] font-bold uppercase tracking-wide text-ink">
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
              alt={`${product.name} — Flasche mit Mond-Etikett`}
              fill
              sizes="(max-width:1023px) 50vw, (max-width:1279px) 33vw, 300px"
              priority={priority}
              className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-2 to-transparent" />
          </>
        ) : (
          <Placeholder accent={ac} season={product.season} />
        )}
        <span
          className="absolute bottom-3 left-3 rounded-full bg-night/70 px-2.5 py-0.5 font-mono text-[0.66rem] uppercase tracking-wide backdrop-blur"
          style={{ color: ac }}
        >
          {product.season}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-balance font-display text-lg text-moon transition-colors group-hover:text-honey sm:text-xl">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-[0.82rem] leading-snug text-moon-mute">
          {product.flavor}
        </p>

        <div className="mt-3 flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="font-display text-xl text-honey sm:text-2xl">
            {formatMoney(active.price)}
          </span>
          <span className="font-mono text-[0.68rem] text-moon-mute">
            / {active.label}
          </span>
        </div>

        {product.sizes.length > 1 && (
          <div
            className="mt-3 flex flex-wrap gap-1.5"
            role="group"
            aria-label="Größe wählen"
          >
            {product.sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => setSize(s.label)}
                aria-pressed={s.label === size}
                className={cn(
                  "rounded-full border px-2.5 py-1 font-mono text-[0.7rem] transition-colors",
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

        {product.comingSoon ? (
          <div className="mt-auto pt-4">
            <div className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-honey/25 bg-honey/5 text-[0.8rem] font-semibold text-honey/80">
              <Icon name="check" size={15} /> Bald verfügbar
            </div>
          </div>
        ) : (
          <div className="mt-auto flex flex-col gap-2 pt-4 sm:flex-row sm:items-center">
            <div className="flex items-center self-start rounded-lg border border-honey/15">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Weniger"
                className="flex h-10 w-10 items-center justify-center text-moon transition-colors hover:text-honey md:h-9 md:w-9"
              >
                <Icon name="minus" size={16} />
              </button>
              <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Mehr"
                className="flex h-10 w-10 items-center justify-center text-moon transition-colors hover:text-honey md:h-9 md:w-9"
              >
                <Icon name="plus" size={16} />
              </button>
            </div>
            <button
              onClick={onAdd}
              data-cursor="drop"
              className={cn(
                "flex h-10 w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg text-[0.8rem] font-semibold transition-colors sm:w-auto sm:flex-1 md:h-9",
                added
                  ? "bg-sage text-ink"
                  : "bg-honey text-ink shadow-[0_8px_22px_-8px_rgba(232,178,94,0.35)] hover:bg-honey-glow",
              )}
            >
              {added ? (
                <>
                  <Icon name="check" size={15} /> Hinzugefügt
                </>
              ) : (
                "In den Warenkorb"
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function Placeholder({ accent, season }: { accent: string; season: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-night-3">
      {/* Akzent-Schein, von der Sorte gefärbt */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(68% 52% at 50% 38%, ${accent}2e, transparent 70%)`,
        }}
      />
      {/* feines Haarlinien-Raster für editoriale Tiefe */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-moon) 1px, transparent 1px), linear-gradient(90deg, var(--color-moon) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(circle at 50% 42%, black, transparent 78%)",
        }}
      />
      {/* Vignette unten, damit die Saison-Caption sitzt */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-night-2 to-transparent" />

      {/* zentrierte Flaschen-Silhouette mit sortengefärbtem Mond-Emblem */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 60 130"
          className="h-[60%] max-h-44 w-auto drop-shadow-[0_10px_28px_rgba(0,0,0,0.5)]"
          style={{ color: accent }}
          aria-hidden="true"
        >
          {/* Flaschenkorpus */}
          <path
            d="M24 6h12v10c0 4 6 9 6 18v66a8 8 0 0 1-8 8H26a8 8 0 0 1-8-8V34c0-9 6-14 6-18z"
            fill="currentColor"
            fillOpacity="0.06"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1.1"
          />
          {/* Verschluss */}
          <rect
            x="23"
            y="2"
            width="14"
            height="6"
            rx="2"
            fill="currentColor"
            fillOpacity="0.45"
          />
          {/* Etikett-Feld */}
          <rect
            x="19"
            y="56"
            width="22"
            height="36"
            rx="3"
            fill="var(--color-night)"
            fillOpacity="0.6"
            stroke="currentColor"
            strokeOpacity="0.28"
            strokeWidth="0.7"
          />
          {/* Sichelmond-Emblem auf dem Etikett, in der Akzentfarbe */}
          <path
            d="M35 67a8 8 0 1 0 0 14 6 6 0 0 1 0-14z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          {/* zwei feine Etikett-Linien */}
          <path
            d="M24 86h12M27 89.5h6"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* editoriale Wortmarke — macht die Kachel bewusst gestaltet, kein „fehlendes Bild" */}
      <span
        className="absolute left-1/2 top-[14%] -translate-x-1/2 whitespace-nowrap font-mono text-[0.54rem] uppercase tracking-[0.34em] text-moon-mute"
        aria-hidden="true"
      >
        Sugar Moon
      </span>
      <span className="sr-only">{season}</span>
    </div>
  );
}
