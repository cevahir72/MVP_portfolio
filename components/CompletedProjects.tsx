"use client"

import { useState, useEffect, useRef, useMemo } from "react"

interface Project {
  name: string
  url: string
  sector: string
  flag: string
  tags: string[]
  result: string
  image: string
  filter: string
}

const projects: Project[] = [
  {
    name: "Bold Wealth Management",
    url: "https://www.boldwealthmanagement.com/",
    sector: "Emlak & Yatırım Danışmanlığı",
    flag: "🇺🇸",
    tags: ["Web Sitesi", "AI Asistan"],
    result: "AI chat asistanı ile 7/24 müşteri yönlendirme",
    image: "/images/bold-wealth.webp",
    filter: "web ai",
  },
  {
    name: "Möbel Montage Leipzig",
    url: "http://möbelmontageleipzig.com",
    sector: "Mobilya Montaj Hizmeti",
    flag: "🇩🇪",
    tags: ["Web Sitesi", "AI Resepsiyonist"],
    result: "AI resepsiyonist ile randevu taleplerini otomatikleştirdi",
    image: "/images/mobel-montage.webp",
    filter: "web ai",
  },
  {
    name: "Cool Kids Sports Center",
    url: "https://www.coolkidssportscenter.com/",
    sector: "Çocuk Spor Kompleksi",
    flag: "🇹🇷",
    tags: ["Web Sitesi", "Google Ads"],
    result: "Google Ads ile üye sayısı 3 ayda %60 arttı",
    image: "/images/cool-kids.webp",
    filter: "web ads",
  },
  {
    name: "Volanetti",
    url: "https://www.volanetti.com/",
    sector: "Ahşap & Kumaş Toptancısı",
    flag: "🇺🇸",
    tags: ["Web Sitesi"],
    result: "B2B toptan platform — 'Trade Access' üyelik sistemi",
    image: "/images/volanetti.webp",
    filter: "web",
  },
  {
    name: "Adalina Event Hall",
    url: "https://wedding-orcin-alpha.vercel.app/",
    sector: "Düğün & Nişan Salonu",
    flag: "🇹🇷",
    tags: ["Web Sitesi"],
    result: "Ankara nişan salonu aramasında ilk sayfaya girdi",
    image: "/images/adalina.webp",
    filter: "web",
  },
  {
    name: "Salon De Coiffure",
    url: "https://kuafor-theta.vercel.app/",
    sector: "Bay & Bayan Kuaför",
    flag: "🇹🇷",
    tags: ["Web Sitesi"],
    result: "Online randevu sistemi entegrasyonu",
    image: "/images/salon-coiffure.webp",
    filter: "web",
  },
  {
    name: "ESK Packaging",
    url: "https://www.eskpackaging.com/",
    sector: "Paketleme Ürünleri Toptancısı",
    flag: "🇺🇸",
    tags: ["Web Sitesi", "Google Ads"],
    result: "E-ticaret entegrasyonu + Google Ads ile ABD pazarına giriş",
    image: "/images/esk-packaging.webp",
    filter: "web ads",
  },
  {
    name: "Elite Motors",
    url: "https://auto-gallery-demo-client.vercel.app/",
    sector: "Araba Galerisi",
    flag: "🇹🇷",
    tags: ["Web Sitesi"],
    result: "Araç filtreleme & online randevu sistemi ile lead artışı",
    image: "/images/elite-motors.webp",
    filter: "web",
  },
  {
    name: "Fatma Kurt Güzellik",
    url: "https://hairdresser-demo-two.vercel.app/",
    sector: "Sağlık & Güzellik Merkezi",
    flag: "🇹🇷",
    tags: ["Web Sitesi"],
    result: "Hizmet kataloğu + online randevu ile müşteri akışı düzenlendi",
    image: "/images/fatma-kurt.webp",
    filter: "web",
  },
]

const filterTabs = [
  { key: "all", label: "Tümü" },
  { key: "web", label: "Web Sitesi" },
  { key: "ads", label: "Google Ads" },
  { key: "ai", label: "AI Asistan" },
]

