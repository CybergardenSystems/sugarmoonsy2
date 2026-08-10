"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { Icon } from "@/components/ui/Icon";
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

  // Menü bei Routenwechsel schließen — „adjust state during render"-Pattern
  // (react.dev), statt setState im Effect.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
            data-cart-icon
            aria-label={`Warenkorb, ${count} Artikel`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-honey/15 text-moon transition-colors hover:border-honey/40 hover:text-honey sm:h-9 sm:w-9"
          >
            <Icon name="cart" size={17} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.15rem] min-w-[1.15rem] items-center justify-center rounded-full bg-honey px-1 text-[0.62rem] font-bold leading-none text-ink ring-2 ring-night-2">
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
            className="flex h-10 w-10 items-center justify-center md:hidden"
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
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-[-1] flex flex-col bg-night/97 backdrop-blur-xl transition-opacity duration-500 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex flex-1 flex-col justify-center px-8">
          <span className="mb-8 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-moon-mute">
            Navigation
          </span>
          <ul className="flex flex-col gap-1">
            {nav.map((item, i) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-baseline gap-4 py-3 font-display text-4xl transition-all duration-500",
                      menuOpen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                      active ? "text-honey" : "text-moon hover:text-honey",
                    )}
                    style={{ transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms" }}
                  >
                    <span className="font-mono text-xs text-moon-mute group-hover:text-honey/70">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-honey/10 px-8 py-8">
          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 rounded-full bg-honey py-4 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-honey-glow"
          >
            Jetzt bestellen
            <Icon name="arrow" size={15} />
          </Link>
        </div>
      </div>
    </header>
  );
}
