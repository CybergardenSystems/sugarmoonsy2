/** Kundenstimmen (5★) — wörtlich aus EXTRACT.md. */

export interface Review {
  text: string;
  author: string;
}

export const reviews: Review[] = [
  {
    text: "Ich gebe einen Schuss in meinen Morgen-Latte, und es fühlt sich an wie ein Cafébesuch – nur gemütlich zuhause. Mein Favorit: Lavendel!",
    author: "C. Messler",
  },
  {
    text: "Die Sirups sind weltklasse, aber die Lavendel-Bionade ist unbeschreiblich. Meine ganze Familie ist begeistert!",
    author: "Paul Weiß",
  },
  {
    text: "Endlich mal was Neues! Hab schon gedacht, es gibt keine kreativen Menschen mehr. Bestellung ist raus!",
    author: "Andreas Kunze",
  },
];
