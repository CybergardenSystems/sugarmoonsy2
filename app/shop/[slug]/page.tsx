import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { accentVar, getProduct, products } from "@/lib/products";
import { BuyPanel } from "@/components/shop/BuyPanel";
import { MoonMark } from "@/components/brand/MoonMark";
import { photoSrc } from "@/lib/photos";
import { site } from "@/data/site";

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
            <span
              className="font-mono text-[0.72rem] uppercase tracking-[0.18em]"
              style={{ color: ac }}
            >
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
      </div>
    </article>
  );
}
