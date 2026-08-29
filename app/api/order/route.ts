import { NextResponse } from "next/server";
import { site } from "@/data/site";

/**
 * Server-seitiger Bestellversand über Resend (https://resend.com).
 *
 * Bewusst optional: Ohne RESEND_API_KEY antwortet die Route mit 503 und der
 * Client fällt still auf den bewährten mailto-/Kopier-Flow zurück (D17/D26) —
 * es gibt keinen Zustand, in dem Bestellen unmöglich ist. Aktivierung:
 * Env-Variable RESEND_API_KEY in Vercel setzen (Anleitung in
 * docs/rebuild/FINAL_REPORT.md §Launch-Fragen).
 *
 * Optionale Env-Variablen:
 *  - SMS_ORDER_TO:   Empfänger-Postfach (Default: site.email)
 *  - SMS_ORDER_FROM: Verifizierter Absender (Default: bestellung@<Domain>)
 */

interface OrderItem {
  name: string;
  size: string;
  qty: number;
  price: number;
}

interface OrderCustomer {
  fn: string;
  ln: string;
  em: string;
  ph: string;
  ad: string;
  pl: string;
  ct: string;
  nt: string;
}

const CUSTOMER_LIMITS: Record<keyof OrderCustomer, number> = {
  fn: 60,
  ln: 60,
  em: 100,
  ph: 30,
  ad: 120,
  pl: 10,
  ct: 80,
  nt: 400,
};

function str(v: unknown, max: number): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length <= max ? t : null;
}

function parseOrder(
  raw: unknown,
): { customer: OrderCustomer; items: OrderItem[] } | null {
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, unknown>;

  const c = o.customer as Record<string, unknown> | undefined;
  if (typeof c !== "object" || c === null) return null;
  const customer = {} as OrderCustomer;
  for (const key of Object.keys(CUSTOMER_LIMITS) as (keyof OrderCustomer)[]) {
    const v = str(c[key] ?? "", CUSTOMER_LIMITS[key]);
    if (v === null) return null;
    customer[key] = v;
  }
  if (!customer.fn || !customer.ln || !customer.ad || !customer.pl || !customer.ct) {
    return null;
  }
  if (!/^\S+@\S+\.\S+$/.test(customer.em)) return null;

  if (!Array.isArray(o.items) || o.items.length === 0 || o.items.length > 40) {
    return null;
  }
  const items: OrderItem[] = [];
  for (const it of o.items) {
    if (typeof it !== "object" || it === null) return null;
    const i = it as Record<string, unknown>;
    const name = str(i.name, 120);
    const size = str(i.size, 40);
    const qty = i.qty;
    const price = i.price;
    if (
      !name ||
      !size ||
      typeof qty !== "number" ||
      !Number.isInteger(qty) ||
      qty < 1 ||
      qty > 99 ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      price > 500
    ) {
      return null;
    }
    items.push({ name, size, qty, price });
  }
  return { customer, items };
}

const money = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
  " €";

function buildText(customer: OrderCustomer, items: OrderItem[]): string {
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  let body = `Neue Bestellung über sugarmoonsweets.de\n\n`;
  body += items
    .map((i) => `${i.qty}x ${i.name} (${i.size}) — ${money(i.price * i.qty)}`)
    .join("\n");
  body += `\n\nGesamt: ${money(total)}\n`;
  body += `\nName: ${customer.fn} ${customer.ln}\nE-Mail: ${customer.em}\n`;
  if (customer.ph) body += `Tel: ${customer.ph}\n`;
  body += `\nAdresse:\n${customer.ad}\n${customer.pl} ${customer.ct}\n`;
  if (customer.nt) body += `\nAnmerkung: ${customer.nt}\n`;
  // Der Client sendet erst nach gesetztem Zahlungspflicht-Häkchen (§ 312j BGB).
  body += `\nVom Kunden bestätigt: zahlungspflichtige Bestellung.\n`;
  return body;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Nicht konfiguriert — Client nutzt den mailto-Fallback.
    return NextResponse.json({ ok: false, reason: "not-configured" }, { status: 503 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid-json" }, { status: 400 });
  }
  const order = parseOrder(raw);
  if (!order) {
    return NextResponse.json({ ok: false, reason: "invalid-order" }, { status: 422 });
  }

  const to = process.env.SMS_ORDER_TO || site.email;
  const from =
    process.env.SMS_ORDER_FROM || "Sugar Moon Sweets <bestellung@sugarmoonsweets.de>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: order.customer.em,
      subject: `Bestellung — ${order.customer.fn} ${order.customer.ln}`,
      text: buildText(order.customer, order.items),
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    // Kein Kundendaten-Logging; die Ursache steht im Resend-Dashboard.
    console.error("order: resend request failed", res?.status ?? "network");
    return NextResponse.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
