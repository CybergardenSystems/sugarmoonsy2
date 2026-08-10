import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // 301-Redirect-Map: alte WordPress-URLs → neue Informationsarchitektur.
  // Achtung: Sources matchen case-insensitiv — `/Bio-Zertifizierung` liegt
  // deshalb in middleware.ts (exakter String-Vergleich), sonst entsteht eine
  // Redirect-Schleife auf die Zielroute (Council Runde 1, B1).
  async redirects() {
    return [
      { source: "/datenschutzerklaerung", destination: "/datenschutz", statusCode: 301 },
      { source: "/wo-wir-ausstellen", destination: "/ausstellungen", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
      {
        // Medien sind faktisch unveränderlich (Änderung = neuer Dateiname).
        source: "/media/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