const clientLogos = [
  "Bold Wealth",
  "Möbel Montage",
  "Cool Kids",
  "Volanetti",
  "Adalina Hall",
  "Salon Coiffure",
  "ESK Pack.",
  "Elite Motors",
  "Fatma Kurt",
]

export default function CompletedProjects() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [revealedIndices, setRevealedIndices] = useState<number[]>([])
  const [containerClass, setContainerClass] = useState("")
  const sectionRef = useRef<HTMLElement>(null)

  const filteredProjects = useMemo(
    () =>
      projects.filter(
        (p) =>
          activeFilter === "all" || p.filter.split(" ").includes(activeFilter)
      ),
    [activeFilter]
  )

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const section = sectionRef.current
    if (!section) return

    if (reduced) {
      setRevealedIndices(filteredProjects.map((_, i) => i))
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()

        filteredProjects.forEach((_, i) => {
          setTimeout(() => {
            setRevealedIndices((prev) =>
              prev.includes(i) ? prev : [...prev, i]
            )
          }, i * 80)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(section)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = (key: string) => {
    if (key === activeFilter) return

    setContainerClass("opacity-0 scale-[0.97]")
    setRevealedIndices([])

    setTimeout(() => {
      setActiveFilter(key)

      setTimeout(() => {
        setContainerClass("opacity-100 scale-100")

        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
        const len = projects.filter(
          (p) => key === "all" || p.filter.split(" ").includes(key)
        ).length

        if (reduced) {
          setRevealedIndices(Array.from({ length: len }, (_, i) => i))
        } else {
          Array.from({ length: len }, (_, i) => i).forEach((i) => {
            setTimeout(() => {
              setRevealedIndices((prev) =>
                prev.includes(i) ? prev : [...prev, i]
              )
            }, i * 80)
          })
        }
      }, 50)
    }, 200)
  }

  return (
    <section ref={sectionRef} className="bg-bg py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text">
            Müşterilerimizin Başarısı
          </h2>
          <p className="text-text-muted mt-3 text-base">
            Türkiye, ABD ve Almanya&apos;da 9 tamamlanan proje
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
          role="tablist"
        >
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleFilterChange(tab.key)}
              role="tab"
              aria-selected={activeFilter === tab.key}
              className={`px-5 py-2.5 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeFilter === tab.key
                  ? "bg-[#22D3EE] text-[#0F172A] font-semibold"
                  : "bg-transparent border border-[rgba(255,255,255,0.08)] text-text-muted hover:border-[#22D3EE] hover:text-text"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-200 ${containerClass}`}
        >
          {filteredProjects.map((project, idx) => {
            const revealed = revealedIndices.includes(idx)
            return (
              <div
                key={project.name}
                role="article"
                className="portfolio-card bg-[#1E293B] border border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-[#22D3EE] transition-all duration-250 ease-out"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)`,
                  transitionDelay: revealed ? `${idx * 80}ms` : "0ms",
                }}
              >
                {/* Preview block */}
                <div className="card-preview">
                  <img
                    src={project.image}
                    alt={`${project.name} web sitesi ekran görüntüsü`}
                    loading="lazy"
                  />
                  <div className="card-overlay" />
                  {/* <span className="card-label">{project.name}</span> */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} projesini görüntüle`}
                    className="card-visit"
                  >
                    Siteyi Gör &rarr;
                  </a>
                </div>

                {/* Info block */}
                <div className="p-4">
                  <h3 className="font-display font-medium text-[15px] text-text">
                    {project.name}
                  </h3>
                  <p className="text-[13px] text-text-muted mt-1">
                    {project.sector}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#22D3EE]/10 text-[#22D3EE]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[13px] text-slate-400 italic border-l-2 border-[#22D3EE] pl-3 mt-3 leading-relaxed">
                    {project.result}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Client Logo Strip */}
        <div className="mt-20">
          <p className="text-center text-xs font-bold text-text-muted uppercase tracking-[0.15em] mb-8">
            Güvendikleri markalar
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {clientLogos.map((logo) => (
              <div
                key={logo}
                className="w-24 h-10 bg-[#1E293B] rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center grayscale hover:grayscale-0 hover:border-[#22D3EE]/30 transition-all duration-300"
              >
                <span className="text-[10px] text-text-muted font-medium px-2 text-center leading-tight">
                  {logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
