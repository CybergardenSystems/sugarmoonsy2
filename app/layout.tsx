import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import { site } from "@/data/site";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartLayer } from "@/components/cart/CartLayer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Cursor } from "@/components/layout/Cursor";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Toast } from "@/components/ui/Toast";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Bio-Sirup-Manufaktur Fulda`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} – Bio-Sirup-Manufaktur Fulda`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "de_DE",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0e1a14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <CartProvider>
          <SmoothScroll>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-honey focus:px-4 focus:py-2 focus:text-ink"
            >
              Zum Inhalt springen
            </a>
            <div className="vignette" aria-hidden />
            <div className="grain" aria-hidden />
            <Cursor />
            <Nav />
            <main id="main">{children}</main>
            <Footer />
            <CartLayer />
            <Toast />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
