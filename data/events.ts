/**
 * Markt- und Veranstaltungstermine von Sugar Moon Sweets.
 *
 * Sämtliche Angaben stammen wörtlich von den Flyern des Inhabers — es wird
 * nichts ergänzt, was dort nicht steht (Ortsteile, Uhrzeiten, Adressen fehlen
 * bewusst, solange sie nicht belegt sind).
 *
 * Vergangene Termine fallen automatisch aus der Liste; die Seite
 * `/ausstellungen` revalidiert dafür stündlich (siehe `revalidate` dort).
 */

export interface EventFlyer {
  /** Pfad unter /public — Bild wird unbeschnitten (`object-contain`) gezeigt. */
  src: string;
  alt: string;
  /** Echte Pixelmaße der Datei (für next/image; verhindert Layout-Shift). */
  width: number;
  height: number;
}

export interface MarketEvent {
  id: string;
  /** Name der Veranstaltung, wie auf dem Flyer. */
  title: string;
  /** Ort — nur so genau, wie der Flyer es hergibt. */
  place: string;
  /** Genauerer Veranstaltungsort, falls auf dem Flyer genannt. */
  venue?: string;
  /** ISO-Datum (Europe/Berlin gedacht), ganztägig. */
  date: string;
  /** Mehrtägig: letzter Tag, sonst weglassen. */
  endDate?: string;
  /** Was Sugar Moon Sweets vor Ort macht (Flyer-Text). */
  note: string;
  /** Programm der Veranstaltung selbst — nicht unser Angebot. */
  programme?: string[];
  flyer?: EventFlyer;
}

/**
 * Chronologisch. Beim Apfelweinfest nennt der Flyer nur „20. September" ohne
 * Jahr; angesetzt ist der nächste passende Termin (2026) — vom Inhaber zu
 * bestätigen (DECISIONS D31).
 */
export const events: MarketEvent[] = [
  {
    id: "keuloser-apfelweinfest-2026",
    title: "Keuloser Apfelweinfest & Heimatmarkt",
    place: "Keulos",
    date: "2026-09-20",
    note: "Besucht uns an unserem Stand und entdeckt unsere handgemachten Bio-Sirupe.",
  },
  {
    id: "tag-der-regionen-hosenfeld-2026",
    title: "Tag der Regionen",
    place: "Hosenfeld",
    venue: "Herbstmarkt bei dem Blumenmädchen",
    date: "2026-09-27",
    note: "Probieren, genießen, verlieben — unsere Bio-Sirupe zum Testen direkt am Stand.",
    programme: [
      "Herbstmarkt bei dem Blumenmädchen",
      "Wildgulasch mit Klößen und Rotkraut",
      "Wildbratwurst",
      "Getränke",
    ],
  },
];

/** Tagesgenauer Vergleich in Europe/Berlin — ein Termin bleibt bis Tagesende stehen. */
function berlinToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Letzter Tag, an dem ein Termin noch als „läuft" gilt. */
function lastDay(e: MarketEvent): string {
  return e.endDate ?? e.date;
}

/** Heute und später, chronologisch. */
export function upcomingEvents(): MarketEvent[] {
  const today = berlinToday();
  return events
    .filter((e) => lastDay(e) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Bereits gelaufen, jüngster zuerst. */
export function pastEvents(): MarketEvent[] {
  const today = berlinToday();
  return events
    .filter((e) => lastDay(e) < today)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getEvent(id: string): MarketEvent | undefined {
  return events.find((e) => e.id === id);
}

const MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mär",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
];

/** Zerlegt das ISO-Datum ohne Date-Objekt — keine Zeitzonen-Überraschungen. */
export function dateParts(iso: string): {
  day: string;
  monthShort: string;
  year: string;
} {
  const [year, month, day] = iso.split("-");
  return {
    day,
    monthShort: MONTHS_SHORT[Number(month) - 1] ?? month,
    year,
  };
}

/** „20. September 2026" */
export function formatEventDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/** „Samstag" — für die Zeile über dem Titel. */
export function formatEventWeekday(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/** „Sa" — damit die Meta-Zeile auf schmalen Displays einzeilig bleibt. */
export function formatEventWeekdayShort(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
