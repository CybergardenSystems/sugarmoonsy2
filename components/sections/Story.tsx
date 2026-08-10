import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { stats } from "@/data/site";
import { storyImage } from "@/data/media";

export function Story({ full = false }: { full?: boolean }) {
  return (
    <section id="story" className="section relative overflow-hidden">
      <div className="glow-blob left-1/2 top-0 -translate-x-1/2 bg-honey/[0.04]" />
      <div className="shell relative grid items-center gap-10 sm:gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow">Unsere Geschichte</span>
          </Reveal>
          <Reveal
            as="h2"
            delay={0.05}
            className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] text-moon"
          >
            Von einer Küche in Fulda in eure Tassen
          </Reveal>

          <div className="mt-6 space-y-4 text-[0.96rem] leading-relaxed text-moon-dim">
            <Reveal as="p" delay={0.1}>
              Ich bin <strong className="font-medium text-honey">Jessica</strong>, eine
              Amerikanerin, die der Liebe wegen nach Fulda kam. Mein Mann{" "}
              <strong className="font-medium text-honey">Sebastian</strong> ist
              waschechter Deutscher — praktisch, gründlich und voller Ideen.
            </Reveal>
            <Reveal as="p" delay={0.15}>
              Als ich eines Herbstmorgens vergeblich nach einem Pumpkin Spice Latte
              suchte, begann ich zu experimentieren. Sebastian dachte größer:{" "}
              <em className="text-moon">
                „Was, wenn wir diesen Geschmack mit anderen teilen?“
              </em>
            </Reveal>
            <Reveal as="p" delay={0.2}>
              Heute bringen wir mit handgemachten Sirups viele kreative
              Geschmacksrichtungen nach Fulda — und darüber hinaus.
            </Reveal>
            {full && (
              <Reveal as="p" delay={0.25}>
                Jede Flasche entsteht in kleinen Chargen, von Hand abgefüllt und mit
                unserem Mond-Etikett versehen. Bio-zertifiziert, saisonal gedacht, ohne
                künstliche Zusätze — so, wie wir es selbst trinken möchten.
              </Reveal>
            )}
          </div>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="relative overflow-hidden rounded-2xl border border-honey/12">
            <div className="relative aspect-[4/3] bg-night-3">
              <Image
                src={storyImage}
                alt="Jessica und Sebastian von Sugar Moon Sweets an ihrem Stand auf dem Adventsmarkt in Fulda"
                fill
                sizes="(max-width:1024px) 100vw, 560px"
                className="object-cover object-center"
              />
              {/* sanfter Scrim, damit das helle Foto zum dunklen Look passt */}
              <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-night/20" />
            </div>
            <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 border-t border-honey/15 bg-night/70 backdrop-blur-md">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-3 py-4 text-center ${i < 2 ? "border-r border-honey/10" : ""}`}
                >
                  <span className="block font-display text-2xl text-honey">
                    {s.value}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.58rem] uppercase tracking-wide text-moon-mute">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-wide text-moon-mute">
            Jessica &amp; Sebastian · Adventsmarkt Fulda
          </p>
        </Reveal>
      </div>
    </section>
  );
}
