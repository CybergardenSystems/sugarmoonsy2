import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { MoonMark } from "@/components/brand/MoonMark";

/** Vollmond-Finale: der Tropfen ist angekommen. */
export function CTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[30rem] w-[30rem] rounded-full bg-honey/10 blur-[120px]" />
      </div>

      <div className="shell relative text-center">
        <Reveal className="flex justify-center">
          <MoonMark size={72} />
        </Reveal>
        <Reveal as="h2" delay={0.05} className="mx-auto mt-6 max-w-2xl font-display text-[clamp(2.2rem,5vw,4rem)] text-moon glow-honey">
          Bereit für deinen Lieblingssirup?
        </Reveal>
        <Reveal delay={0.1} className="lede mx-auto mt-5 max-w-md">
          Bestelle jetzt und entdecke handgemachten Genuss, den du nicht mehr missen
          möchtest.
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex justify-center">
          <MagneticButton href="/shop" variant="fill">
            Zum Shop
            <span aria-hidden>→</span>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
