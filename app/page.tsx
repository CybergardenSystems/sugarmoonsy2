import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Manifest } from "@/components/sections/Manifest";
import { ShopTeaser } from "@/components/sections/ShopTeaser";
import { LimoSection } from "@/components/sections/LimoSection";
import { Story } from "@/components/sections/Story";
import { Reviews } from "@/components/sections/Reviews";
import { CTA } from "@/components/sections/CTA";
import { site } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description:
    "Bio-Sirup-Manufaktur aus Fulda. Handgemachte Sirupe und Limonaden.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
