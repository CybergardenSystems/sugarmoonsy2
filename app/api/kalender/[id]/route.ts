import { events, getEvent } from "@/data/events";
import { site } from "@/data/site";

/**
 * „Termin merken" — liefert einen Kalendereintrag (iCalendar/RFC 5545) zum
 * Markt-Termin. Ganztägig, ohne Uhrzeit: Die Flyer nennen keine, und eine
 * erfundene Uhrzeit im Kalender des Kunden wäre schlimmer als keine.
 *
 * Statisch vorgerendert — die Termine ändern sich nur mit einem Deploy.
 */

export const dynamic = "force-static";

export function generateStaticParams() {
  return events.map((e) => ({ id: e.id }));
}

/** TEXT-Werte escapen (RFC 5545 §3.3.11). */
function esc(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Zeilen auf 75 Oktette falten; Folgezeilen beginnen mit einem Leerzeichen. */
function fold(line: string): string {
  const enc = new TextEncoder();
  if (enc.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = "";
  let bytes = 0;
  for (const char of line) {
    const size = enc.encode(char).length;
    if (bytes + size > 75) {
      parts.push(current);
      current = " ";
      bytes = 1;
    }
    current += char;
    bytes += size;
  }
  parts.push(current);
  return parts.join("\r\n");
}

/** "2026-09-20" → "20260920" */
function icsDate(iso: string): string {
  return iso.replace(/-/g, "");
}

/** Ganztägige Termine enden am Folgetag (DTEND ist exklusiv). */
function dayAfter(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  return icsDate(next.toISOString().slice(0, 10));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = getEvent(id);

  if (!event) {
    return new Response("Termin nicht gefunden", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const location = [event.venue, event.place].filter(Boolean).join(", ");
  const url = `${site.url}/ausstellungen`;
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${site.name}//Termine//DE`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.id}@${site.domain}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${icsDate(event.date)}`,
    `DTEND;VALUE=DATE:${dayAfter(event.endDate ?? event.date)}`,
    `SUMMARY:${esc(`${site.name} — ${event.title}`)}`,
    `LOCATION:${esc(location)}`,
    `DESCRIPTION:${esc(`${event.note}\n\nAlle Termine: ${url}`)}`,
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const body = lines.map(fold).join("\r\n") + "\r\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="sugar-moon-sweets-${event.id}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
