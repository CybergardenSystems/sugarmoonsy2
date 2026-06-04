"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function Toast() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setMessage((e as CustomEvent<string>).detail);
      clearTimeout(timer);
      timer = setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener("sms-toast", onToast);
    return () => {
      window.removeEventListener("sms-toast", onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4"
    >
      <div
        className={`flex items-center gap-2 rounded-full border border-honey/25 bg-night-2/95 px-5 py-2.5 text-sm text-moon shadow-2xl backdrop-blur transition-all duration-300 ${
          message ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <Icon name="check" size={14} className="text-honey" />
        {message}
      </div>
    </div>
  );
}
