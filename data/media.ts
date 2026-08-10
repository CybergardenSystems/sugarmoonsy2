/**
 * Medien-Assets (Higgsfield-generiert, self-hosted).
 *
 * Die Hero-Loops wurden von der Higgsfield-CDN heruntergeladen und liegen
 * jetzt unter /public/media (3,2 bzw. 3,8 MB, H.264) — keine externe
 * CDN-Abhängigkeit mehr.
 */
export const media = {
  /** Cinematischer Hero-Hintergrund-Loop, Querformat (Desktop). */
  heroVideo: "/media/hero.mp4",
  /** Hochformat-Variante (Mobile, 9:16). */
  heroVideoPortrait: "/media/hero-portrait.mp4",
} as const;

/** Bio-Limonaden-Flaschen (echte Hunfelt-Bräu-Fotos, lokal gehostet). */
export const limoPhotos: Record<string, string> = {
  "lila-laune": "/media/products/lila-laune.jpg",
  "kraut-heiter": "/media/products/kraut-heiter.jpg",
};

/** Atmosphäre-Bild für die „Über uns"-Story: Jessica & Sebastian am Adventsmarkt. */
export const storyImage = "/media/story.jpg";
