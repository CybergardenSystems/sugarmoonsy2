/** Bio-Limonaden — „Natur im Glas", mit Hunfelt Bräu, DE-ÖKO-006. */

export interface Limonade {
  id: string;
  name: string;
  type: string;
  volume: string;
  price: number;
  accent: "lavender" | "sage";
  emoji: string;
  traits: string[];
  ingredients: string;
  organic: string;
}

export const limonaden: Limonade[] = [
  {
    id: "lila-laune",
    name: "Lila & Laune",
    type: "Lavendellimonade",
    volume: "330 ml",
    price: 3.5,
    accent: "lavender",
    emoji: "💜",
    traits: [
      "Ohne Konservierungsmittel",
      "Ohne künstliche Aromen",
      "Vegan · Kein Alkohol",
    ],
    ingredients: "Wasser, Zitronensaftkonzentrat*, Zucker, Lavendelsirup*",
    organic: "*aus kontrolliert ökologischem Anbau",
  },
  {
    id: "kraut-heiter",
    name: "Kraut & Heiter",
    type: "Kräuterlimonade",
    volume: "330 ml",
    price: 3.5,
    accent: "sage",
    emoji: "🌿",
    traits: [
      "Ohne Konservierungsmittel",
      "Ohne künstliche Aromen",
      "Vegan · Kein Alkohol",
    ],
    ingredients: "Wasser, Zitronensaftkonzentrat*, Zucker, Kräutersirup*",
    organic: "*aus kontrolliert ökologischem Anbau",
  },
];
