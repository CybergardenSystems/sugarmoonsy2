/**
 * Sugar Moon Sweets — Produktkatalog.
 * Substanz aus EXTRACT.md, präzisiert durch die echten Etiketten/Fotos des Inhabers.
 * Fotos liegen unter /media/products/<photo>. Sorten ohne Foto rendern den
 * Mond-Platzhalter (siehe ProductCard).
 */

export type SeasonKey = "gj" | "fs" | "he" | "wi";
export type AccentKey =
  "honey" | "amber" | "cinnamon" | "sage" | "lavender" | "plum" | "moon" | "pumpkin";

export interface Size {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Kurzer Sinneseindruck für Karten-Untertitel. */
  flavor: string;
  description: string;
  /** Längerer Text für die Detailseite. */
  story: string;
  season: string;
  /** Eine Sorte kann in mehreren Saison-Filtern auftauchen (z. B. ganzjährig + Sommer). */
  seasonKeys: SeasonKey[];
  sizes: Size[];
  accent: AccentKey;
  badge?: string;
  /** Noch nicht bestellbar — wird als „Bald verfügbar" gezeigt. */
  comingSoon?: boolean;
  /** Dateiname in /media/products/ oder null (→ Platzhalter). */
  photo: string | null;
  /** Pairing-Idee (Kaffee / Cocktail / Dessert). */
  pairing: string;
}

/** Akzentfarbe je Sorte als CSS-Variable (server-safe, von Karten & Detailseite genutzt). */
export const accentVar: Record<AccentKey, string> = {
  honey: "var(--color-honey)",
  amber: "var(--color-amber)",
  cinnamon: "var(--color-cinnamon)",
  sage: "var(--color-sage)",
  lavender: "var(--color-lavender)",
  plum: "var(--color-plum)",
  moon: "var(--color-silver)",
  pumpkin: "var(--color-pumpkin)",
};

export const SEASONS: { key: SeasonKey | "all"; label: string }[] = [
  { key: "all", label: "Alle Sorten" },
  { key: "gj", label: "Ganzjährig" },
  { key: "fs", label: "Frühling & Sommer" },
  { key: "he", label: "Herbst" },
  { key: "wi", label: "Winter" },
];

