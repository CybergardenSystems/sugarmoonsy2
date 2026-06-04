import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { reviews } from "@/lib/reviews";

export function Reviews() {
  return (
    <section id="bewertungen" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          center
          eyebrow="Kundenstimmen"
          title="Was unsere Kunden sagen"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal
              key={r.author}
              delay={i * 0.1}
              className="relative rounded-2xl border border-honey/10 bg-night-2/60 p-7"
            >
              <span
                aria-hidden
                className="absolute right-5 top-3 font-display text-5xl leading-none text-honey/15"
              >
                &rdquo;
              </span>
              <div className="text-honey" aria-label="5 von 5 Sternen">
                ★★★★★
              </div>
              <p className="mt-4 font-display text-[1.05rem] italic leading-relaxed text-moon-dim">
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
