/**
 * Markt- und Veranstaltungstermine von Sugar Moon Sweets.
 *
 * Sämtliche Angaben stammen wörtlich vom Inhaber — von seinen Flyern oder
 * seiner Terminliste. Es wird nichts ergänzt, was dort nicht steht (Uhrzeiten,
 * Adressen und Begleittexte fehlen bewusst, solange sie nicht geliefert sind).
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
  /** Was Sugar Moon Sweets vor Ort macht — nur wenn der Inhaber einen Text
   *  geliefert hat (Flyer). Fehlt er, zeigt die Karte schlicht keinen. */
  note?: string;
  /** Programm der Veranstaltung selbst — nicht unser Angebot. */
  programme?: string[];
  flyer?: EventFlyer;
}

/** Chronologisch. */
export const events: MarketEvent[] = [
  {
    id: "keuloser-apfelweinfest-2026",
    title: "Keuloser Apfelweinfest & Heimatmarkt",
    place: "Keulos",
    // Der Flyer selbst nennt nur „20. September"; das Jahr ist durch den
    // Dateinamen der Inhaber-Vorlage belegt (Keulos 20.09.2026).
    date: "2026-09-20",
    note: "Besucht uns an unserem Stand und entdeckt unsere handgemachten Bio-Sirupe.",
    flyer: {
      src: "/media/events/keulos-apfelweinfest-2026.webp",
      alt: "Flyer zum Keuloser Apfelweinfest & Heimatmarkt am 20. September: Jessica und Sebastian am Sugar-Moon-Stand, davor Lavendel-, Vanille- und Karamellsirup und eine Tafel „Bio-Manufaktur aus Fulda“.",
      width: 1254,
      height: 1254,
    },
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
    flyer: {
      src: "/media/events/hosenfeld-tag-der-regionen-2026.webp",
      alt: "Herbstlicher Flyer zum Tag der Regionen in Hosenfeld am 27. September 2026: Herbstmarkt bei dem Blumenmädchen mit Wildgulasch, Wildbratwurst und Getränken, daneben vier Sugar-Moon-Sirupe — Lavendel, Vanille, Kürbis und Zimt.",
      width: 1024,
      height: 1536,
    },
  },

  // Ab hier: Terminliste des Inhabers (Oktober 2026), ohne Flyer und ohne
  // Begleittext — wortgetreu übernommen.
  {
    id: "voradventsverkauf-hosenfeld-2026",
    title: "Voradventsverkauf beim Blumenmädchen",
    place: "Hosenfeld",
    date: "2026-11-15",
  },
  {
    id: "adventsmarkt-villa-loewe-2026",
    title: "Adventsmarkt Villa Löwe",
    place: "Bad Brückenau",
    date: "2026-11-29",
  },
  {
    id: "weihnachtsmarkt-weintenne-2026",
    title: "Weihnachtsmarkt Weintenne",
    place: "Hammelburg",
    venue: "Weingut Müller",
    // Die Liste nennt „5 & 6 Dezember" ohne Jahr; sie steht zwischen zwei
    // 2026er-Terminen, also 2026 (DECISIONS D33).
    date: "2026-12-05",
    endDate: "2026-12-06",
  },
  {
    id: "nikolausmarkt-bad-salzschlirf-2026",
    title: "Nikolausmarkt",
    place: "Bad Salzschlirf",
    venue: "Kurpark",
    date: "2026-12-06",
  },
  {
    id: "adventsmarkt-unter-der-linde-2026",
    title: "Adventsmarkt „Unter der Linde“",
    place: "Dietershausen",
    date: "2026-12-12",
    endDate: "2026-12-13",
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

/** ISO-Datum ohne Zeitzonen-Umweg zerlegen. */
function parts(iso: string): { y: number; m: number; d: number } {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m, d };
}

function utc(iso: string): Date {
  const { y, m, d } = parts(iso);
  return new Date(Date.UTC(y, m - 1, d));
}

/** Mehrtägig? (endDate gesetzt und vom Start verschieden) */
function isRange(e: MarketEvent): e is MarketEvent & { endDate: string } {
  return Boolean(e.endDate && e.endDate !== e.date);
}

/** Zwei aufeinanderfolgende Tage schreiben wir wie der Inhaber mit „&“,
 *  längere Spannen mit Gedankenstrich. */
function joiner(e: MarketEvent & { endDate: string }): " & " | "–" {
  return utc(e.endDate).getTime() - utc(e.date).getTime() === 86_400_000 ? " & " : "–";
}

/** „20. September 2026" */
export function formatEventDate(iso: string): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(utc(iso));
}

/**
 * Datum oder Datumsspanne eines Termins:
 * „15. November 2026" · „5. & 6. Dezember 2026" · „30. November – 2. Dezember 2026"
 */
export function formatEventDates(e: MarketEvent): string {
  if (!isRange(e)) return formatEventDate(e.date);
  const a = parts(e.date);
  const b = parts(e.endDate);
  const j = joiner(e);
  if (a.y === b.y && a.m === b.m) return `${a.d}.${j}${formatEventDate(e.endDate)}`;
  const startLabel =
    a.y === b.y
      ? new Intl.DateTimeFormat("de-DE", {
          day: "numeric",
          month: "long",
          timeZone: "UTC",
        }).format(utc(e.date))
      : formatEventDate(e.date);
  return `${startLabel}${j === "–" ? " – " : j}${formatEventDate(e.endDate)}`;
}

/** „Sonntag" · „Samstag & Sonntag" — bzw. kurz „So" · „Sa & So". */
export function formatEventWeekdays(e: MarketEvent, style: "long" | "short"): string {
  const fmt = (iso: string) =>
    new Intl.DateTimeFormat("de-DE", { weekday: style, timeZone: "UTC" }).format(
      utc(iso),
    );
  if (!isRange(e)) return fmt(e.date);
  return `${fmt(e.date)}${joiner(e)}${fmt(e.endDate)}`;
}

/**
 * Inhalt des Datums-Schilds: Tag(e) und Monat. Spannen innerhalb eines
 * Monats als „5–6"; monatsübergreifende Spannen zeigen den Starttag — die
 * volle Spanne steht in der Zeile daneben.
 */
export function eventBadge(e: MarketEvent): {
  day: string;
  monthShort: string;
  range: boolean;
} {
  const a = parts(e.date);
  const monthShort = MONTHS_SHORT[a.m - 1] ?? String(a.m);
  if (isRange(e)) {
    const b = parts(e.endDate);
    if (a.y === b.y && a.m === b.m)
      return { day: `${a.d}–${b.d}`, monthShort, range: true };
  }
  return { day: String(a.d), monthShort, range: false };
}
