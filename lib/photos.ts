import type { Product } from "./products";
import { enhancedPhotos } from "@/data/enhanced";

/**
 * Bevorzugt das relightete Bild; fällt auf das lokal getönte Foto zurück;
 * sonst null (→ Mond-Platzhalter).
 */
export function photoSrc(p: Product): string | null {
  if (enhancedPhotos[p.id]) return enhancedPhotos[p.id];
  if (p.photo) return `/media/products/${p.photo}`;
  return null;
}

export function hasPhoto(p: Product): boolean {
  return Boolean(enhancedPhotos[p.id] || p.photo);
}
