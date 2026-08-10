"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartItem {
  key: string;
  id: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  photo: string | null;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sms-cart-v1";
export const MAX_QTY = 99;

/** Schema-Guard für localStorage-Daten (Council R1, B5): nur valide Items laden. */
function isCartItem(x: unknown): x is CartItem {
  if (typeof x !== "object" || x === null) return false;
  const i = x as Record<string, unknown>;
  return (
    typeof i.key === "string" &&
    typeof i.id === "string" &&
    typeof i.name === "string" &&
    typeof i.size === "string" &&
    typeof i.price === "number" &&
    Number.isFinite(i.price) &&
    typeof i.qty === "number" &&
    Number.isInteger(i.qty) &&
    i.qty >= 1 &&
    (i.photo === null || typeof i.photo === "string")
  );
}

function parseStoredCart(raw: string): CartItem[] | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed) || !parsed.every(isCartItem)) return null;
    return parsed.map((i) => ({ ...i, qty: Math.min(MAX_QTY, i.qty) }));
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Persistierten Warenkorb einmalig nach der Hydration laden. Der Set nach
  // Mount ist hier bewusst: ein Lazy-Init aus localStorage würde SSR- und
  // Client-Markup auseinanderlaufen lassen (Hydration-Mismatch am Badge).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = parseStoredCart(raw);
        if (stored) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- Hydration aus externem Speicher, siehe oben
          setItems(stored);
        } else {
          // Kaputtes/fremdes Schema würde sonst bei jedem Besuch erneut crashen.
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration to avoid clobbering).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage full / unavailable */
    }
  }, [items, hydrated]);

  // Scroll hinter dem Sheet sperren — Lenis-unabhängig (Council R1: die
  // Klasse `.lenis` setzt Lenis selbst; bei reduced-motion existiert sie nie,
  // `.lenis.lenis-stopped` matchte dann nicht und die Seite scrollte weiter).
  useEffect(() => {
    document.documentElement.classList.toggle("sms-locked", isOpen);
    document.documentElement.classList.toggle("lenis-stopped", isOpen);
    return () => {
      document.documentElement.classList.remove("sms-locked", "lenis-stopped");
    };
  }, [isOpen]);

  const add: CartContextValue["add"] = useCallback((item, qty = 1) => {
    const key = `${item.id}::${item.size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i,
        );
      }
      return [...prev, { ...item, key, qty: Math.min(MAX_QTY, qty) }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.key === key ? { ...i, qty: Math.min(MAX_QTY, Math.max(1, qty)) } : i,
      ),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, count, total, isOpen, add, setQty, remove, clear, open, close }),
    [items, count, total, isOpen, add, setQty, remove, clear, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

export const formatMoney = (n: number) =>
  n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) +
  " €";
