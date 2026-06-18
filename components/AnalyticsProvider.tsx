"use client"

import { useEffect, useRef } from "react"
import {
  getConsent,
  initGTM,
  initClarity,
  initHotjar,
  pushEvent,
} from "@/lib/analytics"

const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || ""
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || ""
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ""

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const depthTracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    // Wait for consent — check on next tick in case CookieBanner sets it synchronously
    const check = () => {
      const consent = getConsent()
      if (consent === null) return // banner still showing
      if (!consent) return // rejected

      if (GTM_ID) initGTM(GTM_ID)
      if (CLARITY_ID) initClarity(CLARITY_ID)
      if (HOTJAR_ID) initHotjar(HOTJAR_ID)
    }

    // Check immediately and also re-check after CookieBanner might have set consent
    check()
    const timer = setTimeout(check, 500)
    return () => clearTimeout(timer)
  }, [])

  // ── Scroll depth tracking ──
  useEffect(() => {
    const scrollHeight = () => document.documentElement.scrollHeight - window.innerHeight
    const depths = [25, 50, 75, 90]

    const onScroll = () => {
      const scrolled = window.scrollY
      const total = scrollHeight()
      if (total <= 0) return
      const pct = Math.round((scrolled / total) * 100)

      for (const d of depths) {
        if (pct >= d && !depthTracked.current.has(d)) {
          depthTracked.current.add(d)
          pushEvent("scroll_depth", { depth: d, percentage: `${d}%` })
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return <>{children}</>
}
