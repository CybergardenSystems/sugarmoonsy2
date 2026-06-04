import { SectionHeading } from "@/components/ui/SectionHeading";
import { LimoCards } from "./LimoCards";

export function LimoSection() {
  return (
    <section id="limonaden" className="relative overflow-hidden py-24 sm:py-32">
      {/* lavendel-getönter Schein für diesen Abschnitt */}
      <div className="pointer-events-none absolute right-0 top-0 h-[40rem] w-[40rem] rounded-full bg-lavender/5 blur-[120px]" />
      <div className="shell relative">
        <SectionHeading
          eyebrow="Neu im Sortiment"
          title="Bio-Limonade — Natur im Glas"
          sub={
            <>
              Zusammen mit unserem Partner <strong className="text-moon">Hunfelt Bräu</strong>{" "}
              — erfrischend, ehrlich und 100 % natürlich. DE-ÖKO-006 zertifiziert.
            </>
          }
        />
        <LimoCards />
      </div>
    </section>
  );
}
