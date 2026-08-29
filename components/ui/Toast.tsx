"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import type { ToastPayload } from "@/lib/toast";
import { cn } from "@/lib/cn";

/**
 * Eine Toast-Anzeige mit zwei Live-Regions: Erfolge polite (status),
 * Fehler assertive (alert) und ohne Häkchen-Ikonografie (Council R1).
 */
export function Toast() {
  const [current, setCurrent] = useState<ToastPayload | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      const detail = (e as CustomEvent<ToastPayload>).detail;
      setCurrent(detail);
      clearTimeout(timer);
      timer = setTimeout(
        () => setCurrent(null),
        detail.variant === "error" ? 5000 : 2600,
      );
    };
    window.addEventListener("sms-toast", onToast);
    return () => {
      window.removeEventListener("sms-toast", onToast);
      clearTimeout(timer);
    };
  }, []);

  const isError = current?.variant === "error";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4">
      {/* Zwei permanente Live-Regions, damit AT Änderungen zuverlässig meldet */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {current && !isError ? current.message : ""}
      </div>
      <div role="alert" aria-atomic="true" className="sr-only">
        {current && isError ? current.message : ""}
      </div>

      <div
        aria-hidden={!current}
        className={cn(
          "flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm text-moon shadow-2xl backdrop-blur transition-[translate,opacity,border-color] duration-300 ease-out-expo",
          isError ? "border-amber/50 bg-night-2/95" : "border-honey/25 bg-night-2/95",
          current ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <Icon
          name={isError ? "alert" : "check"}
          size={14}
          className={isError ? "text-amber" : "text-honey"}
        />
        {current?.message}
      </div>
    </div>
  );
}
