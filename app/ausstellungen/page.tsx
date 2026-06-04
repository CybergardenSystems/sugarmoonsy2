import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = { title: "Ausstellungen & Märkte" };

export default function AusstellungenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Unterwegs"
        title="Wo wir ausstellen"
        sub="Triff uns auf Märkten und Events rund um Fulda — und probiere dich durch das Sortiment."
      />
      <LegalNotice>
        Die aktuellen Markt- und Ausstellungstermine werden hier gepflegt.
      </LegalNotice>
    </>
  );
}
