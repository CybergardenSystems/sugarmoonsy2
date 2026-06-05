/**
 * Sugar Moon Sweets — Produktkatalog.
 * Substanz aus EXTRACT.md, präzisiert durch die echten Etiketten/Fotos des Inhabers.
 * Fotos liegen unter /media/products/<photo>. Sorten ohne Foto rendern den
 * Mond-Platzhalter (siehe ProductCard).
 */

export type SeasonKey = "gj" | "fs" | "he" | "wi";
export type AccentKey =
  | "honey"
  | "amber"
  | "cinnamon"
  | "sage"
  | "lavender"
  | "plum"
  | "moon"
  | "pumpkin";

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

export const SEASONS: { key: SeasonKey | "all"; label: string }[] = [
  { key: "all", label: "Alle Sorten" },
  { key: "gj", label: "Ganzjährig" },
  { key: "fs", label: "Frühling & Sommer" },
  { key: "he", label: "Herbst" },
  { key: "wi", label: "Winter" },
];

const P = (p: Product) => p;

export const products: Product[] = [
  P({
    id: "vanille",
    slug: "bio-vanille",
    name: "Bio-Vanille",
    flavor: "Klassisch, weich & natürlich",
    description: "Der zeitlose Allrounder — warme Vanille aus echter Schote.",
    story:
      "Unsere Vanille ist der ruhige Vollmond im Sortiment: weich, rund, immer da. Aus echter Bourbon-Vanille, ohne künstliche Aromen — der Sirup, der in jeden Kaffee, jedes Dessert und jeden Teig passt.",
    season: "Ganzjährig",
    seasonKeys: ["gj"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "honey",
    photo: "vanille.jpg",
    pairing: "Latte · Panna Cotta · Pancakes",
  }),
  P({
    id: "pistazie",
    slug: "bio-pistazie",
    name: "Bio-Pistazie",
    flavor: "Nussig, edel & intensiv",
    description: "Für besondere Momente — geröstete Pistazie, fein und tief.",
    story:
      "Edel und intensiv: geröstete Pistazien, behutsam zu Sirup gebracht. Ein Hauch Mittelmeer für den Flat White oder den Aperitif unter Sternen.",
    season: "März – August",
    seasonKeys: ["fs"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "sage",
    photo: "pistazie.jpg",
    pairing: "Flat White · Tiramisu · Spritz",
  }),
  P({
    id: "lavendel-blaubeere",
    slug: "bio-lavendel-blaubeere",
    name: "Bio-Lavendel mit Blaubeere",
    flavor: "Fein-blumig & fruchtig",
    description: "Ein Hauch Provence bei Nacht — Lavendel trifft dunkle Blaubeere.",
    story:
      "Blühender Lavendel und dunkle Blaubeere — die Sorte, die unsere Kund:innen am häufigsten ihren Lieblingssirup nennen. Provence-Romantik in einem nächtlichen Violett. Ganzjährig erhältlich und besonders beliebt in Frühling & Sommer.",
    season: "Ganzjährig",
    seasonKeys: ["gj", "fs"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "lavender",
    photo: "lavendel-blaubeere.jpg",
    pairing: "Latte · Limonade · Gin Tonic",
  }),
  P({
    id: "blaubeer-basilikum",
    slug: "bio-blaubeer-basilikum",
    name: "Bio-Blaubeer-Basilikum",
    flavor: "Dunkle Beere & frisches Kraut",
    description: "Überraschend, tief, elegant — Beere trifft Basilikum.",
    story:
      "Dunkle Blaubeere, frisches Basilikum — ein Kontrast, der wach macht. Tiefviolett, krautig, überraschend erwachsen. Unser Geheimtipp für Cocktails.",
    season: "März – August",
    seasonKeys: ["fs"],
    sizes: [
      { label: "250 ml", price: 16 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "plum",
    photo: "blaubeer-basilikum.jpg",
    pairing: "Tonic · Sekt · Soda",
  }),
  P({
    id: "kokos",
    slug: "bio-kokos",
    name: "Bio-Kokos",
    flavor: "Cremig-exotisch mit Kokosraspeln",
    description: "Sonne im Glas — milde Kokos mit echten Raspeln.",
    story:
      "Mild, cremig, mit echten Kokosraspeln: der hellste Sirup im Sortiment, fast milchig wie ein Neumond. Macht aus jedem Kaffee einen kleinen Urlaub — unsere Sommer-Sorte.",
    season: "Juni – August",
    seasonKeys: ["fs"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "moon",
    photo: "kokos.jpg",
    pairing: "Iced Latte · Curry · Smoothie",
  }),
  P({
    id: "bratapfel",
    slug: "bio-bratapfel",
    name: "Bio-Bratapfel",
    flavor: "Fruchtig, zimtig & winterlich",
    description: "Apfel trifft Zimt — der Duft von Herbstabenden.",
    story:
      "Gebackener Apfel, Zimt, eine Spur Nelke: der Geschmack von Herbstabenden mit Kerzenlicht. Warm in den Tee, großzügig über den Milchreis.",
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
  }),
  P({
    id: "pumpkin-spice",
    slug: "bio-pumpkin-spice",
    name: "Bio-Pumpkin Spice",
    flavor: "Würzig, herbstlich & wohlig",
    description: "Unser Bestseller — der Sirup, mit dem alles begann.",
    story:
      "Der Sirup, mit dem alles begann: An einem Herbstmorgen in Fulda suchte Jessica vergeblich nach einem Pumpkin Spice Latte — und begann, ihn selbst zu machen. Kürbis, Zimt, Muskat, Ingwer. Unser Bestseller.",
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
  }),
  P({
    id: "spekulatius",
    slug: "bio-spekulatius",
    name: "Bio-Spekulatius",
    flavor: "Fein, buttrig & zimtig",
    description: "Gewürzkeks im Glas — der dunkelste Sirup im Sortiment.",
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
  }),
  P({
    id: "lebkuchen",
    slug: "bio-lebkuchen",
    name: "Bio-Lebkuchen",
    flavor: "Kräftig & würzig",
    description: "Voller Weihnachtsstimmung — Honig, Nelke, Zimt.",
    story:
      "Honig, Nelke, Zimt, Piment: der ganze Weihnachtsmarkt in einer Flasche. Kräftig und würzig — auch als 50 ml Geschenk im Lebkuchenmännchen-Glas erhältlich.",
    season: "Dez – Jan",
    seasonKeys: ["wi"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "cinnamon",
    photo: "lebkuchen.jpg",
    pairing: "Glühwein · Kakao · Plätzchen",
  }),
  P({
    id: "zimt",
    slug: "bio-zimt",
    name: "Bio-Zimt",
    flavor: "Warm & aromatisch",
    description: "Der Geschmack von Winter — echte Ceylon-Zimtstangen.",
    story:
      "Echte Zimtstangen, langsam ausgezogen: warm, aromatisch, beruhigend. Der Sirup für lange Winterabende und cremigen Milchschaum.",
    season: "Nov – Feb",
    seasonKeys: ["wi"],
    sizes: [
      { label: "250 ml", price: 15 },
      { label: "50 ml", price: 5.5 },
    ],
    accent: "cinnamon",
    photo: "zimt.jpg",
    pairing: "Latte · Apfelsaft · Porridge",
  }),
  P({
    id: "vanille-extrakt",
    slug: "bio-vanille-extrakt",
    name: "Bio-Vanille-Extrakt",
    flavor: "Pur zum Backen & Verfeinern",
    description: "Konzentrierte Vanille aus echter Schote — fürs Backen gemacht.",
    story:
      "Kein Sirup, sondern pure Tiefe: konzentrierter Vanille-Extrakt aus echter Schote, im eleganten schwarzen Mond-Etikett. Zum Backen, Verfeinern und Genießen.",
    season: "Ganzjährig",
    seasonKeys: ["gj"],
    sizes: [{ label: "100 ml", price: 7.8 }],
    accent: "honey",
    photo: "vanille-extrakt.jpg",
    pairing: "Teig · Creme · Eis",
  }),
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
].map((id) => products.find((p) => p.id === id)!);

export const PRICE_FROM = 5.5;
