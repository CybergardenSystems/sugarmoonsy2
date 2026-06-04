"use client";

import { limonaden, type Limonade } from "@/lib/limonaden";
import { useCart, formatMoney } from "@/components/cart/CartProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { toast } from "@/lib/toast";

const accentMap = {
  lavender: { glow: "var(--color-lavender)", chip: "text-lavender", icon: "droplet" as IconName },
  sage: { glow: "var(--color-sage)", chip: "text-sage", icon: "leaf" as IconName },
} as const;

export function LimoCards() {
  return (
    <div className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-2">
      {limonaden.map((l) => (
        <Card key={l.id} limo={l} />
      ))}
    </div>
  );
}

function Card({ limo }: { limo: Limonade }) {
  const { add } = useCart();
  const a = accentMap[limo.accent];

  const onAdd = () => {
    add({
      id: `limo-${limo.id}`,
      name: limo.name,
      size: limo.volume,
      price: limo.price,
      photo: null,
    });
    toast(`${limo.name} hinzugefügt`);
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-honey/10 bg-night-2/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-honey/25 sm:p-7"
      style={{ ["--ac" as string]: a.glow }}
    >
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-50 blur-2xl transition-opacity duration-500 group-hover:opacity-80"
        style={{ background: `radial-gradient(circle, ${a.glow}33, transparent 70%)` }}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <span className={`font-mono text-[0.62rem] uppercase tracking-[0.16em] ${a.chip}`}>
              {limo.type}
            </span>
            <h3 className="mt-1 text-balance font-display text-2xl text-moon">{limo.name}</h3>
            <p className="font-mono text-[0.7rem] text-moon-mute">{limo.volume}</p>
          </div>
          <Icon
            name={a.icon}
            className="h-10 w-10 shrink-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
            style={{ color: a.glow }}
          />
        </div>

        <ul className="mt-5 space-y-1.5">
          {limo.traits.map((t) => (
            <li key={t} className="flex items-center gap-2 text-[0.82rem] text-moon-dim">
              <Icon name="check" size={14} className="shrink-0 text-honey" />
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-4 rounded-xl border border-honey/8 bg-night-3/50 p-3.5 text-[0.74rem] leading-relaxed text-moon-mute">
          <span className="text-moon-dim">Zutaten:</span> {limo.ingredients}
          <br />
          <span className="text-[0.66rem]">{limo.organic}</span>
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-2xl text-moon">{formatMoney(limo.price)}</span>
          <button
            onClick={onAdd}
            data-cursor="drop"
            className="rounded-xl bg-honey px-5 py-2.5 text-[0.8rem] font-semibold text-ink transition-colors hover:bg-honey-glow"
          >
            In den Warenkorb
          </button>
        </div>
      </div>
    </article>
  );
}
