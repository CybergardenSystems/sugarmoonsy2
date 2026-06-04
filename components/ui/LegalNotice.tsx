import { site } from "@/data/site";

/** Platzhalter-Hinweis für rechtlich sensible Seiten (Inhalt vom Inhaber). */
export function LegalNotice({ children }: { children?: React.ReactNode }) {
  return (
    <section className="pb-28">
      <div className="shell max-w-2xl">
        <div className="rounded-2xl border border-honey/15 bg-night-2/60 p-7">
          <p className="text-[0.9rem] leading-relaxed text-moon-dim">{children}</p>
          <p className="mt-4 text-[0.82rem] leading-relaxed text-moon-mute">
            Dieser Bereich ist als Platzhalter angelegt. Die verbindlichen Inhalte
            werden von Sugar Moon Sweets bereitgestellt und hier eingepflegt —
            rechtlich relevante Texte werden bewusst nicht generiert. Fragen?{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-honey transition-colors hover:text-honey-glow"
            >
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
