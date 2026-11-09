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

/** Öffnungszeit an einem Markttag — nur, wenn der Inhaber sie genannt hat. */
export interface EventHours {
  /** ISO-Datum des Markttags. */
  date: string;
  /** „15:00" */
  from: string;
  /** „21:00" — fehlt bei „ab 13 Uhr". */
  to?: string;
}

export interface MarketEvent {
  id: string;
  /** Name der Veranstaltung, wie auf dem Flyer. */
  title: string;
  /** Ort — nur so genau, wie der Inhaber ihn genannt hat. Fehlt er, steht
   *  keiner da (lieber kein Ort als ein geratener). */
  place?: string;
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
  /** Uhrzeiten je Markttag. Ohne Angabe bleibt der Termin ganztägig. */
  hours?: EventHours[];
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

  // Ab hier: Terminlisten des Inhabers (Oktober und November 2026), ohne
  // Flyer und ohne Begleittext — wortgetreu übernommen. Uhrzeiten nur dort,
  // wo der Inhaber sie genannt hat (Liste vom November, DECISIONS D36).
  {
    // Der Inhaber nennt nur den Veranstalter, keinen Ort — bleibt leer, bis
    // er ihn liefert.
    id: "n4-events-adventsmarkt-2026",
    title: "N4 Events Adventsmarkt",
    date: "2026-11-14",
    endDate: "2026-11-15",
    hours: [
      { date: "2026-11-14", from: "15:00", to: "21:00" },
      { date: "2026-11-15", from: "12:00", to: "19:00" },
    ],
  },
  {
    id: "voradventsverkauf-hosenfeld-2026",
    title: "Voradventsverkauf beim Blumenmädchen",
    place: "Hosenfeld",
    date: "2026-11-15",
  },
  {
    // „ab 13 Uhr" — ein Ende nennt der Inhaber nicht. Ort: nur das
    // Restaurant, keine Gemeinde (DECISIONS D36).
    id: "wald-weihnachtsmarkt-kneshecke-2026",
    title: "10. Wald-Weihnachtsmarkt",
    venue: "Grillrestaurant Kneshecke",
    date: "2026-11-21",
    hours: [{ date: "2026-11-21", from: "13:00" }],
  },
  {
    // Inhaber: „Wildpark Gersfeld Weihnachtsmarkt" — aufgeteilt wie beim
    // Nikolausmarkt im Kurpark: Titel, Ort, Veranstaltungsort.
    id: "weihnachtsmarkt-wildpark-gersfeld-2026",
    title: "Weihnachtsmarkt",
    place: "Gersfeld",
    venue: "Wildpark",
    date: "2026-11-28",
    endDate: "2026-11-29",
    hours: [
      { date: "2026-11-28", from: "11:00", to: "19:00" },
      { date: "2026-11-29", from: "11:00", to: "19:00" },
    ],
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

/**
 * „In 27 Tagen" · „Morgen" · „Heute" · „Läuft gerade" — für den nächsten
 * Termin. Stimmt tagesgenau, weil die Seiten stündlich neu erzeugt werden.
 */
export function countdownLabel(e: MarketEvent): string {
  const today = utc(berlinToday()).getTime();
  const start = utc(e.date).getTime();
  const end = utc(e.endDate ?? e.date).getTime();
  if (today > start && today <= end) return "Läuft gerade";
  const days = Math.round((start - today) / 86_400_000);
  if (days <= 0) return "Heute";
  if (days === 1) return "Morgen";
  return `In ${days} Tagen`;
}

/**
 * Ort für Fließtext und Kalender: „Hammelburg · Weingut Müller",
 * „Grillrestaurant Kneshecke" — oder `undefined`, wenn keiner genannt ist.
 */
export function eventLocation(
  e: MarketEvent,
): { primary: string; secondary?: string } | undefined {
  if (e.place) return { primary: e.place, secondary: e.venue };
  if (e.venue) return { primary: e.venue };
  return undefined;
}

/** Alle Markttage eines Termins als ISO-Daten. */
export function eventDays(e: MarketEvent): string[] {
  const days: string[] = [];
  const end = utc(lastDay(e)).getTime();
  for (let t = utc(e.date).getTime(); t <= end; t += 86_400_000) {
    days.push(new Date(t).toISOString().slice(0, 10));
  }
  return days;
}

/** „15:00" → „15", „15:30" → „15:30" */
function clock(time: string): string {
  return time.endsWith(":00") ? String(Number(time.slice(0, 2))) : time.replace(/^0/, "");
}

function hoursLabel(h: EventHours): string {
  return h.to ? `${clock(h.from)}–${clock(h.to)} Uhr` : `ab ${clock(h.from)} Uhr`;
}

/**
 * Uhrzeiten in Abschnitten — oder `undefined`, wenn keine genannt sind:
 * ["ab 13 Uhr"] · ["15–21 Uhr"] · ["an beiden Tagen 11–19 Uhr"] ·
 * ["Sa 15–21 Uhr", "So 12–19 Uhr"]. Die Anzeige bricht nur zwischen
 * Abschnitten um, nie mitten in einer Zeitangabe.
 */
export function eventHoursSegments(e: MarketEvent): string[] | undefined {
  const hours = e.hours ?? [];
  if (hours.length === 0) return undefined;

  const labels = hours.map(hoursLabel);
  const allDays = eventDays(e);
  const coversAll = allDays.every((d) => hours.some((h) => h.date === d));
  if (labels.length === 1 && allDays.length === 1) return labels;
  if (coversAll && labels.every((l) => l === labels[0])) {
    return [`${allDays.length === 2 ? "an beiden Tagen" : "täglich"} ${labels[0]}`];
  }

  const weekday = new Intl.DateTimeFormat("de-DE", { weekday: "short", timeZone: "UTC" });
  return hours.map(
    (h, i) => `${weekday.format(utc(h.date)).replace(".", "")} ${labels[i]}`,
  );
}

/** Dieselben Uhrzeiten als eine Zeile: „Sa 15–21 Uhr · So 12–19 Uhr". */
export function formatEventHours(e: MarketEvent): string | undefined {
  return eventHoursSegments(e)?.join(" · ");
}

/** UTC-Versatz in Berlin an diesem Tag (Mittag), z. B. „+01:00". */
export function berlinOffset(iso: string): string {
  const { y, m, d } = parts(iso);
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(Date.UTC(y, m - 1, d, 12)))
    .find((p) => p.type === "timeZoneName")?.value;
  const offset = name?.replace("GMT", "");
  return offset ? offset : "+00:00";
}

/** Berliner Ortszeit („2026-11-14", „15:00") als ISO-8601 mit Versatz. */
export function berlinDateTime(iso: string, time: string): string {
  return `${iso}T${time}:00${berlinOffset(iso)}`;
}

/**
 * Beginn und Ende für strukturierte Daten: mit Uhrzeit, wo eine genannt ist,
 * sonst reines Datum. „ab 13 Uhr" hat kein Ende — dann fehlt `end`, statt
 * eines Datums, das vor dem Beginn zu liegen scheint.
 */
export function eventSpan(e: MarketEvent): { start: string; end?: string } {
  const first = e.hours?.find((h) => h.date === e.date);
  const last = e.hours?.find((h) => h.date === lastDay(e));
  return {
    start: first ? berlinDateTime(first.date, first.from) : e.date,
    end: last ? (last.to ? berlinDateTime(last.date, last.to) : undefined) : lastDay(e),
  };
}

export interface EventMonth {
  /** „2026-11" */
  key: string;
  /** „November" */
  month: string;
  year: string;
  events: MarketEvent[];
}

/** Termine nach Startmonat bündeln — Reihenfolge der Eingabe bleibt erhalten. */
export function groupByMonth(list: MarketEvent[]): EventMonth[] {
  const groups = new Map<string, EventMonth>();
  for (const e of list) {
    const key = e.date.slice(0, 7);
    let group = groups.get(key);
    if (!group) {
      group = {
        key,
        month: new Intl.DateTimeFormat("de-DE", {
          month: "long",
          timeZone: "UTC",
        }).format(utc(e.date)),
        year: e.date.slice(0, 4),
        events: [],
      };
      groups.set(key, group);
    }
    group.events.push(e);
  }
  return [...groups.values()];
}
