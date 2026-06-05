/**
 * Externe Medien-Assets (Higgsfield).
 *
 * Hinweis: Diese Dateien liegen auf Higgsfields öffentlicher CDN, weil die
 * Netzwerk-Policy der Build-Umgebung Up-/Download der Bytes blockiert. Sie
 * werden live von Besuchern/Deploy-Servern geladen. Zum Self-Hosting später
 * einfach die Datei nach /public/media/ legen und die URL hier ersetzen.
 */
export const media = {
  /** Cinematischer Hero-Hintergrund-Loop, Querformat (Desktop). */
  heroVideo:
    "https://d8j0ntlcm91z4.cloudfront.net/user_39b5wB7nN2eeHNQBagWbEKccwjN/hf_20260604_215820_7a26398a-54f6-46d8-8eab-3235035a4722.mp4",
  /** Hochformat-Variante (Mobile, 9:16). */
  heroVideoPortrait:
    "https://d8j0ntlcm91z4.cloudfront.net/user_39b5wB7nN2eeHNQBagWbEKccwjN/hf_20260605_073505_56b8ab18-7a90-466b-b9ac-1cbc5459b289.mp4",
} as const;

/** Bio-Limonaden-Flaschen (echte Hunfelt-Bräu-Fotos, lokal gehostet). */
export const limoPhotos: Record<string, string> = {
  "lila-laune": "/media/products/lila-laune.jpg",
  "kraut-heiter": "/media/products/kraut-heiter.jpg",
};

/** Atmosphäre-Bild für die „Über uns"-Story: Jessica & Sebastian am Adventsmarkt. */
export const storyImage = "/media/story.jpg";
