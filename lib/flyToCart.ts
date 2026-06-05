/** Stößt die „Tropfen-fliegt-in-den-Warenkorb"-Animation an (von Klick-Koordinaten). */
export function flyToCart(x: number, y: number) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sms-fly", { detail: { x, y } }));
}
