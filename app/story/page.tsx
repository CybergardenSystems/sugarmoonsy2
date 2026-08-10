import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Story } from "@/components/sections/Story";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Sugar Moon Sweets — von einer Küche in Fulda in eure Tassen. Die Geschichte von Jessica & Sebastian und ihrer Bio-Sirup-Manufaktur.",
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Über uns"
        title="Die Manufaktur hinter dem Mond"
        sub="Wer Sugar Moon Sweets macht, warum es uns gibt — und was ein Pumpkin Spice Latte damit zu tun hat."
      />
      <Story full />
      <CTA />
    </>
  );
}
