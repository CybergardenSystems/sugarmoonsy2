import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = {
  title: "Bio-Zertifizierung",
  alternates: { canonical: "/bio-zertifizierung" },
};

export default function BioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Qualität"
        title="Bio-Zertifizierung"
        sub="Unsere Sirupe und Limonaden sind bio-zertifiziert — die Limonaden tragen das Kontrollstellen-Kürzel DE-ÖKO-006."
      />
      <LegalNotice>
        Details zur Öko-Kontrollstelle, Zertifikatsnummern und Prüfberichte werden hier
        veröffentlicht.
      </LegalNotice>
    </>
  );
}
