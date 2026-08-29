"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reaktiver Media-Query-Wert über useSyncExternalStore — SSR-sicher
 * (Server liefert `serverDefault`), ohne setState-in-Effect.
 */
export function useMediaQuery(query: string, serverDefault = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverDefault,
  );
}

const emptySubscribe = () => () => {};

/** false während SSR/Hydration, true sobald der Client übernommen hat. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
