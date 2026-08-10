"use client";

import { useState } from "react";
import { useCart, formatMoney } from "./CartProvider";
import { site } from "@/data/site";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { MoonMark } from "@/components/brand/MoonMark";

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Warenkorb-Sheet + Bestell-Modal (mailto-Flow, kein Backend). */
export function CartLayer() {
  const { items, total, isOpen, close, setQty, remove, clear } = useCart();
  const [orderOpen, setOrderOpen] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={cn(
          "fixed inset-0 z-[110] bg-ink/60 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden
      />

      {/* Sheet */}
      <aside
        role="dialog"
        aria-label="Warenkorb"
        aria-modal={isOpen}
        inert={!isOpen}
        className={cn(
          "fixed right-0 top-0 z-[111] flex h-full w-[26rem] max-w-[92vw] flex-col border-l border-honey/12 bg-night-2 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-honey/10 px-6 py-5">
          <h2 className="font-display text-xl text-moon">Warenkorb</h2>
          <button
            onClick={close}
            aria-label="Schließen"
            className="-mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-moon-mute transition-colors hover:text-honey sm:h-9 sm:w-9"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-moon-mute">
              <MoonMark size={48} className="mb-4 opacity-70" />
              <p className="text-sm">Noch leer — stöbere im Shop.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.key} className="flex gap-3 border-b border-honey/8 pb-4">
                  <div className="flex-1">
                    <p className="font-display text-[0.98rem] text-moon">{it.name}</p>
                    <p className="font-mono text-[0.68rem] uppercase tracking-wide text-moon-mute">
                      {it.size} · {formatMoney(it.price)}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <QtyBtn onClick={() => setQty(it.key, it.qty - 1)} label="Weniger">
                        <Icon name="minus" size={14} />
                      </QtyBtn>
                      <span className="w-6 text-center text-sm tabular-nums">
                        {it.qty}
                      </span>
                      <QtyBtn onClick={() => setQty(it.key, it.qty + 1)} label="Mehr">
                        <Icon name="plus" size={14} />
                      </QtyBtn>
                      <button
                        onClick={() => remove(it.key)}
                        className="ml-auto text-xs text-moon-mute transition-colors hover:text-amber"
                      >
                        Entfernen
                      </button>
                    </div>
                  </div>
                  <span className="font-display text-honey">
                    {formatMoney(it.price * it.qty)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-honey/10 bg-night-3/40 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-moon-dim">Gesamt</span>
              <span className="font-display text-2xl text-moon">
                {formatMoney(total)}
              </span>
            </div>
            <button
              onClick={() => {
                setDone(false);
                setOrderOpen(true);
              }}
              data-cursor="drop"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-honey py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-honey-glow"
            >
              Zur Bestellung
              <Icon name="arrow" size={16} />
            </button>
            <p className="mt-2 text-center text-[0.68rem] text-moon-mute">
              Versandkosten werden individuell berechnet.
            </p>
          </div>
        )}
      </aside>

      {orderOpen && (
        <OrderModal
          onClose={() => setOrderOpen(false)}
          done={done}
          onSubmitted={() => {
            setDone(true);
            toast("Bestellung übermittelt — wir melden uns!");
          }}
          onContinue={() => {
            clear();
            setOrderOpen(false);
            close();
          }}
        />
      )}
    </>
  );
}

function QtyBtn({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-md border border-honey/15 text-moon transition-colors hover:border-honey hover:text-honey sm:h-7 sm:w-7"
    >
      {children}
    </button>
  );
}

function OrderModal({
  onClose,
  onSubmitted,
  onContinue,
  done,
}: {
  onClose: () => void;
  onSubmitted: () => void;
  onContinue: () => void;
  done: boolean;
}) {
  const { items, total } = useCart();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();
    const fn = g("fn"),
      ln = g("ln"),
      em = g("em"),
      ph = g("ph"),
      ad = g("ad"),
      pl = g("pl"),
      ct = g("ct"),
      nt = g("nt");

    if (!fn || !ln || !em || !ad || !pl || !ct) {
      toast("Bitte alle Pflichtfelder ausfüllen");
      return;
    }
    if (!em.includes("@")) {
      toast("Gültige E-Mail eingeben");
      return;
    }

    let body = `Neue Bestellung — ${fn} ${ln}\n\n`;
    body += items
      .map((i) => `${i.qty}x ${i.name} (${i.size}) — ${formatMoney(i.price * i.qty)}`)
      .join("\n");
    body += `\n\nGesamt: ${formatMoney(total)}\n\nName: ${fn} ${ln}\nE-Mail: ${em}\n`;
    if (ph) body += `Tel: ${ph}\n`;
    body += `\nAdresse:\n${ad}\n${pl} ${ct}\n`;
    if (nt) body += `\nAnmerkung: ${nt}\n`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Bestellung — ${fn} ${ln}`,
    )}&body=${encodeURIComponent(body)}`;
    onSubmitted();
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-md">
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-honey/15 bg-night-2 p-7">
        <button
          onClick={onClose}
          aria-label="Schließen"
          className="absolute right-3.5 top-3.5 flex h-10 w-10 items-center justify-center rounded-full text-moon-mute transition-colors hover:text-honey sm:h-9 sm:w-9"
        >
          <CloseIcon />
        </button>

        {done ? (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <MoonMark size={72} />
            </div>
            <h2 className="font-display text-2xl text-moon">Vielen Dank!</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm text-moon-dim">
              Deine Bestellung ist auf dem Weg zu uns. Wir melden uns in Kürze per E-Mail
              mit Zahlungs- und Versanddetails.
            </p>
            <button
              onClick={onContinue}
              className="mt-6 rounded-xl bg-honey px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-honey-glow"
            >
              Weiter stöbern
            </button>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl text-moon">Bestellung abschicken</h2>
            <p className="mt-1 text-sm text-moon-dim">
              Wir melden uns per E-Mail mit Zahlungs- und Versanddetails.
            </p>

            <div className="my-5 rounded-xl border border-honey/10 bg-night-3/40 p-4">
              {items.map((i) => (
                <div
                  key={i.key}
                  className="flex justify-between py-1 text-sm text-moon-dim"
                >
                  <span>
                    {i.qty}× {i.name} ({i.size})
                  </span>
                  <span className="text-moon">{formatMoney(i.price * i.qty)}</span>
                </div>
              ))}
              <div className="mt-2 flex justify-between border-t border-honey/15 pt-2 font-display text-lg text-moon">
                <span>Gesamt</span>
                <span>{formatMoney(total)}</span>
              </div>
            </div>

            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Field name="fn" label="Vorname *" />
                <Field name="ln" label="Nachname *" />
              </div>
              <Field name="em" label="E-Mail *" type="email" />
              <Field name="ph" label="Telefon (optional)" type="tel" />
              <Field name="ad" label="Straße & Hausnr. *" />
              <div className="grid grid-cols-2 gap-3">
                <Field name="pl" label="PLZ *" />
                <Field name="ct" label="Ort *" />
              </div>
              <Field name="nt" label="Anmerkungen" textarea />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-honey py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-honey-glow"
              >
                Bestellung absenden
                <Icon name="arrow" size={16} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  textarea = false,
}: {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded-lg border border-honey/12 bg-night-3/50 px-3.5 py-2.5 text-sm text-moon outline-none transition-colors placeholder:text-moon-mute focus:border-honey";
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-[0.6rem] uppercase tracking-wider text-moon-mute">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} rows={2} className={cls} />
      ) : (
        <input name={name} type={type} className={cls} />
      )}
    </label>
  );
}
