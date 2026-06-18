"use client"

const items = [
  "✦ 47+ Tamamlanan Proje",
  "✦ Google Partner",
  "✦ 14 Gün Teslimat Garantisi",
  "✦ 30 Gün Ücretsiz Destek",
  "✦ Şeffaf Fiyatlandırma",
  "✦ WhatsApp Destek",
]

export default function TrustBar() {
  return (
    <div className="relative bg-bg-card border-y border-border overflow-hidden py-3 select-none">
      {/* Fade-out masks */}
      <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-bg-card to-transparent" />
      <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-bg-card to-transparent" />

      <div className="group flex overflow-hidden">
        <div className="flex animate-marquee gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {items.map((item) => (
            <span
              key={item}
              className="text-sm text-text-muted"
            >
              {item}
            </span>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex animate-marquee gap-12 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {items.map((item) => (
            <span
              key={item}
              className="text-sm text-text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
