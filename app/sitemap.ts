import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    "/limonaden",
    "/story",
    "/impressum",
    "/datenschutz",
    "/bio-zertifizierung",
    "/ausstellungen",
  ];
  const base = routes.map((r) => ({
    url: `${site.url}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: r === "" ? 1 : 0.7,
  }));
  const productPages = products.map((p) => ({
    url: `${site.url}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...base, ...productPages];
}
