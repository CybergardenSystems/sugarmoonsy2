import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = { title: "Datenschutz" };

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Datenschutz­erklärung" />
      <LegalNotice>
        Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO. Diese
        Website nutzt aktuell keine Tracking-Cookies; Bestellungen werden per
        E-Mail abgewickelt.
      </LegalNotice>
    </>
  );
}
