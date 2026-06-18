"use client"

import { useCallback } from "react"
import { pushEvent, type AnalyticsEventName } from "@/lib/analytics"

export default function useAnalytics() {
  const track = useCallback((name: AnalyticsEventName, params?: Record<string, unknown>) => {
    pushEvent(name, params)
  }, [])

  return { track }
}
