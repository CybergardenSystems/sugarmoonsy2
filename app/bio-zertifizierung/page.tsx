import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = {
  title: "Bio-Zertifizierung",
  description:
    "Bio-Qualität bei Sugar Moon Sweets: Die Limonaden tragen das Kontrollstellen-Kürzel DE-ÖKO-006. Details zur Zertifizierung folgen.",
  alternates: { canonical: "/bio-zertifizierung" },
  // Platzhalterseite: bis die verbindlichen Zertifikatsdetails eingepflegt
  // sind, nicht indexieren (Council R1 — Dünn-Inhalt).
  robots: { index: false, follow: true },
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
