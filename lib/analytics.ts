/**
 * Analytics — GA4 + GTM + Clarity
 *
 * GTM ID:  NEXT_PUBLIC_GTM_ID
 * GA4 ID:  NEXT_PUBLIC_GA_ID
 * Clarity: NEXT_PUBLIC_CLARITY_ID
 * Hotjar:  NEXT_PUBLIC_HOTJAR_ID
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
    gtag: (...args: unknown[]) => void
    clarity: ((command: string, ...args: unknown[]) => void) & { q?: unknown[] }
    hj: ((...args: unknown[]) => void) & { q?: unknown[] }
    _hjSettings: { hjid: string; hjsv: number }
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ""
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""

export type AnalyticsEventName =
  | "form_submit"
  | "whatsapp_click"
  | "phone_click"
  | "portfolio_view"
  | "pricing_view"
  | "scroll_depth"

export function pushEvent(name: AnalyticsEventName, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: name,
    page_location: window.location.href,
    ...params,
  })
}

export function gtagConfig(params: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag("config", GA_ID, params)
}

export function gtagEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !window.gtag) return
  window.gtag("event", name, params)
}

export function getConsent(): boolean | null {
  if (typeof window === "undefined") return null
  const val = localStorage.getItem("cookie-consent")
  if (val === "true") return true
  if (val === "false") return false
  return null
}

export function setConsent(given: boolean) {
  localStorage.setItem("cookie-consent", String(given))
}

export function initClarity(id: string) {
  if (typeof window === "undefined" || !id) return
  window.clarity = window.clarity || function (...args: unknown[]) { (window.clarity.q = window.clarity.q || []).push(args) }
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.clarity.ms/tag/${id}`
  document.head.appendChild(script)
}

export function initHotjar(id: string) {
  if (typeof window === "undefined" || !id) return
  window.hj = window.hj || function (...args: unknown[]) { (window.hj.q = window.hj.q || []).push(args) }
  window._hjSettings = { hjid: id, hjsv: 6 }
  const script = document.createElement("script")
  script.async = true
  script.src = `https://static.hotjar.com/c/hotjar-${id}.js?sv=6`
  document.head.appendChild(script)
}

export function initGTM(id: string) {
  if (typeof window === "undefined" || !id) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" })
  const script = document.createElement("script")
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`
  document.head.appendChild(script)
}
