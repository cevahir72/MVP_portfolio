"use client"

import { useState } from "react"

const faqs = [
  {
    q: "Web sitem kaç günde hazır olur?",
    a: "Standart projeler 7-14 gün. İçerikleri hazır getirirseniz 7 güne inebilir.",
  },
  {
    q: "Siteyi teslim ettikten sonra ne olur?",
    a: "30 gün ücretsiz teknik destek dahil. Sonrasında aylık bakım paketi sunuyoruz.",
  },
  {
    q: "Google Ads bütçesi ne olmalı?",
    a: "Minimum ₺3.000/ay öneririz. Bütçenizi boşa harcamıyoruz — önce test, sonra ölçeklendirme.",
  },
  {
    q: "AI otomasyon ne işime yarar?",
    a: "Müşteri yanıtlama, randevu takibi, lead scoring — bunları otomatik yapınca ekibiniz satışa odaklanır.",
  },
  {
    q: "Sözleşme yapıyor musunuz?",
    a: "Evet. Her proje için yazılı sözleşme ve milestone bazlı ödeme.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-bg py-24 px-4 sm:px-6" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display">
            SSS
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-3 leading-tight">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-text-muted mt-3 max-w-xl mx-auto text-base">
            Aklınıza takılan her şeyi burada yanıtlıyoruz.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className="border border-border rounded-2xl overflow-hidden transition-colors duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer bg-bg-card hover:bg-bg-card-hover transition-colors duration-300"
                >
                  <span
                    className={`font-display font-bold text-sm md:text-base transition-colors duration-300 ${
                      isOpen ? "text-accent" : "text-text"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 shrink-0 text-text-muted transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                <div
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen ? `${faq.a.length}px` : "0",
                    overflow: "hidden",
                  }}
                >
                  <div className="px-6 pb-5">
                    <p className="text-text-muted text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
