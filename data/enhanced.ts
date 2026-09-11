/**
 * Aufgewertete Produktfotos (Higgsfield nano_banana_pro): die echten Flaschen
 * der Inhaber, auf einen dunklen Studio-Hintergrund relightet.
 *
 * Self-hosted: die Originale wurden von der Higgsfield-CDN heruntergeladen,
 * auf max. 1400px verkleinert und als WebP (q82, 25–43 KB statt ~5 MB PNG)
 * unter /public/media/relit abgelegt. Keine externe CDN-Abhängigkeit mehr;
 * next/image erzeugt daraus responsive AVIF/WebP-Varianten.
 */
export const enhancedPhotos: Record<string, string> = {
  pistazie: "/media/relit/pistazie.webp",
  vanille: "/media/relit/vanille.webp",
  zimt: "/media/relit/zimt.webp",
  spekulatius: "/media/relit/spekulatius.webp",
  lebkuchen: "/media/relit/lebkuchen.webp",
  "lavendel-blaubeere": "/media/relit/lavendel-blaubeere.webp",
  "blaubeer-basilikum": "/media/relit/blaubeer-basilikum.webp",
  kokos: "/media/relit/kokos.webp",
  "vanille-extrakt": "/media/relit/vanille-extrakt.webp",
  "geschenk-lebkuchenmann": "/media/relit/geschenk-lebkuchenmann.webp",

  // Echtes Inhaber-Produktfoto (nachgeliefert), nur skaliert/konvertiert —
  // kein Relighting, kein Rendering.
  "pumpkin-spice": "/media/relit/pumpkin-spice.webp",

  // Bio-Apple Spice hat bewusst KEINEN Eintrag: Das frühere Studio-Rendering
  // trug „BIO BRATAPFEL" auf dem Etikett und hätte dem neuen Namen
  // widersprochen (D30). Bis ein echtes Flaschenfoto vorliegt, rendert die
  // Sorte den Mond-Platzhalter — damit steht auf der Seite kein einziges
  // KI-Bild mehr.
};
