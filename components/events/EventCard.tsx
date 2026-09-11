import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import {
  dateParts,
  formatEventDate,
  formatEventWeekday,
  formatEventWeekdayShort,
  type MarketEvent,
} from "@/data/events";

/**
 * Eine Markt-/Veranstaltungskarte.
 *
 * Das Datum trägt die Karte, deshalb steht es als eigenes Schild links —
 * nicht als Dekoration, sondern weil es die Information ist, nach der man auf
 * dieser Seite sucht. Der Flyer ist optional: Ohne ihn ist die Karte
 * vollständig, mit ihm bekommt sie eine zweite Spalte.
 */
export function EventCard({
  event,
  highlighted = false,
  past = false,
}: {
  event: MarketEvent;
  /** Erster kommender Termin — bekommt die Marke „Nächster Termin". */
  highlighted?: boolean;
  /** Bereits gelaufen: ruhiger, ohne Kalender-Link. */
  past?: boolean;
}) {
  const { day, monthShort } = dateParts(event.date);

  return (
    <article
      className={`relative grid overflow-hidden rounded-2xl border bg-night-2/60 ${
        highlighted ? "border-honey/30" : "border-honey/12"
      } ${event.flyer ? "md:grid-cols-[1.15fr_0.85fr]" : ""} ${past ? "opacity-70" : ""}`}
    >
      {highlighted && <div className="glow-blob -right-16 -top-16 bg-honey/6" />}

      <div className="relative p-7 sm:p-9">
        {highlighted && (
          <span className="mb-5 inline-block rounded-full border border-honey/35 bg-honey/10 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-honey">
            Nächster Termin
          </span>
        )}

        <div className="flex gap-5">
          <div
            className="flex h-[4.6rem] w-[4.1rem] shrink-0 flex-col items-center justify-center rounded-xl border border-honey/20 bg-night-3/60"
            aria-hidden="true"
          >
            <span className="font-display text-[1.85rem] leading-none text-honey">
              {day}
            </span>
            <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-moon-mute">
              {monthShort}
            </span>
          </div>

          <div className="min-w-0">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-moon-mute sm:tracking-[0.2em]">
              <span className="sm:hidden">{formatEventWeekdayShort(event.date)}</span>
              <span className="hidden sm:inline">{formatEventWeekday(event.date)}</span>
              {" · "}
              {formatEventDate(event.date)}
            </p>
            <h3 className="mt-2 text-balance font-display text-[clamp(1.25rem,2.3vw,1.7rem)] leading-tight text-moon">
              {event.title}
            </h3>
            <p className="mt-2 flex items-start gap-1.5 text-sm text-moon-dim">
              <Icon name="pin" size={15} className="mt-0.5 shrink-0 text-honey/70" />
              <span>
                {event.place}
                {event.venue && (
                  <>
                    {" · "}
                    <span className="text-moon-mute">{event.venue}</span>
                  </>
                )}
              </span>
            </p>
          </div>
        </div>

        <p className="lede mt-6">{event.note}</p>

        {event.programme && event.programme.length > 0 && (
          <div className="mt-6 border-t border-honey/10 pt-5">
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-moon-mute">
              Beim Fest außerdem
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
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

        {!past && (
          <a
            href={`/api/kalender/${event.id}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-honey/20 px-4 py-2.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-moon-dim transition-colors hover:border-honey/50 hover:text-honey"
          >
            <Icon name="calendar" size={15} />
            Termin merken
          </a>
        )}
      </div>

      {event.flyer && (
        /* Die Flyer haben unterschiedliche Formate (quadratisch / hochkant) und
           sind textlastig — deshalb nie beschneiden, sondern vollständig auf
           dunklem Grund zeigen. Klick öffnet die volle Auflösung. */
        <div className="relative flex items-center justify-center border-t border-honey/10 bg-night-3/30 p-6 md:border-l md:border-t-0">
          <a
            href={event.flyer.src}
            target="_blank"
            rel="noreferrer noopener"
            className="block w-full max-w-[22rem] overflow-hidden rounded-xl border border-honey/12 transition-colors hover:border-honey/40"
            aria-label={`Flyer „${event.title}" in voller Größe öffnen (neuer Tab)`}
          >
            <Image
              src={event.flyer.src}
              alt={event.flyer.alt}
              width={event.flyer.width}
              height={event.flyer.height}
              sizes="(min-width: 768px) 22rem, 100vw"
              className="h-auto w-full"
            />
          </a>
        </div>
      )}
    </article>
  );
}
