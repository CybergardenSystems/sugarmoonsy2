"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart, formatMoney } from "./CartProvider";
import { site } from "@/data/site";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/cn";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { useVisualViewportHeight } from "@/lib/useVisualViewport";
import { primaryBtn, secondaryBtn } from "@/lib/buttonStyles";
import { Icon } from "@/components/ui/Icon";
import { MoonMark } from "@/components/brand/MoonMark";

/** Ab dieser mailto-Länge verweigern manche Clients (Outlook ~2048) die URL. */
const MAILTO_SAFE_LENGTH = 1800;

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

/** Warenkorb-Sheet + Bestell-Modal (API-Versand via Resend, mailto-Fallback). */
export function CartLayer() {
  const { items, total, isOpen, close, setQty, remove, clear } = useCart();
  const [orderOpen, setOrderOpen] = useState(false);
  const sheetRef = useRef<HTMLElement>(null);

  // Fokus bleibt im Sheet, solange es offen ist (und das Modal nicht darüber liegt).
  useFocusTrap(sheetRef, isOpen && !orderOpen, close);

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
        ref={sheetRef}
        role="dialog"
        aria-label="Warenkorb"
        aria-modal={isOpen ? "true" : undefined}
        inert={!isOpen}
        // Ohne diese Ausnahme verschluckt Lenis im gestoppten Zustand jede
        // Touch-/Wheel-Geste (preventDefault) — die Liste ließe sich auf dem
        // Handy nicht scrollen. Siehe lib/scrollLock.ts.
        data-lenis-prevent
        className={cn(
          "fixed right-0 top-0 z-[111] flex h-full w-[26rem] max-w-[92vw] flex-col border-l border-honey/12 bg-night-2 transition-[translate] duration-500 ease-out-expo",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-honey/10 px-6 py-5">
          <h2 className="font-display text-xl text-moon">Warenkorb</h2>
          <button
            onClick={close}
            aria-label="Warenkorb schließen"
            className="-mr-1.5 flex h-10 w-10 items-center justify-center rounded-full text-moon-mute transition-colors hover:text-honey sm:h-9 sm:w-9"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-moon-mute">
              <MoonMark size={48} className="mb-4 opacity-70" />
              <p className="text-sm">Noch ist es still hier.</p>
              <Link
                href="/shop"
                onClick={close}
                className={cn(primaryBtn, "mt-5 px-5 py-2.5")}
              >
                Zum Shop
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.key} className="flex gap-3 border-b border-honey/8 pb-4">
                  <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-night-3">
                    {it.photo && (
                      <Image
                        src={it.photo}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-[0.98rem] text-moon">{it.name}</p>
                    <p className="font-mono text-xs uppercase tracking-wide text-moon-mute">
                      {it.size}
                      {it.qty > 1 && <> · {formatMoney(it.price)} / Stück</>}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <QtyBtn onClick={() => setQty(it.key, it.qty - 1)} label="Weniger">
                        <Icon name="minus" size={14} />
                      </QtyBtn>
                      <span
                        className="w-6 text-center text-sm tabular-nums"
                        aria-live="polite"
                      >
                        {it.qty}
                      </span>
                      <QtyBtn onClick={() => setQty(it.key, it.qty + 1)} label="Mehr">
                        <Icon name="plus" size={14} />
                      </QtyBtn>
                      <button
                        onClick={() => remove(it.key)}
                        className="ml-auto text-xs text-moon-mute underline decoration-moon-mute/40 underline-offset-2 transition-colors hover:text-amber"
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
              onClick={() => setOrderOpen(true)}
              data-cursor="drop"
              className={cn(primaryBtn, "w-full py-3.5")}
            >
              Zur Bestellung
              <Icon name="arrow" size={16} />
            </button>
            <p className="mt-2 text-center text-xs text-moon-mute">
              Versandkosten werden individuell berechnet.
            </p>
          </div>
        )}
      </aside>

      {orderOpen && (
        <OrderModal
          onClose={() => setOrderOpen(false)}
          onOrderReceived={clear}
          onOrderComplete={() => {
            clear();
            setOrderOpen(false);
            close();
          }}
          onContinueBrowsing={() => {
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
      className="flex h-10 w-10 items-center justify-center rounded-md border border-honey/15 text-moon transition-[color,border-color,scale] duration-150 active:scale-90 hover:border-honey hover:text-honey sm:h-9 sm:w-9"
    >
      {children}
    </button>
  );
}

/* ---------- Bestell-Modal ---------- */

interface FieldSpec {
  name: string;
  label: string;
  required: boolean;
  type?: string;
  maxLength: number;
  textarea?: boolean;
  autoComplete?: string;
  colSpan?: boolean;
  /** Steuert die Tastatur auf Mobilgeräten (Zahlenblock, @-Taste …). */
  inputMode?: "text" | "numeric" | "tel" | "email";
}

const FIELDS: FieldSpec[] = [
  {
    name: "fn",
    label: "Vorname",
    required: true,
    maxLength: 60,
    autoComplete: "given-name",
  },
  {
    name: "ln",
    label: "Nachname",
    required: true,
    maxLength: 60,
    autoComplete: "family-name",
  },
  {
    name: "em",
    label: "E-Mail",
    required: true,
    type: "email",
    maxLength: 100,
    autoComplete: "email",
    colSpan: true,
    inputMode: "email",
  },
  {
    name: "ph",
    label: "Telefon (optional)",
    required: false,
    type: "tel",
    maxLength: 30,
    autoComplete: "tel",
    colSpan: true,
    inputMode: "tel",
  },
  {
    name: "ad",
    label: "Straße & Hausnr.",
    required: true,
    maxLength: 120,
    autoComplete: "street-address",
    colSpan: true,
  },
  {
    name: "pl",
    label: "PLZ",
    required: true,
    maxLength: 10,
    autoComplete: "postal-code",
    inputMode: "numeric",
  },
  {
    name: "ct",
    label: "Ort",
    required: true,
    maxLength: 80,
    autoComplete: "address-level2",
  },
  {
    name: "nt",
    label: "Anmerkungen (optional)",
    required: false,
    maxLength: 400,
    textarea: true,
    colSpan: true,
  },
];

type Step = "form" | "sent" | "fallback" | "confirmed";

function OrderModal({
  onClose,
  onOrderComplete,
  onOrderReceived,
  onContinueBrowsing,
}: {
  onClose: () => void;
  onOrderComplete: () => void;
  /** Server hat die Bestellung angenommen — Warenkorb darf sofort leeren. */
  onOrderReceived: () => void;
  onContinueBrowsing: () => void;
}) {
  const { items, total } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const idPrefix = useId();
  const headingId = `${idPrefix}-title`;
  const [step, setStep] = useState<Step>("form");
  const [orderText, setOrderText] = useState("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isWide = useMediaQuery("(min-width: 640px)", true);
  const viewportHeight = useVisualViewportHeight();
  useFocusTrap(cardRef, true, onClose);

  // Step-Wechsel für AT zustellen: Fokus auf die Überschrift des neuen
  // Screens (Council R2 — sonst fällt der Fokus auf BODY und die wichtigste
  // Statusänderung des Shops bleibt unangesagt).
  useEffect(() => {
    if (step !== "form") headingRef.current?.focus();
  }, [step]);

  const buildBody = (g: (k: string) => string) => {
    let body = `Neue Bestellung — ${g("fn")} ${g("ln")}\n\n`;
    body += items
      .map((i) => `${i.qty}x ${i.name} (${i.size}) — ${formatMoney(i.price * i.qty)}`)
      .join("\n");
    body += `\n\nGesamt: ${formatMoney(total)}\n\nName: ${g("fn")} ${g("ln")}\nE-Mail: ${g("em")}\n`;
    if (g("ph")) body += `Tel: ${g("ph")}\n`;
    body += `\nAdresse:\n${g("ad")}\n${g("pl")} ${g("ct")}\n`;
    if (g("nt")) body += `\nAnmerkung: ${g("nt")}\n`;
    return body;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const g = (k: string) => String(f.get(k) ?? "").trim();

    const nextErrors: Record<string, string> = {};
    for (const spec of FIELDS) {
      const v = g(spec.name);
      if (spec.required && !v) nextErrors[spec.name] = "Bitte ausfüllen.";
    }
    const em = g("em");
    if (em && !/^\S+@\S+\.\S+$/.test(em)) {
      nextErrors.em = "Bitte eine gültige E-Mail-Adresse eingeben.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast("Bitte prüfe die markierten Felder", "error");
      const first = Object.keys(nextErrors)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const body = buildBody(g);
    setOrderText(
      `An: ${site.email}\nBetreff: Bestellung — ${g("fn")} ${g("ln")}\n\n${body}`,
    );

    // Bevorzugt: Server-Versand über /api/order (Resend). Antwortet die
    // Route mit 503 (kein API-Key) oder scheitert sie, greift unverändert
    // der ehrliche mailto-/Kopier-Flow (D17/D26).
    setSending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(8000),
        body: JSON.stringify({
          customer: {
            fn: g("fn"),
            ln: g("ln"),
            em: g("em"),
            ph: g("ph"),
            ad: g("ad"),
            pl: g("pl"),
            ct: g("ct"),
            nt: g("nt"),
          },
          items: items.map((i) => ({
            name: i.name,
            size: i.size,
            qty: i.qty,
            price: i.price,
          })),
        }),
      });
      if (res.ok) {
        onOrderReceived();
        setStep("confirmed");
        return;
      }
    } catch {
      /* Netzwerk/Timeout — unten geht es per mailto weiter. */
    } finally {
      setSending(false);
    }

    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
      `Bestellung — ${g("fn")} ${g("ln")}`,
    )}&body=${encodeURIComponent(body)}`;

    // Lange URLs kappen manche Mail-Clients still (Council R1, B4):
    // dann gar nicht erst öffnen, sondern direkt den Kopier-Weg anbieten.
    if (mailto.length > MAILTO_SAFE_LENGTH) {
      setStep("fallback");
      return;
    }
    window.location.href = mailto;
    setStep("sent");
  };

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(orderText);
      toast("Bestelltext kopiert");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = orderText;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast("Bestelltext kopiert");
      } catch {
        toast("Kopieren nicht möglich — bitte Text markieren", "error");
      }
      ta.remove();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex justify-center bg-ink/70 backdrop-blur-md transition-opacity duration-200 starting:opacity-0 sm:items-center sm:p-4"
      // Lenis läuft im gestoppten Zustand und würde sonst jede Scroll-Geste
      // im Dialog abfangen (lenis.mjs: isStopped → preventDefault).
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        // Auf dem Handy Vollbild: mehr Platz fürs Formular, und die Karte
        // endet nie unter der Browserleiste. Die Höhe folgt dem sichtbaren
        // Viewport, damit die Tastatur die Felder nicht verdeckt.
        style={!isWide && viewportHeight ? { height: `${viewportHeight}px` } : undefined}
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-honey/15 bg-night-2 scale-100 transition-[opacity,scale] duration-200 ease-out-expo starting:scale-[0.98] starting:opacity-0 sm:h-auto sm:max-h-[90dvh] sm:max-w-lg sm:rounded-2xl sm:border"
      >
        <button
          onClick={onClose}
          aria-label="Bestelldialog schließen"
          // deckend, weil der Inhalt beim Scrollen darunter durchläuft
          className="absolute right-3.5 top-3.5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-night-2 text-moon-mute ring-1 ring-honey/15 transition-colors hover:text-honey sm:h-9 sm:w-9"
        >
          <CloseIcon />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-7 sm:pb-7 sm:pt-7">
          {step !== "form" ? (
            <div className="py-4">
              <div className="mb-4 flex justify-center">
                <MoonMark size={64} />
              </div>
              <h2
                id={headingId}
                ref={headingRef}
                tabIndex={-1}
                className="text-center font-display text-2xl text-moon outline-none"
              >
                {step === "confirmed"
                  ? "Bestellung eingegangen!"
                  : step === "sent"
                    ? "Fast geschafft!"
                    : "Ein Schritt noch"}
              </h2>
              <p
                role="status"
                className="mx-auto mt-2 max-w-sm text-center text-sm leading-relaxed text-moon-dim"
              >
                {step === "confirmed" ? (
                  <>
                    Danke! Deine Bestellung ist bei uns angekommen —{" "}
                    <strong className="text-moon">
                      wir melden uns per E-Mail mit Zahlungs- und Versanddetails.
                    </strong>
                  </>
                ) : step === "sent" ? (
                  <>
                    Dein E-Mail-Programm sollte sich mit der fertigen Bestellung geöffnet
                    haben.{" "}
                    <strong className="text-moon">Bitte sende die E-Mail dort ab</strong>{" "}
                    — erst dann erreicht uns deine Bestellung.
                  </>
                ) : (
                  <>
                    Deine Bestellung ist zu umfangreich für den automatischen
                    E-Mail-Entwurf. Kopiere den Bestelltext unten und sende ihn an{" "}
                    <a className="text-honey underline" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                    .
                  </>
                )}
              </p>

              <div className="mt-5 rounded-xl border border-honey/15 bg-ink/50 p-4">
                <pre className="max-h-44 overflow-y-auto overscroll-contain whitespace-pre-wrap font-mono text-xs leading-relaxed text-moon-dim">
                  {orderText}
                </pre>
              </div>

              <div className="mt-4 flex flex-col gap-2">
                <button onClick={copyOrder} className={cn(secondaryBtn, "w-full py-3")}>
                  {step === "confirmed"
                    ? "Bestellübersicht kopieren"
                    : "Bestelltext kopieren"}
                </button>
                {step === "confirmed" ? (
                  <button
                    onClick={onContinueBrowsing}
                    className={cn(primaryBtn, "w-full py-3")}
                  >
                    Alles klar — weiter stöbern
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        toast("Danke! Wir melden uns per E-Mail.");
                        onOrderComplete();
                      }}
                      className={cn(primaryBtn, "w-full py-3")}
                    >
                      E-Mail ist raus — Warenkorb leeren
                    </button>
                    <button
                      onClick={onContinueBrowsing}
                      className="w-full py-2 text-sm text-moon-mute transition-colors hover:text-moon"
                    >
                      Weiter stöbern (Warenkorb behalten)
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <h2 id={headingId} className="pr-10 font-display text-2xl text-moon">
                Bestellung abschicken
              </h2>
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

              <form ref={formRef} onSubmit={submit} noValidate className="space-y-3">
                <p className="text-xs text-moon-mute">* Pflichtfeld</p>
                <div className="grid grid-cols-2 gap-3">
                  {FIELDS.map((spec) => (
                    <Field
                      key={spec.name}
                      spec={spec}
                      idPrefix={idPrefix}
                      error={errors[spec.name]}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className={cn(primaryBtn, "w-full py-3.5 disabled:opacity-60")}
                >
                  {sending ? (
                    "Wird gesendet…"
                  ) : (
                    <>
                      Bestellung absenden
                      <Icon name="arrow" size={16} />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  spec,
  idPrefix,
  error,
}: {
  spec: FieldSpec;
  idPrefix: string;
  error?: string;
}) {
  const id = `${idPrefix}-${spec.name}`;
  const errId = `${id}-err`;
  const cls = cn(
    // text-base (16 px) auf dem Handy ist Pflicht: darunter zoomt iOS Safari
    // beim Fokussieren automatisch in die Seite hinein.
    "w-full rounded-lg border bg-ink/60 px-3.5 py-2.5 text-base text-moon transition-colors placeholder:text-moon-mute focus:border-honey focus:outline-none focus:ring-1 focus:ring-honey sm:text-sm",
    error ? "border-amber/70" : "border-honey/55",
  );
  const shared = {
    id,
    name: spec.name,
    required: spec.required,
    "aria-required": spec.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    maxLength: spec.maxLength,
    autoComplete: spec.autoComplete,
    inputMode: spec.inputMode,
    className: cls,
  } as const;

  return (
    <div className={spec.colSpan ? "col-span-2" : undefined}>
      <label
        htmlFor={id}
        className="mb-1 block font-mono text-xs uppercase tracking-wider text-moon-dim"
      >
        {spec.label}
        {spec.required && " *"}
      </label>
      {spec.textarea ? (
        <textarea {...shared} rows={2} />
      ) : (
        <input {...shared} type={spec.type ?? "text"} />
      )}
      {error && (
        <p id={errId} role="alert" className="mt-1 text-xs text-amber">
          {error}
        </p>
      )}
    </div>
  );
}
