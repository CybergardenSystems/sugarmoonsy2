import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { LegalNotice } from "@/components/ui/LegalNotice";

export const metadata: Metadata = { title: "Impressum" };

export default function ImpressumPage() {
  return (
    <>
      <PageHeader eyebrow="Rechtliches" title="Impressum" />
      <LegalNotice>
        Angaben gemäß § 5 DDG (TMG) — Anbieterkennzeichnung von Sugar Moon Sweets,
        Fulda.
      </LegalNotice>
    </>
  );
}
