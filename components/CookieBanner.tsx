"use client"

import { useState, useEffect } from "react"
import { getConsent, setConsent, initGTM, initClarity, initHotjar } from "@/lib/analytics"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || ""
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || ""
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID || ""

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = getConsent()
    if (consent === null) setVisible(true)
  }, [])

  const accept = () => {
    setConsent(true)
    setVisible(false)
    if (GTM_ID) initGTM(GTM_ID)
    if (CLARITY_ID) initClarity(CLARITY_ID)
    if (HOTJAR_ID) initHotjar(HOTJAR_ID)
  }

  const reject = () => {
    setConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-bg-card border-t border-border p-4 md:p-5 shadow-2xl">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-text-muted leading-relaxed flex-1">
          Size en iyi deneyimi sunmak için çerezler ve benzer teknolojiler kullanıyoruz.
          Devam ederek çerez kullanımını kabul etmiş olursunuz. Detaylar için{" "}
          <a href="/kvkk" className="text-accent underline hover:no-underline">
            KVKK Aydınlatma Metni
          </a>
          ’ni inceleyebilirsiniz.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={reject}
            className="text-xs font-medium text-text-muted hover:text-text px-4 py-2 rounded-xl border border-border hover:border-accent/30 transition-colors duration-200 cursor-pointer"
          >
            Reddet
          </button>
          <button
            type="button"
            onClick={accept}
            className="text-xs font-bold text-bg px-5 py-2 rounded-xl bg-accent hover:bg-accent/90 transition-colors duration-200 cursor-pointer"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  )
}
