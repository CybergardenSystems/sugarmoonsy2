/** Globale Marken-/Site-Konstanten (Substanz aus EXTRACT.md). */

export const site = {
  name: "Sugar Moon Sweets",
  tagline: "Bio-Sirup-Manufaktur aus Fulda",
  email: "sebastian.scherf@sugarmoonsweets.de",
  domain: "sugarmoonsweets.de",
  url: "https://sugarmoonsweets.de",
  city: "Fulda",
  country: "DE",
  description:
    "Handgemachte Bio-Sirupe & Limonaden aus Fulda — natürlich, kreativ, mit Liebe.",
} as const;

export const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/limonaden", label: "Bio-Limo" },
  { href: "/story", label: "Über uns" },
  { href: "/#bewertungen", label: "Bewertungen" },
] as const;

export const usps = [
  {
    title: "Bio-zertifiziert",
    body: "Erlesene Zutaten, ganz ohne künstliche Geschmacksverstärker. Qualität, die man schmeckt.",
    phase: "new",
  },
  {
    title: "Handgemacht in Fulda",
    body: "Jede Flasche entsteht in unserer Manufaktur — familiengeführt, mit Herzblut und Sorgfalt.",
    phase: "half",
  },
  {
    title: "Saisonale Kreationen",
    body: "Von Lavendel im Sommer bis Lebkuchen im Winter — immer neue, kreative Geschmäcker.",
    phase: "full",
  },
] as const;

export const marqueeItems = [
  "Bio-zertifiziert",
  "Handgemacht in Fulda",
  "11 Sorten",
  "Für Kaffee & Cocktails",
  "Perfekt als Geschenk",
  "Direkt bestellen",
  "DE-ÖKO-006",
];

export const stats = [
  { value: "11", label: "Sorten" },
  { value: "100%", label: "Bio" },
  { value: "Fulda", label: "Mit Herz" },
];

export const footerLinks = {
  shop: [
    { href: "/shop", label: "Sirupe" },
    { href: "/limonaden", label: "Bio-Limonade" },
  ],
  unternehmen: [
    { href: "/story", label: "Über uns" },
    { href: "/#bewertungen", label: "Bewertungen" },
    { href: "/ausstellungen", label: "Ausstellungen" },
  ],
  rechtliches: [
    { href: "/impressum", label: "Impressum" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/bio-zertifizierung", label: "Bio-Zertifizierung" },
  ],
};
