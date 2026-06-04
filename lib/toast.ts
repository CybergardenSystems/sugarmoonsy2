/** Winziger Event-Bus für Toasts (entkoppelt Auslöser von der UI). */
export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sms-toast", { detail: message }));
}
