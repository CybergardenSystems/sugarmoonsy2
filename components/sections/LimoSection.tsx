import { SectionHeading } from "@/components/ui/SectionHeading";
import { LimoCards } from "./LimoCards";

export function LimoSection() {
  return (
    <section id="limonaden" className="section relative overflow-hidden">
      {/* lavendel-getönter Schein für diesen Abschnitt */}
      <div className="glow-blob right-0 top-0 bg-lavender/5" />
      <div className="shell relative">
        <SectionHeading
          eyebrow="Neu im Sortiment"
          title="Bio-Limonade — Natur im Glas"
          sub={
            <>
              Zusammen mit unserem Partner{" "}
              <strong className="text-moon">Hunfelt Bräu</strong> — erfrischend, ehrlich
              und 100 % natürlich. DE-ÖKO-006 zertifiziert.
            </>
          }
        />
        <LimoCards />
      </div>
    </section>
  );
}
