import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/PageHeader";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/data/site";
import { storyImage } from "@/data/media";

export const metadata: Metadata = {
  title: "Wo wir ausstellen",
  description:
    "Triff Sugar Moon Sweets auf Märkten und Veranstaltungen rund um Fulda — und schlag uns Events vor, auf denen wir nicht fehlen sollten.",
  alternates: { canonical: "/ausstellungen" },
};

export default function AusstellungenPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    "Veranstaltungs-Vorschlag",
  )}&body=${encodeURIComponent(
    "Hallo Sugar Moon Sweets,\n\nich habe einen Vorschlag für eine Ausstellung / Veranstaltung:\n\nName der Veranstaltung:\nOrt:\nDatum:\nLink / Infos:\n\nViele Grüße",
  )}`;

  return (
    <>
      <PageHeader
        eyebrow="Unterwegs"
        title="Wo wir ausstellen"
        sub="Ihr kennt eine Ausstellung oder Veranstaltung, auf der wir nicht fehlen sollten? Sendet uns eure Vorschläge – wir freuen uns auf eure Hinweise!"
      />

      <section className="pb-28">
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

            {/* So sieht das aus: der echte Stand in Rothemann — füllt die
                vorher leere Kartenhälfte (Design-Review). */}
            <div className="relative hidden min-h-[300px] md:block">
              <Image
                src={storyImage}
                alt="Jessica und Sebastian am Sugar-Moon-Stand, Adventsmarkt Rothemann"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-night-2 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
