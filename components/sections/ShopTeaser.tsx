import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProductCard } from "@/components/shop/ProductCard";
import { products } from "@/lib/products";

/** Auswahl fürs Schaufenster auf der Startseite — Foto-Sorten zuerst. */
const featured = [...products]
  .sort((a, b) => Number(Boolean(b.photo)) - Number(Boolean(a.photo)))
  .slice(0, 8);

export function ShopTeaser() {
  return (
    <section id="shop" className="relative py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Online-Shop"
            title="Wähle deine Lieblingssirupe"
            sub="Direkt von der Manufaktur — Größe und Menge wählen, in den Warenkorb, fertig."
          />
          <Reveal className="hidden md:block">
            <MagneticButton href="/shop" variant="line">
              Alle 12 Sorten
              <span aria-hidden>→</span>
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.08}>
              <ProductCard product={p} priority={i < 4} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center md:hidden">
          <MagneticButton href="/shop" variant="line">
            Alle 12 Sorten ansehen →
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
