import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accentVar, getProduct, products, type Product } from "@/lib/products";
import { BuyPanel } from "@/components/shop/BuyPanel";
import { ProductCard } from "@/components/shop/ProductCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Icon } from "@/components/ui/Icon";
import { MoonMark } from "@/components/brand/MoonMark";
import { hasPhoto, photoSrc } from "@/lib/photos";
import { site } from "@/data/site";

/** Deterministische Auswahl fürs „Weitere Sorten"-Regal: gleiche Saison
 *  zuerst, dann Sorten mit Foto; Coming-Soon ans Ende. */
function relatedProducts(current: Product, count = 4): Product[] {
  const score = (p: Product) =>
    (p.season === current.season ? 4 : 0) +
    (hasPhoto(p) ? 2 : 0) +
    (p.comingSoon ? -3 : 0);
  return products
    .filter((p) => p.slug !== current.slug)
    .sort((a, b) => score(b) - score(a))
    .slice(0, count);
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Sorte nicht gefunden" };
  const src = photoSrc(product);
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: src ? { images: [{ url: src, alt: product.name }] } : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const ac = accentVar[product.accent];
  const src = photoSrc(product);

  // Strukturierte Daten: Product + Offers (eine Offer je Größe).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    ...(src ? { image: `${site.url}${src}` } : {}),
    brand: { "@type": "Brand", name: site.name },
    offers: product.sizes.map((s) => ({
      "@type": "Offer",
      name: s.label,
      price: s.price.toFixed(2),
      priceCurrency: "EUR",
      availability: product.comingSoon
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
      url: `${site.url}/shop/${product.slug}`,
    })),
  };

  return (
    <article className="pt-32 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="shell">
        <Link
          href="/shop"
          className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-moon-mute transition-colors hover:text-honey"
        >
          ← Zurück zum Shop
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          {/* Visual */}
          <div className="relative overflow-hidden rounded-3xl border border-honey/12">
            <div className="relative aspect-[4/5]">
              {src ? (
                <>
                  <div className="absolute inset-0 bg-night-3" />
                  <Image
                    src={src}
                    alt={`${product.name} — Flasche mit Mond-Etikett`}
                    fill
                    sizes="(max-width:1024px) 100vw, 600px"
                    priority
                    className="object-cover object-center"
                  />
                </>
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center bg-night-3"
                  style={{ ["--ac" as string]: ac }}
                >
                  <div
                    className="absolute inset-0 opacity-60"
                    style={{
                      background: `radial-gradient(50% 45% at 50% 40%, ${ac}22, transparent 70%)`,
                    }}
                  />
                  <MoonMark size={160} className="relative" />
                  <span className="relative mt-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-moon-mute">
                    Produktfoto folgt
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Detail */}
          <div>
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-moon-dim">
              {product.season}
            </span>
            <h1 className="mt-2 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-tight text-moon">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-moon-dim">{product.flavor}</p>

            <p className="mt-6 leading-relaxed text-moon-dim">{product.story}</p>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-t border-honey/10 pt-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-moon-mute">
                  Passt zu
                </dt>
                <dd className="mt-1 text-sm text-moon">{product.pairing}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-moon-mute">
                  Qualität
                </dt>
                <dd className="mt-1 text-sm text-moon">Bio · ohne künstliche Zusätze</dd>
              </div>
            </dl>

            <BuyPanel product={product} />
          </div>
        </div>

        {/* Kein toter Seitenschluss nach der Kaufbox (Design-Review):
            das Regal hält im Sortiment, statt in den Footer zu entlassen. */}
        <section aria-labelledby="related-heading" className="mt-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2
              id="related-heading"
              className="font-display text-3xl text-moon sm:text-4xl"
            >
              Weitere Sorten
            </h2>
            <MagneticButton href="/shop" variant="line">
              Alle 11 Sorten
              <Icon name="arrow" size={16} aria-hidden />
            </MagneticButton>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {relatedProducts(product).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
