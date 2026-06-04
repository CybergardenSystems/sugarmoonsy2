import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MoonMark } from "@/components/brand/MoonMark";
import { Icon } from "@/components/ui/Icon";

/** Vollmond-Finale: der Tropfen ist angekommen. */
export function CTA() {
  return (
    <section className="section relative overflow-hidden">
      <div className="glow-blob left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-honey/5" />

      <div className="shell relative text-center">
        <Reveal className="flex justify-center">
          <MoonMark size={72} />
        </Reveal>
        <Reveal as="h2" delay={0.05} className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] text-balance text-moon glow-honey">
          Bereit für deinen Lieblingssirup?
        </Reveal>
        <Reveal delay={0.1} className="lede mx-auto mt-5 max-w-md text-balance">
          Bestelle jetzt und entdecke handgemachten Genuss, den du nicht mehr missen
          möchtest.
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex justify-center">
          <MagneticButton href="/shop" variant="fill">
            Zum Shop
            <Icon name="arrow" size={16} aria-hidden />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
