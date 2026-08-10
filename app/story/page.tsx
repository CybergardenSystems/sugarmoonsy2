import type { Metadata } from "next";
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
    <div className="pt-20">
      <Story full />
      <CTA />
    </div>
  );
}
