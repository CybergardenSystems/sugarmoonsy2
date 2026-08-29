import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { usps } from "@/data/site";

/** Mondphasen-Symbol pro USP (waxing → full = die saisonale Reise). */
function PhaseGlyph({ phase }: { phase: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke="#E8B25E"
        strokeWidth="1"
        opacity="0.35"
      />
      {phase === "new" && (
        <path
          d="M28 9 A15 15 0 1 0 31 28"
          fill="none"
          stroke="#E8B25E"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
      {phase === "half" && (
        <path d="M20 5 A15 15 0 0 1 20 35 Z" fill="#E8B25E" opacity="0.9" />
      )}
      {phase === "full" && <circle cx="20" cy="20" r="13" fill="#E8B25E" opacity="0.9" />}
    </svg>
  );
}

export function Manifest() {
  return (
    <section className="section relative">
      <div className="shell">
        <SectionHeading
          eyebrow="Warum Sugar Moon"
          title="Genuss, dem du vertrauen kannst"
          sub="Drei Versprechen, so verlässlich wie der Lauf des Mondes — von der Bio-Zutat bis zur saisonalen Kreation."
        />

        <div className="mt-10 grid gap-3 sm:mt-14 sm:gap-5 md:grid-cols-3">
          {usps.map((u, i) => (
            <Reveal
              key={u.title}
              delay={i * 0.1}
              className="group rounded-2xl border border-white/5 bg-night-2/60 p-6 transition-colors duration-300 hover:border-honey/25 sm:p-7"
            >
              <PhaseGlyph phase={u.phase} />
              <h3 className="mt-5 font-display text-xl leading-tight text-balance text-moon">
                {u.title}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-moon-mute">
                {u.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
