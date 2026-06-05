import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata: Metadata = {
  title: "Shop — Bio-Sirupe",
  description:
    "Alle 11 handgemachten Bio-Sirupe aus Fulda: Vanille, Pistazie, Lavendel mit Blaubeere, Pumpkin Spice, Spekulatius und mehr.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Online-Shop"
        title="Alle Sorten, gebraut vom Mond"
        sub="11 handgemachte Bio-Sirupe — wähle Größe und Menge, ab in den Warenkorb. Die 50 ml-Fläschchen gibt es bei jeder Sorte, perfekt zum Verschenken."
      />
      <section className="pb-28">
        <div className="shell">
          <ShopGrid />
          <p className="mt-12 text-center text-sm text-moon-mute">
            Versandkosten werden individuell berechnet. Bestellung per E-Mail an{" "}
            <span className="text-honey">sebastian.scherf@sugarmoonsweets.de</span>.
          </p>
        </div>
      </section>
    </>
  );
}
