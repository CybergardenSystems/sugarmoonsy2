import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LimoCards } from "@/components/sections/LimoCards";

export const metadata: Metadata = {
  title: "Bio-Limonade",
  description:
    "Lila & Laune und Kraut & Heiter — Bio-Limonaden aus Fulda, gemeinsam mit Hunfelt Bräu. Ohne Konservierungsmittel, vegan, DE-ÖKO-006.",
  alternates: { canonical: "/limonaden" },
};

export default function LimonadenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Natur im Glas"
        title="Bio-Limonade"
        sub={
          <>
            Zusammen mit unserem Partner Hunfelt Bräu — erfrischend, ehrlich und 100 %
            natürlich. Ohne Konservierungsmittel, vegan, DE-ÖKO-006 zertifiziert.
          </>
        }
      />
      <section className="pb-28">
        <div className="shell">
          <LimoCards />
        </div>
      </section>
    </>
  );
}
