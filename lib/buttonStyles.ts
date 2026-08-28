/**
 * Gemeinsame Button-Rezepte für die Kaufstrecke — eine Quelle statt acht
 * Einzelimplementierungen (Council R1, Design#4). MagneticButton nutzt
 * dieselbe Formsprache für Marketing-CTAs.
 */
export const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-honey text-ink text-sm font-semibold transition-[background-color,border-color,color,scale] duration-150 ease-out-expo active:scale-[0.97] hover:bg-honey-glow shadow-[0_10px_30px_-8px_rgba(232,178,94,0.35)]";

export const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-honey/40 text-honey text-sm font-semibold transition-[background-color,border-color,color,scale] duration-150 ease-out-expo active:scale-[0.97] hover:border-honey hover:bg-honey/10";
