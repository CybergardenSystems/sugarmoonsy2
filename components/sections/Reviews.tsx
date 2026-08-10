import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, Stars } from "@/components/ui/Icon";
import { reviews } from "@/lib/reviews";

export function Reviews() {
  return (
    <section id="bewertungen" className="section relative">
      <div className="shell">
        <SectionHeading center eyebrow="Kundenstimmen" title="Was unsere Kunden sagen" />

        <div className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              key={r.author}
              delay={i * 0.1}
              className="relative rounded-2xl border border-white/5 bg-night-2/60 p-6 transition-colors duration-300 hover:border-honey/20 sm:p-7"
            >
              <Icon
                name="quote"
                size={40}
                className="absolute right-5 top-5 text-honey/15"
              />
              <Stars className="text-honey" />
              <p className="mt-4 font-display text-[1.05rem] italic leading-relaxed text-balance text-moon-dim">
                {r.text}
              </p>
              <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-wide text-moon-mute">
                — {r.author}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
