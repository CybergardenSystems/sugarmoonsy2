import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifest } from "@/components/sections/Manifest";
import { ShopTeaser } from "@/components/sections/ShopTeaser";
import { LimoSection } from "@/components/sections/LimoSection";
import { Story } from "@/components/sections/Story";
import { NextEvent } from "@/components/sections/NextEvent";
import { Reviews } from "@/components/sections/Reviews";
import { CTA } from "@/components/sections/CTA";
import { GoldenSpine } from "@/components/layout/GoldenSpine";
import { site, social } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Das Termin-Band filtert nach Datum — stündlich neu erzeugen (wie /ausstellungen). */
export const revalidate = 3600;

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
  sameAs: social.map((s) => s.href),
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
      <NextEvent />
      <Reviews />
      <CTA />
    </>
  );
}
