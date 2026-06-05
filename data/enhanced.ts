/**
 * Higgsfield-aufgewertete Produktfotos (nano_banana_pro): die echten Flaschen
 * der Inhaber, auf sauberen dunklen Studio-Hintergrund relightet.
 *
 * Liegen auf Higgsfields öffentlicher CDN (die Build-Umgebung kann die Bytes
 * nicht herunterladen → kein Self-Hosting aus dieser Session möglich). next/image
 * optimiert sie zur Laufzeit; der Host ist in next.config remotePatterns erlaubt.
 * Zum Self-Hosting später einfach herunterladen, nach /public/media/products/
 * legen und diese Map leeren (dann greift der lokale getönte Fallback).
 */
const BASE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_39b5wB7nN2eeHNQBagWbEKccwjN/";

export const enhancedPhotos: Record<string, string> = {
  pistazie: BASE + "hf_20260604_221042_7cb66307-92e5-4bdb-b4eb-514f2e5236d0.png",
  vanille: BASE + "hf_20260604_221133_5236383d-a200-4420-9b06-dbf24b57b626.png",
  zimt: BASE + "hf_20260604_221136_41a7f109-28ed-46e9-a6cf-7068dad82c27.png",
  spekulatius: BASE + "hf_20260604_221138_1e653e74-1664-4ad9-b15c-c1e8ce7ee4d1.png",
  lebkuchen: BASE + "hf_20260604_221141_ca1e43d9-9ea4-43b7-ad26-3737da80ea51.png",
  "lavendel-blaubeere":
    BASE + "hf_20260604_221143_00c3015e-9c38-44fa-ac46-f31a46dba340.png",
  "blaubeer-basilikum":
    BASE + "hf_20260604_221146_7d1ea446-9a2f-44a5-bbc3-8cb7ea33413b.png",
  kokos: BASE + "hf_20260604_221148_c28b34d3-c0fd-4219-86ad-8cf66b7b46d8.png",
  "vanille-extrakt":
    BASE + "hf_20260604_221151_d1a4e826-6f82-4fc7-a534-bc0c347180cf.png",
  "geschenk-lebkuchenmann":
    BASE + "hf_20260604_221154_f080f130-6b69-46ef-9e74-dff9c68ef2ba.png",

  // Studio-Renderings (text-to-image) für die Sorten ohne Originalfoto.
  bratapfel: BASE + "hf_20260604_225449_316a1d26-49dc-4509-9554-47de5c8efadf.png",
  "pumpkin-spice":
    BASE + "hf_20260604_225451_5186ca6a-c7d5-4fc7-9bbc-ba007397569e.jpeg",
};
