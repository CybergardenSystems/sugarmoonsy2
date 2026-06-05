"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart, formatMoney } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
import { toast } from "@/lib/toast";
import { flyToCart } from "@/lib/flyToCart";
import { cn } from "@/lib/cn";

export function BuyPanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0].label);
  const [qty, setQty] = useState(1);
  const active = product.sizes.find((s) => s.label === size) ?? product.sizes[0];

  const onAdd = (e: React.MouseEvent) => {
    flyToCart(e.clientX, e.clientY);
    add(
      { id: product.id, name: product.name, size: active.label, price: active.price, photo: product.photo },
      qty,
    );
    toast(`${qty}× ${product.name} (${active.label}) hinzugefügt`);
    setQty(1);
  };

  return (
    <div className="mt-7 rounded-2xl border border-honey/12 bg-night-2/60 p-6">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl text-honey">{formatMoney(active.price)}</span>
        <span className="font-mono text-xs text-moon-mute">/ {active.label}</span>
      </div>

      {product.sizes.length > 1 && (
        <div className="mt-4">
          <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-wider text-moon-mute">
            Größe
          </p>
          <div className="flex gap-2">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => setSize(s.label)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs transition-colors",
                  s.label === size
                    ? "border-honey bg-honey/15 text-honey"
                    : "border-honey/15 text-moon-dim hover:border-honey/40",
                )}
              >
                {s.label} · {formatMoney(s.price)}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.comingSoon ? (
        <div className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-honey/25 bg-honey/5 py-3.5 text-sm font-semibold text-honey/80">
          <Icon name="check" size={16} /> Bald verfügbar — Coming Soon
        </div>
      ) : (
        <div className="mt-6 flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-honey/15">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Weniger"
              className="flex h-11 w-11 items-center justify-center text-moon transition-colors hover:text-honey"
            >
              <Icon name="minus" size={16} />
            </button>
            <span className="w-7 text-center tabular-nums">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label="Mehr"
              className="flex h-11 w-11 items-center justify-center text-moon transition-colors hover:text-honey"
            >
              <Icon name="plus" size={16} />
            </button>
          </div>
          <button
            onClick={onAdd}
            data-cursor="drop"
            className="flex-1 rounded-lg bg-honey py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-honey-glow"
          >
            In den Warenkorb · {formatMoney(active.price * qty)}
          </button>
        </div>
      )}
    </div>
  );
}
