import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/ui/Icon";
import { SocialPanel } from "@/components/ui/SocialLinks";
import { EventCard } from "@/components/events/EventCard";
import { site } from "@/data/site";
import { storyImage } from "@/data/media";
import { formatEventDate, pastEvents, upcomingEvents } from "@/data/events";

export const metadata: Metadata = {
  title: "Termine & Märkte",
  description:
    "Hier trefft ihr Sugar Moon Sweets: kommende Märkte und Veranstaltungen rund um Fulda — und schlagt uns Events vor, auf denen wir nicht fehlen sollten.",
  alternates: { canonical: "/ausstellungen" },
};

/**
 * Die Liste filtert nach dem heutigen Datum. Damit ein abgelaufener Termin
 * auch ohne Deploy verschwindet, wird die Seite stündlich neu erzeugt.
 */
export const revalidate = 3600;

export default function AusstellungenPage() {
  const upcoming = upcomingEvents();
  const past = pastEvents();

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Veranstaltungs-Vorschlag",
  )}&body=${encodeURIComponent(
    "Hallo Sugar Moon Sweets,\n\nich habe einen Vorschlag für eine Ausstellung / Veranstaltung:\n\nName der Veranstaltung:\nOrt:\nDatum:\nLink / Infos:\n\nViele Grüße",
  )}`;

  const jsonLd = upcoming.map((e) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    endDate: e.endDate ?? e.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: e.note,
    location: {
      "@type": "Place",
      name: e.venue ?? e.place,
      address: {
        "@type": "PostalAddress",
        addressLocality: e.place,
        addressCountry: "DE",
      },
    },
  }));

  return (
    <>
      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}

      <PageHeader
        eyebrow="Unterwegs"
        title="Termine & Märkte"
        sub="Am liebsten treffen wir euch persönlich — hier steht, wo unser Stand als Nächstes aufgebaut ist."
      />

      <section className="pb-20">
        <div className="shell">
          {upcoming.length > 0 ? (
            <>
              <h2 className="sr-only">Kommende Termine</h2>
              <div className="flex flex-col gap-6">
                {upcoming.map((e, i) => (
                  <EventCard key={e.id} event={e} highlighted={i === 0} />
                ))}
              </div>
              <p className="mx-auto mt-6 max-w-lg text-center text-[0.82rem] leading-relaxed text-moon-mute">
                Angaben ohne Gewähr — kurzfristige Änderungen kündigen wir auf unseren
                Kanälen an.
              </p>
            </>
          ) : (
            <div className="rounded-2xl border border-honey/12 bg-night-2/60 p-10 text-center">
              <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] text-moon">
                Gerade ist kein Termin geplant
              </h2>
              <p className="lede mx-auto mt-3 max-w-md text-balance">
                Sobald der nächste Markt feststeht, steht er hier — und zuerst auf
                Instagram und Facebook.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="shell">
          <SocialPanel />
        </div>
      </section>

      <section className="pb-20">
        <div className="shell">
          <div className="relative grid overflow-hidden rounded-2xl border border-honey/12 bg-night-2/60 md:grid-cols-[1.05fr_0.95fr]">
            <div className="glow-blob -right-10 -top-10 bg-honey/5" />
            <div className="relative p-8 sm:p-12">
              <h2 className="text-balance font-display text-[clamp(1.6rem,3vw,2.2rem)] text-moon">
                Schlag uns ein Event vor
              </h2>
              <p className="lede mt-4">
                Markt, Hoffest, Adventsmarkt oder Pop-up — wenn du eine Veranstaltung rund
                um Fulda kennst, auf der unsere Bio-Sirupe gut aufgehoben wären, schreib
                uns einfach. Jeder Hinweis hilft.
              </p>
              <div className="mt-8">
                <MagneticButton href={mailto} variant="fill">
                  Vorschlag senden
                  <Icon name="arrow" size={16} aria-hidden />
                </MagneticButton>
              </div>
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-wide text-moon-mute">
                Oder direkt: {site.email}
              </p>
            </div>

            {/* So sieht das aus: der echte Marktstand — füllt die vorher
                leere Kartenhälfte (Design-Review). Bildunterschrift/Alt
                bewusst ohne Ortsangabe, damit sie zu jedem Stand-Foto passt
                (Inhaber-Entscheidung). */}
            <div className="relative hidden min-h-[300px] md:block">
              <Image
                src={storyImage}
                alt="Jessica und Sebastian am Sugar-Moon-Marktstand"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night-2 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {past.length > 0 && (
        <section className="pb-28">
          <div className="shell">
            <h2 className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-moon-mute">
              Da waren wir schon
            </h2>
            <ul className="mt-5 divide-y divide-honey/8 border-y border-honey/8">
              {past.map((e) => (
                <li
                  key={e.id}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                >
                  <span className="text-sm text-moon-dim">
                    {e.title}
                    <span className="text-moon-mute"> · {e.place}</span>
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-wide text-moon-mute">
                    {formatEventDate(e.date)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
