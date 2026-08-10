import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 301-Redirect-Map: alte WordPress-URLs → neue Informationsarchitektur,
  // damit bestehende Rankings/Backlinks nicht verbrennen (siehe
  // docs/rebuild/CONTENT_INVENTORY.md §IA). Trailing-Slash-Varianten
  // normalisiert Next automatisch.
  async redirects() {
    return [
      { source: "/datenschutzerklaerung", destination: "/datenschutz", statusCode: 301 },
      { source: "/Bio-Zertifizierung", destination: "/bio-zertifizierung", statusCode: 301 },
      { source: "/wo-wir-ausstellen", destination: "/ausstellungen", statusCode: 301 },
    ];
  },
};

export default nextConfig;
