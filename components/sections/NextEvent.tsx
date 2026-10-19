import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SocialRow } from "@/components/ui/SocialLinks";
import { MoonPhase } from "@/components/events/MoonPhase";
import {
  countdownLabel,
  eventBadge,
  formatEventDates,
  upcomingEvents,
} from "@/data/events";
import { moonPhase } from "@/lib/moon";
import { socialLine } from "@/data/site";

/**
 * „Wo ihr uns trefft" — der nächste Markttermin plus die Kanäle.
 *
 * Beides beantwortet dieselbe Frage (wie bleibe ich mit euch in Kontakt),
 * deshalb ein Band statt zwei Abschnitte. Ohne kommenden Termin bleibt der
 * Social-Teil stehen — die Startseite hat dann trotzdem einen Anlaufpunkt.
 */
export function NextEvent() {
  const next = upcomingEvents()[0];
  const { day, monthShort, range } = next
    ? eventBadge(next)
    : { day: "", monthShort: "", range: false };

  return (
    <section className="section-tight relative">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-honey/12 bg-night-2/60 p-8 sm:p-10">
            <div className="glow-blob -right-20 -top-20 bg-honey/5" />

            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-12">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-honey/80">
                  {next ? "Nächster Markt" : "Unterwegs"}
                </p>

                {next ? (
                  <>
                    {/* Gleiche Sprache wie der Marktkalender: großes Datum,
                        daneben der Mond dieses Tages. */}
                    <div className="mt-5 flex items-start gap-4 sm:gap-5">
                      <div
                        aria-hidden="true"
                        className="w-[3.6rem] shrink-0 text-right sm:w-[4.4rem]"
                      >
                        <span
                          className={`block whitespace-nowrap font-display leading-[0.9] tabular-nums text-honey ${
                            range
                              ? "pt-[0.3rem] text-[1.35rem] tracking-tight sm:text-[1.7rem]"
                              : "text-[2.3rem] sm:text-[2.7rem]"
                          }`}
                        >
                          {day}
                        </span>
                        <span className="mt-2 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-moon-mute">
                          {monthShort}
                        </span>
                      </div>
                      <MoonPhase
                        phase={moonPhase(next.date)}
                        glow
                        size={22}
                        className="mt-[0.55rem] sm:mt-[0.7rem]"
                      />
                      <div className="min-w-0">
                        <h2 className="text-balance font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-tight text-moon">
                          {next.title}
                        </h2>
                        <p className="mt-1.5 text-sm text-moon-dim">
                          {formatEventDates(next)} · {next.place}
                        </p>
                        <p className="mt-3 inline-flex rounded-full border border-honey/30 bg-honey/10 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-honey">
                          {countdownLabel(next)}
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/ausstellungen"
                      className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-moon-dim transition-colors hover:text-honey"
                    >
                      Alle Termine
                      <Icon name="arrow" size={15} />
                    </Link>
                  </>
                ) : (
                  <>
                    <h2 className="mt-4 text-balance font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-tight text-moon">
                      Wir sind auf Märkten rund um Fulda unterwegs
                    </h2>
                    <Link
                      href="/ausstellungen"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-moon-dim transition-colors hover:text-honey"
                    >
                      Zu den Terminen
                      <Icon name="arrow" size={15} />
                    </Link>
                  </>
                )}
              </div>

              <div className="border-t border-honey/10 pt-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <p className="text-sm leading-relaxed text-moon-dim">{socialLine}</p>
                <SocialRow className="mt-5" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
