import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifest } from "@/components/sections/Manifest";
import { ShopTeaser } from "@/components/sections/ShopTeaser";
import { LimoSection } from "@/components/sections/LimoSection";
import { Story } from "@/components/sections/Story";
import { Reviews } from "@/components/sections/Reviews";
import { CTA } from "@/components/sections/CTA";
import { GoldenSpine } from "@/components/layout/GoldenSpine";
import { site } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: "Bio-Sirup-Manufaktur aus Fulda. Handgemachte Sirupe und Limonaden.",
  url: site.url,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Fulda",
    addressCountry: "DE",
  },
  priceRange: "€€",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GoldenSpine />
      <Hero />
      <Marquee />
      <Manifest />
      <ShopTeaser />
      <LimoSection />
      <Story />
      <Reviews />
      <CTA />
    </>
  );
}
