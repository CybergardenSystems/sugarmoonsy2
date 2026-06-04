import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProductCard } from "@/components/shop/ProductCard";
import { Icon } from "@/components/ui/Icon";
import { products } from "@/lib/products";

/** Auswahl fürs Schaufenster auf der Startseite — Foto-Sorten zuerst. */
const featured = [...products]
  .sort((a, b) => Number(Boolean(b.photo)) - Number(Boolean(a.photo)))
  .slice(0, 8);

export function ShopTeaser() {
  return (
    <section id="shop" className="section relative">
      <div className="shell">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Online-Shop"
            title="Wähle deine Lieblingssirupe"
            sub="Direkt von der Manufaktur — Größe und Menge wählen, in den Warenkorb, fertig."
          />
          <Reveal className="hidden shrink-0 md:block">
            <MagneticButton href="/shop" variant="line">
              Alle 12 Sorten
              <Icon name="arrow" size={16} aria-hidden />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.08}>
              <ProductCard product={p} priority={i < 4} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:hidden">
          <MagneticButton href="/shop" variant="line">
            Alle 12 Sorten ansehen
            <Icon name="arrow" size={16} aria-hidden />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
