export function createWhatsAppLink(message: string) {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const number = configured.replace(/\D/g, "");
  const base = number ? `https://wa.me/${number}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
}

export type AnalyticsEvent =
  | "catalog_request"
  | "advisor_click"
  | "customization_click"
  | "category_click"
  | "lead_form_submit"
  | "floating_whatsapp_click";

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("af-mayorista:event", { detail: { event, params } }));

  const w = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (type: "event", eventName: string, params?: Record<string, string>) => void;
    fbq?: (type: "trackCustom", eventName: string, params?: Record<string, string>) => void;
  };

  w.dataLayer?.push({ event, ...params });
  w.gtag?.("event", event, params);
  w.fbq?.("trackCustom", event, params);
}
