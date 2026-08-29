import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  // /bio-zertifizierung bleibt draußen, bis die Platzhalterseite echte
  // Zertifikatsinhalte trägt (noindex, Council R1). `lastModified` entfällt:
  // ein Build-Datum wäre kein ehrliches Content-Datum.
  const routes = [
    "",
    "/shop",
    "/limonaden",
    "/story",
    "/impressum",
    "/datenschutz",
    "/ausstellungen",
  ];
  const base = routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const productPages = products.map((p) => ({
    url: `${site.url}/shop/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...base, ...productPages];
}
