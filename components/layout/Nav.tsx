"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { nav } from "@/data/site";
import { cn } from "@/lib/cn";

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Hauptnavigation"
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-6",
          stuck
            ? "border-honey/15 bg-night-2/85 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border-transparent bg-night-2/30 backdrop-blur-md",
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group relative font-mono text-[0.68rem] uppercase tracking-[0.18em] text-moon-dim transition-colors hover:text-honey"
              >
                {item.label}
                <span className="absolute -bottom-1.5 left-1/2 h-px w-0 -translate-x-1/2 bg-honey transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={open}
            aria-label={`Warenkorb, ${count} Artikel`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-honey/15 text-moon transition-colors hover:border-honey/40 hover:text-honey"
          >
            <CartGlyph />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-honey px-1 text-[0.6rem] font-bold text-ink">
                {count}
              </span>
            )}
          </button>

          <Link
            href="/shop"
            className="hidden rounded-full bg-honey px-5 py-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-honey-glow sm:inline-block"
          >
            Bestellen
          </Link>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menü"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 block h-px w-5 bg-moon transition-all duration-300",
                  menuOpen ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 block h-px w-5 bg-moon transition-all duration-300",
                  menuOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 block h-px w-5 bg-moon transition-all duration-300",
                  menuOpen ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[-1] flex flex-col items-center justify-center gap-7 bg-night/97 backdrop-blur-xl transition-all duration-500 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-display text-3xl text-moon transition-colors hover:text-honey"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/shop"
          className="mt-3 rounded-full bg-honey px-7 py-3 font-mono text-xs uppercase tracking-widest text-ink"
        >
          Jetzt bestellen
        </Link>
      </div>
    </header>
  );
}

function CartGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 4h2l2.4 12.3a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.78L21 8H6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
