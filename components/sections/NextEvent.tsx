import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { SocialRow } from "@/components/ui/SocialLinks";
import { dateParts, formatEventDate, upcomingEvents } from "@/data/events";
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
  const { day, monthShort } = next ? dateParts(next.date) : { day: "", monthShort: "" };

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
                    <div className="mt-4 flex gap-5">
                      <div
                        className="flex h-[4.4rem] w-[3.9rem] shrink-0 flex-col items-center justify-center rounded-xl border border-honey/20 bg-night-3/60"
                        aria-hidden="true"
                      >
                        <span className="font-display text-[1.8rem] leading-none text-honey">
                          {day}
                        </span>
                        <span className="mt-1 font-mono text-[0.56rem] uppercase tracking-[0.18em] text-moon-mute">
                          {monthShort}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-balance font-display text-[clamp(1.3rem,2.6vw,1.9rem)] leading-tight text-moon">
                          {next.title}
                        </h2>
                        <p className="mt-1.5 text-sm text-moon-dim">
                          {formatEventDate(next.date)} · {next.place}
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
