/** Winziger Event-Bus für Toasts (entkoppelt Auslöser von der UI). */

export type ToastVariant = "success" | "error";

export interface ToastPayload {
  message: string;
  variant: ToastVariant;
}

export function toast(message: string, variant: ToastVariant = "success") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ToastPayload>("sms-toast", { detail: { message, variant } }),
  );
}