export const products: Product[] = [
  {
    id: "vanille",
    slug: "bio-vanille",
    name: "Bio-Vanille",
    flavor: "Klassisch, weich & natürlich",
    description: "Der zeitlose Allrounder — klassisch, weich und natürlich.",
    story:
      "Unsere Vanille ist der ruhige Vollmond im Sortiment: weich, rund, immer da. Ohne künstliche Aromen — der Sirup, der in jeden Kaffee, jedes Dessert und jeden Teig passt.",
    season: "Ganzjährig",
    seasonKeys: ["gj"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "honey",
    photo: "vanille.jpg",
    pairing: "Latte · Panna Cotta · Pancakes",
  },
  {
    id: "pistazie",
    slug: "bio-pistazie",
    name: "Bio-Pistazie",
    flavor: "Nussig, edel & intensiv",
    description: "Für besondere Momente — nussige Pistazie, fein und intensiv.",
    story:
      "Edel und intensiv: Pistazie, behutsam zu Sirup gebracht. Ein Hauch Mittelmeer für den Flat White oder den Aperitif unter Sternen.",
    season: "März – August",
    seasonKeys: ["fs"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "sage",
    photo: "pistazie.jpg",
    pairing: "Flat White · Tiramisu · Spritz",
  },
  {
    id: "lavendel-blaubeere",
    slug: "bio-lavendel-blaubeere",
    name: "Bio-Lavendel mit Blaubeere",
    flavor: "Fein-blumig & aromatisch",
    description: "Ein Hauch Provence bei Nacht — Lavendel trifft dunkle Blaubeere.",
    story:
      "Blühender Lavendel und dunkle Blaubeere — Provence-Romantik in einem nächtlichen Violett. Ganzjährig erhältlich und besonders beliebt in Frühling & Sommer.",
    season: "Ganzjährig",
    seasonKeys: ["gj", "fs"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "lavender",
    photo: "lavendel-blaubeere.jpg",
    pairing: "Latte · Limonade · Gin Tonic",
  },
  {
    id: "blaubeer-basilikum",
    slug: "bio-blaubeer-basilikum",
    name: "Bio-Blaubeer-Basilikum",
    flavor: "Dunkle Beere & frisches Kraut",
    description: "Überraschend, tief, elegant — Beere trifft Basilikum.",
    story:
      "Dunkle Blaubeere, frisches Basilikum — ein Kontrast, der wach macht. Tiefviolett, krautig, überraschend erwachsen. Wie gemacht für Cocktails.",
    season: "März – August",
    seasonKeys: ["fs"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "plum",
    photo: "blaubeer-basilikum.jpg",
    pairing: "Tonic · Sekt · Soda",
  },
  {
    id: "kokos",
    slug: "bio-kokos",
    name: "Bio-Kokos",
    flavor: "Cremig-exotisch mit Kokosraspeln",
    description: "Sonne im Glas — milde Kokos mit echten Raspeln.",
    story:
      "Mild und cremig, mit echten Kokosraspeln — hell und sanft wie Mondlicht. Macht aus jedem Kaffee einen kleinen Urlaub: unsere Sommer-Sorte.",
    season: "Juni – August",
    seasonKeys: ["fs"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "moon",
    photo: "kokos.jpg",
    pairing: "Iced Latte · Curry · Smoothie",
  },
  {
    id: "bratapfel",
    slug: "bio-bratapfel",
    name: "Bio-Bratapfel",
    flavor: "Fruchtig, zimtig & winterlich",
    description: "Apfel trifft Zimt — der Duft von Herbstabenden.",
    story:
      "Gebackener Apfel und Zimt: der Geschmack von Herbstabenden mit Kerzenlicht. Warm in den Tee, großzügig über den Milchreis.",
    season: "Sep – Nov",
    seasonKeys: ["he"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "pumpkin",
    badge: "Coming Soon",
    comingSoon: true,
    photo: null,
    pairing: "Tee · Milchreis · Punsch",
  },
  {
    id: "pumpkin-spice",
    slug: "bio-pumpkin-spice",
    name: "Bio-Pumpkin Spice",
    flavor: "Würzig, herbstlich & wohlig",
    description: "Unser Bestseller — der Sirup, mit dem alles begann.",
    story:
      "Der Sirup, mit dem alles begann: An einem Herbstmorgen in Fulda suchte Jessica vergeblich nach einem Pumpkin Spice Latte — und begann, ihn selbst zu machen. Würzig, herbstlich, wohlig — unser Bestseller.",
    season: "Sep – Nov",
    seasonKeys: ["he"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "pumpkin",
    badge: "Bestseller",
    photo: null,
    pairing: "Latte · Cheesecake · Chai",
  },
  {
    id: "spekulatius",
    slug: "bio-spekulatius",
    name: "Bio-Spekulatius",
    flavor: "Fein, buttrig & zimtig",
    description: "Gewürzkeks im Glas — tief, dunkel, weihnachtlich.",
    story:
      "Buttriger Gewürzkeks, eingefangen als Sirup — fast schwarz, tief und weihnachtlich. Ein Löffel im Kaffee und die Küche riecht nach Dezember.",
    season: "Dez – Jan",
    seasonKeys: ["wi"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "cinnamon",
    photo: "spekulatius.jpg",
    pairing: "Kaffee · Kakao · Waffeln",
  },
  {
    id: "lebkuchen",
    slug: "bio-lebkuchen",
    name: "Bio-Lebkuchen",
    flavor: "Kräftig & würzig",
    description: "Kräftig & würzig — voller Weihnachtsstimmung.",
    story:
      "Der ganze Weihnachtsmarkt in einer Flasche: kräftig, würzig, voller Weihnachtsstimmung — auch als 50-ml-Fläschchen zum Verschenken erhältlich.",
    season: "Dez – Jan",
    seasonKeys: ["wi"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "cinnamon",
    photo: "lebkuchen.jpg",
    pairing: "Glühwein · Kakao · Plätzchen",
  },
  {
    id: "zimt",
    slug: "bio-zimt",
    name: "Bio-Zimt",
    flavor: "Warm & aromatisch",
    description: "Der Geschmack von Winter — warm und aromatisch.",
    story:
      "Warm, aromatisch, beruhigend: der Sirup für lange Winterabende und cremigen Milchschaum.",
    season: "Nov – Feb",
    seasonKeys: ["wi"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "cinnamon",
    photo: "zimt.jpg",
    pairing: "Latte · Apfelsaft · Porridge",
  },
  {
    id: "vanille-extrakt",
    slug: "bio-vanille-extrakt",
    name: "Bio-Vanille-Extrakt",
    flavor: "Pur zum Backen & Verfeinern",
    description: "Konzentrierte Vanille — perfekt zum Backen, Verfeinern & Genießen.",
    story:
      "Kein Sirup, sondern pure Tiefe: konzentrierter Vanille-Extrakt im eleganten schwarzen Mond-Etikett. Zum Backen, Verfeinern und Genießen.",
    season: "Ganzjährig",
    seasonKeys: ["gj"],
    sizes: [{ label: "100 ml", price: 7.8 }],
    accent: "honey",
    photo: "vanille-extrakt.jpg",
    pairing: "Teig · Creme · Eis",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsBySeason(key: SeasonKey | "all"): Product[] {
  return key === "all" ? products : products.filter((p) => p.seasonKeys.includes(key));
}

/** Die „beliebten Sorten" für den Hero-Quickpick. */
export const heroPicks = [
  "pumpkin-spice",
  "lavendel-blaubeere",
  "vanille",
  "pistazie",
  "spekulatius",
].map((id) => {
  const p = products.find((x) => x.id === id);
  if (!p) throw new Error(`heroPick "${id}" existiert nicht im Katalog`);
  return p;
});
