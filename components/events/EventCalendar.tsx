import Image from "next/image";
import type { CSSProperties } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { MoonPhase } from "@/components/events/MoonPhase";
import {
  countdownLabel,
  eventBadge,
  formatEventDates,
  formatEventWeekdays,
  groupByMonth,
  type MarketEvent,
} from "@/data/events";
import { moonPhase } from "@/lib/moon";

/**
 * Der Marktkalender: kommende Termine nach Monaten gebündelt, jeder Monat ein
 * Kapitel mit eigener goldener Zeitleiste. Auf der Leiste sitzt pro Termin der
 * Mond — in der Phase, in der er an diesem Tag tatsächlich am Himmel steht
 * (`lib/moon.ts`). Das ist das eine Detail, das nur diese Marke haben kann.
 *
 * Bewusst keine Karten pro Termin: Die Zeitleiste trägt die Struktur, das
 * Datum steht groß in einer eigenen Spalte wie in einem gedruckten
 * Almanach. Flyer, Begleittext und Programm erscheinen nur, wenn der Inhaber
 * sie geliefert hat.
 */

// Spaltenmaße als CSS-Variablen, damit die Zeitleiste exakt durch die
// Mitte der Mond-Spalte läuft — auf jeder Breite.
const COLUMNS = {
  "--date": "3.6rem",
  "--node": "1.5rem",
  "--gap": "0.9rem",
} as CSSProperties;

export function EventCalendar({ events }: { events: MarketEvent[] }) {
  const months = groupByMonth(events);
  const nextId = events[0]?.id;

  return (
    <div className="flex flex-col gap-14 sm:gap-20">
      {months.map((m) => (
        <Reveal key={m.key}>
          <section
            aria-labelledby={`monat-${m.key}`}
            className="grid gap-x-14 gap-y-6 md:grid-cols-[13rem_minmax(0,1fr)]"
          >
            <header className="md:sticky md:top-32 md:self-start">
              <h2
                id={`monat-${m.key}`}
                className="font-display text-[clamp(2.2rem,3.6vw,2.8rem)] italic leading-none text-moon"
              >
                {m.month}
              </h2>
              <p className="mt-3 font-mono text-[0.64rem] uppercase tracking-[0.22em] text-moon-mute">
                {m.year} ·{" "}
                {m.events.length === 1 ? "1 Termin" : `${m.events.length} Termine`}
              </p>
            </header>

            <ol
              className="relative sm:[--date:5.75rem] sm:[--gap:1.4rem] sm:[--node:2rem]"
              style={COLUMNS}
            >
              {/* Zeitleiste: beginnt am ersten Mond, läuft am Monatsende aus. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 top-[2.45rem] w-px -translate-x-1/2 bg-gradient-to-b from-honey/50 via-honey/20 to-transparent"
                style={{ left: "calc(var(--date) + var(--gap) + var(--node) / 2)" }}
              />
              {m.events.map((e) => (
                <EventEntry key={e.id} event={e} next={e.id === nextId} />
              ))}
            </ol>
          </section>
        </Reveal>
      ))}
    </div>
  );
}

function EventEntry({ event, next }: { event: MarketEvent; next: boolean }) {
  const { day, range } = eventBadge(event);
  const hasExtras = Boolean(event.note || event.programme?.length || event.flyer);

  return (
    <li className="relative grid grid-cols-[var(--date)_var(--node)_minmax(0,1fr)] gap-x-[var(--gap)] pb-9 pt-6 last:pb-2">
      {next && (
        // Der nächste Termin bekommt einen Lichthof um seinen Mond — läuft zu
        // allen Seiten weich aus (closest-side), keine sichtbare Kante.
        <div
          aria-hidden="true"
          className="pointer-events-none absolute h-[13rem] w-[min(30rem,92vw)] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(232,178,94,0.14),transparent)]"
          style={{
            left: "calc(var(--date) + var(--gap) + var(--node) / 2)",
            top: "2.6rem",
          }}
        />
      )}

      {/* Datum — groß, wie im Almanach. Für Screenreader steht es ausgeschrieben im Inhalt. */}
      <div aria-hidden="true" className="relative text-right">
        <span
          className={`block whitespace-nowrap font-display leading-[0.9] tabular-nums text-honey ${
            range
              ? "pt-[0.3rem] text-[1.3rem] tracking-tight sm:text-[1.75rem]"
              : "text-[2.1rem] sm:text-[2.85rem]"
          }`}
        >
          {day}
        </span>
        <span className="mt-2 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-moon-mute">
          {formatEventWeekdays(event, "short")}
        </span>
      </div>

      {/* Mond-Knoten auf der Zeitleiste */}
      <div className="relative flex justify-center pt-[0.55rem] sm:pt-[0.7rem]">
        <MoonPhase phase={moonPhase(event.date)} glow={next} size={next ? 24 : 20} />
      </div>

      <div className="relative min-w-0">
        <p className="sr-only">
          {formatEventWeekdays(event, "long")}, {formatEventDates(event)}
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0">
            <h3 className="text-balance font-display text-[clamp(1.2rem,2.2vw,1.65rem)] leading-tight text-moon">
              {event.title}
            </h3>
            <p className="mt-2 flex items-start gap-1.5 text-sm text-moon-dim">
              <Icon name="pin" size={15} className="mt-0.5 shrink-0 text-honey/70" />
              <span>
                {event.place}
                {event.venue && <span className="text-moon-mute"> · {event.venue}</span>}
              </span>
            </p>
            {next && (
              <p className="mt-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-honey/30 bg-honey/10 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-honey sm:tracking-[0.2em]">
                Nächster Termin · {countdownLabel(event)}
              </p>
            )}
          </div>

          <a
            href={`/api/kalender/${event.id}`}
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-honey/15 px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-moon-dim transition-colors hover:border-honey/50 hover:text-honey"
          >
            <Icon name="calendar" size={14} />
            Termin merken
          </a>
        </div>

        {hasExtras && (
          <div className="mt-5 flex flex-col gap-5">
            {event.note && (
              <p className="max-w-xl text-[0.98rem] leading-relaxed text-moon-dim">
                {event.note}
              </p>
            )}

            {event.programme && event.programme.length > 0 && (
              <div>
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-moon-mute">
                  Beim Fest außerdem
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {event.programme.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-honey/12 bg-night-3/40 px-3 py-1.5 text-[0.78rem] text-moon-dim"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.flyer && (
              // Flyer sind textlastig: nie beschneiden, Klick öffnet die volle Auflösung.
              <a
                href={event.flyer.src}
                target="_blank"
                rel="noreferrer noopener"
                className="block w-full max-w-[15rem] overflow-hidden rounded-xl border border-honey/12 transition-colors hover:border-honey/40"
                aria-label={`Flyer „${event.title}" in voller Größe öffnen (neuer Tab)`}
              >
                <Image
                  src={event.flyer.src}
                  alt={event.flyer.alt}
                  width={event.flyer.width}
                  height={event.flyer.height}
                  sizes="15rem"
                  className="h-auto w-full"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
