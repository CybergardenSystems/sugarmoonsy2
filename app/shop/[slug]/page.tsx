import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { BuyPanel } from "@/components/shop/BuyPanel";
import { MoonMark } from "@/components/brand/MoonMark";
import { accentVar } from "@/components/shop/ProductCard";
import { photoSrc } from "@/lib/photos";

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
  return {
    title: product.name,
    description: product.description,
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

  return (
    <article className="pt-32 pb-28">
      <div className="shell">
        <Link
          href="/shop"
          className="font-mono text-[0.66rem] uppercase tracking-[0.16em] text-moon-mute transition-colors hover:text-honey"
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
                    style={{ background: `radial-gradient(50% 45% at 50% 40%, ${ac}22, transparent 70%)` }}
                  />
                  <MoonMark size={160} className="relative" />
                  <span className="relative mt-4 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-moon-mute">
                    Produktfoto folgt
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Detail */}
          <div>
            <span
              className="font-mono text-[0.66rem] uppercase tracking-[0.18em]"
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
                <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-moon-mute">
                  Passt zu
                </dt>
                <dd className="mt-1 text-sm text-moon">{product.pairing}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6rem] uppercase tracking-wider text-moon-mute">
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
