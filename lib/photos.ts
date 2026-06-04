import type { Product } from "./products";
import { enhancedPhotos } from "@/data/enhanced";

/**
 * Bevorzugt das Higgsfield-relightete Bild; fällt auf das lokal getönte Foto
 * zurück; sonst null (→ Mond-Platzhalter). `id` für die Gift-Flasche etc.
 */
export function photoSrcById(id: string, fallback?: string | null): string | null {
  if (enhancedPhotos[id]) return enhancedPhotos[id];
  if (fallback) return `/media/products/${fallback}`;
  return null;
}

export function photoSrc(p: Product): string | null {
  return photoSrcById(p.id, p.photo);
}

export function hasPhoto(p: Product): boolean {
  return Boolean(enhancedPhotos[p.id] || p.photo);
}

/** True, wenn das Bild von Higgsfield kommt (bereits dunkler Studio-BG). */
export function isEnhanced(id: string): boolean {
  return Boolean(enhancedPhotos[id]);
}
