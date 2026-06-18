"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Globe, Bot, TrendingUp, ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { initI18n } from "../lib/i18n";
import { useTheme } from "../components/ThemeProvider";
import TrustBar from "../components/TrustBar";
import FAQ from "../components/FAQ";
import BlogSection from "../components/BlogSection";
import useScrollAnimation from "./hooks/useScrollAnimation";
import useAnalytics from "../hooks/useAnalytics";

initI18n();

export default function Home() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  useScrollAnimation();
  const { track } = useAnalytics();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("lang") : null;

    async function detect() {
      try {
        const res = await fetch("/api/geo");
        const data = await res.json();
        const country = (data.country as string | undefined) || "TR";
        const lang = country === "TR" ? "tr" : "en";
        await i18n.changeLanguage(lang);
      } catch {
        await i18n.changeLanguage("tr");
      }
    }

    if (stored) {
      i18n.changeLanguage(stored);
    } else {
      detect();
    }
  }, [i18n]);

  // ── Pricing section view tracking ──
  useEffect(() => {
    const el = document.getElementById("pricing");
    if (!el) return;
    let sent = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sent) {
          sent = true;
          track("pricing_view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [track]);

  const toggleLocale = () => {
    const next = i18n.language === "tr" ? "en" : "tr";
    i18n.changeLanguage(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", next);
    }
  };

  const scrollToTop = () => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    track("whatsapp_click");
    const phone = "905449622337"; // update with your real number, no leading +
    const message = encodeURIComponent(
      "Merhaba, web sitesi hizmetleriniz hakkında bilgi almak istiyorum."
    );

    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || "";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    const mobileUrl = `https://wa.me/${phone}?text=${message}`;
    const desktopUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${message}`;

    if (isMobile) {
      window.location.href = mobileUrl;
    } else {
      window.open(desktopUrl, "_blank");
    }
  };

  const scrollToContact = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  // ── Animated stat counter (self-observing) ──
  function AnimatedValue({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const [displayed, setDisplayed] = useState("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(el);
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!visible) { setDisplayed(""); return; }

      const match = value.match(/^(\d+)(.*)$/);
      if (!match) { setDisplayed(value); return; }

      const target = parseInt(match[1]);
      const suffix = match[2];
      const duration = 1200;
      const startTime = performance.now();
      let rafId: number;

      function animate(now: number) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        setDisplayed(current + suffix);
        if (progress < 1) rafId = requestAnimationFrame(animate);
      }

      rafId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(rafId);
    }, [visible, value]);

    return <span ref={ref}>{displayed || "0"}</span>;
  }

  // ── Animated star rating ──
  function StarRating({ rating = 5 }: { rating?: number }) {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-star" : "text-text/20"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  }

  function AvatarInitials({ name, className }: { name: string; className?: string }) {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);
    return (
      <div className={`w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center font-display font-bold text-sm text-accent ${className ?? ""}`}>
        {initials}
      </div>
    );
  }

  // ── Sticky nav state ──
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["services", "pricing", "contact-section"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen((p) => !p);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // ── Portfolio filter ──
  const [activeFilter, setActiveFilter] = useState("all");

  // ── Pricing toggle ──
  const [annualBilling, setAnnualBilling] = useState(false);

  const prices = {
    starter: { month: "₺550", year: "₺6.500" },
    pro: { month: "₺1.200", year: "₺15.000" },
    enterprise: { month: "₺2.800", year: "₺35.000" },
  };

  const plans = [
    {
      key: "starter",
      name: "Başlangıç",
      subtitle: "Web Sitesi",
      desc: "Küçük işletmenizi internete taşıyın.",
      popular: false,
      features: [
        "5 sayfa responsive tasarım",
        "14 gün teslim süresi",
        "Mobil uyumlu (%100)",
        "1 yıl ücretsiz hosting",
        "SSL sertifikası dahil",
        "Temel SEO optimizasyonu",
        "WhatsApp entegrasyonu",
        "Domain bağlantısı",
      ],
    },
    {
      key: "pro",
      name: "Profesyonel",
      subtitle: "Web + Google Ads",
      desc: "Web sitenizi reklamla büyütün.",
      popular: true,
      features: [
        "Başlangıç paketindeki her şey",
        "Google Ads kampanya kurulumu",
        "3 ay optimizasyon yönetimi",
        "Aylık performans raporu",
        "Anahtar kelime analizi",
        "Dönüşüm takibi",
        "A/B test landing page",
        "Rakip analizi",
      ],
    },
    {
      key: "enterprise",
      name: "Kurumsal",
      subtitle: "Full Stack",
      desc: "Tam kapsamlı dijital dönüşüm.",
      popular: false,
      features: [
        "Profesyonel paketindeki her şey",
        "AI otomasyon entegrasyonu",
        "CRM entegrasyonu",
        "Öncelikli destek (7/24)",
        "Özel API geliştirme",
        "Çoklu dil desteği",
        "Lead management sistemi",
        "Otomatik raporlama",
      ],
    },
  ];


  const steps = [
    { title: "Ücretsiz Görüşme", desc: "Projenizi anlayın, ihtiyaçları netleştiriyoruz.", time: "1. gün" },
    { title: "Teklif & Onay", desc: "Şeffaf fiyat, net zaman çizelgesi.", time: "2-3. gün" },
    { title: "Geliştirme", desc: "Haftalık güncellemeler, şeffaf süreç.", time: "7-14 gün" },
    { title: "Teslimat & Destek", desc: "Canlıya alım + 30 gün ücretsiz destek.", time: "14+ gün" },
  ];

  // ── Contact form state ──
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    hasWebsite: "",
    budget: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    if (!value.trim()) return "Bu alan zorunludur.";
    if (name === "name" && value.trim().length < 2) return "Ad en az 2 karakter olmalıdır.";
    if (name === "phone") {
      const cleaned = value.replace(/\s/g, "");
      if (cleaned.length < 10) return "Geçerli bir telefon numarası giriniz.";
    }
    return "";
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      const err = validateField(field, value);
      setFormErrors((prev) => {
        const next = { ...prev };
        if (err) next[field] = err;
        else delete next[field];
        return next;
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      const err = validateField(key, formData[key as keyof typeof formData]);
      if (err) errors[key] = err;
    }
    setFormErrors(errors);
    if (Object.keys(errors).length) return;
    setFormSubmitted(true);
    track("form_submit", { form_name: "ücretsiz_analiz" });
  };

  const projects = [
    { name: "Butik Pati", category: "web", result: "Google'da ilk 3'te, aylık 40+ ziyaretçi" },
    { name: "Kaya Hukuk", category: "web", result: "Kurumsal kimlik + danışmanlık sitesi, mobil uyumlu" },
    { name: "Demir Oto Sanayi", category: "web", result: "Randevu sistemi entegre, aylık 200+ lead" },
    { name: "Restoran Lezzet", category: "ads", result: "Google Ads ile aylık 150+ sipariş" },
    { name: "AI Destek Asistanı", category: "ai", result: "Müşteri temsilcisi yükü %60 azaldı" },
    { name: "Akıllı Raporlama", category: "ai", result: "Haftalık raporlar otomatik, 5 saat tasarruf" },
    { name: "Premium Kuaför", category: "ads", result: "Tıklama başı maliyet %35 düştü" },
    { name: "Yıldız Dershane", category: "ads", result: "Online kayıtlarda %50 artış" },
  ];

  return (
    <main className="pt-24 bg-surface font-body text-on-surface min-h-screen">
      {/* Sticky Navigation */}
      <header className="fixed top-0 w-full z-50 transition-all duration-300">
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            scrolled
              ? "bg-bg/80 backdrop-blur-xl border-b border-border"
              : "bg-bg"
          }`}
        />
        <div className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer group min-w-[120px] min-h-[44px]"
          >
            <span className="material-symbols-outlined text-accent text-2xl group-hover:scale-110 transition-transform">
              architecture
            </span>
            <span className="font-display font-extrabold tracking-tight text-text text-lg sm:text-xl">
              DEV<span className="text-accent">-</span>ARCHITECT
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { href: "#services", label: "Hizmetler" },
              { href: "/portfolio", label: "Projeler" },
              { href: "#pricing", label: "Fiyatlar" },
              { href: "#contact-section", label: "İletişim" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 pb-1 border-b-2 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-accent border-accent"
                    : "text-text/80 border-transparent hover:text-accent hover:border-accent"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-accent hover:text-accent/80 transition-colors p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg border border-border cursor-pointer"
              type="button"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={toggleLocale}
              className="text-xs font-bold text-text/60 hover:text-text/90 transition-colors border border-border rounded-full px-3 py-1.5 min-w-[44px] min-h-[44px] cursor-pointer"
              type="button"
            >
              {i18n.language === "tr" ? "TR" : "EN"}
            </button>
            <button
              onClick={handleWhatsAppClick}
              className="bg-accent text-text px-5 py-3 min-h-[48px] rounded-lg font-bold text-sm shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer hidden sm:inline-flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">trending_up</span>
              Ücretsiz Analiz
            </button>
            <button
              className="lg:hidden text-text p-3 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              onClick={toggleMobileMenu}
              type="button"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-bg flex flex-col items-center justify-center">
          <nav className="flex flex-col items-center gap-10">
            {[
              { href: "#services", label: "Hizmetler" },
              { href: "/portfolio", label: "Projeler" },
              { href: "#pricing", label: "Fiyatlar" },
              { href: "#contact-section", label: "İletişim" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className="text-3xl sm:text-4xl font-display font-bold text-text/90 hover:text-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => { closeMobileMenu(); handleWhatsAppClick(); }}
            className="mt-12 bg-accent text-text px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-accent/20 cursor-pointer"
          >
            Ücretsiz Analiz Al
          </button>
        </div>
      )}

      <div>
        {/* Hero Section */}
        <section
          className="relative min-h-[calc(100dvh-6rem)] bg-bg flex items-center overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-accent/[0.04] rounded-full blur-3xl" />
            <div className="absolute -top-40 -right-40 w-80 h-80 md:w-96 md:h-96 bg-accent/[0.06] rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 md:w-96 md:h-96 bg-accent/[0.06] rounded-full blur-3xl" />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
                  backgroundSize: "60px 60px",
                }}
              />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
              {/* Left Column */}
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <h1 className="font-display font-extrabold tracking-tight leading-[1.05] fade-up">
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-text block">
                    Rakipleriniz İnternette
                  </span>
                  <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-text block">
                    Görünüyor.{" "}
                    <span className="text-accent">Ya Siz?</span>
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-text-muted/80 max-w-lg mx-auto lg:mx-0 leading-relaxed fade-up" style={{ transitionDelay: "0.1s" }}>
                  {t("heroNew.subtitle")}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start fade-up" style={{ transitionDelay: "0.2s" }}>
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-accent text-text px-8 py-4 min-h-[48px] rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {t("heroNew.primaryCta")}
                    <span className="material-symbols-outlined text-xl">trending_up</span>
                  </button>
                  <Link
                    href="/portfolio"
                    className="border-2 border-border text-text px-8 py-4 min-h-[48px] rounded-xl font-bold text-base sm:text-lg hover:bg-bg-card hover:border-accent/40 active:scale-95 transition-all duration-300 text-center cursor-pointer flex items-center justify-center"
                  >
                    {t("heroNew.secondaryCta")}
                  </Link>
                </div>
              </div>

              {/* Right Column - Animated Stats Grid */}
              <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 md:gap-4">
                  {[
                    { value: t("heroNew.stat1Value"), label: t("heroNew.stat1Label") },
                    { value: t("heroNew.stat2Value"), label: t("heroNew.stat2Label") },
                    { value: t("heroNew.stat3Value"), label: t("heroNew.stat3Label") },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="scale-in"
                      style={{ transitionDelay: `${0.4 + i * 0.15}s` }}
                    >
                      <div className="bg-bg-card border border-border backdrop-blur-sm rounded-2xl p-5 md:p-6 hover:bg-bg-card-hover hover:border-accent/20 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5">
                        <div className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent tracking-tight">
                          <AnimatedValue value={stat.value} />
                        </div>
                        <div className="text-sm md:text-base text-text-muted mt-1 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        {/* Services Bento Grid */}
        <section className="bg-bg py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display">
                HİZMETLER
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-4 leading-tight">
                Tek Çatı Altında Eksiksiz Çözüm
              </h2>
              <p className="text-text-muted mt-4 max-w-2xl mx-auto text-base md:text-lg">
                Web sitesi, AI otomasyon ve Google reklamları — işletmenizi büyütmek için ihtiyacınız olan her şey.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {/* Card 1 — Web Sitesi */}
              <div className="group lg:col-span-2 bg-bg-card border border-border backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-200">
                    <Globe className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-text">
                      Web Sitesi
                    </h3>
                    <p className="text-text-muted text-sm mt-1">
                      7-14 günde canlıya alın. Mobil uyumlu, hızlı, SEO hazır.
                    </p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  İşletmenizi internette profesyonelce temsil eden, dönüşüm odaklı web siteleri. Sıfırdan tasarım veya mevcut sitenizi yenileme.
                </p>
                <ul className="space-y-2 mb-5">
                  {["Özel tasarım, mobil öncelikli", "SEO optimizasyonu dahil", "7-14 gün teslim garantisi"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-text transition-colors duration-200 group/link py-2 min-h-[44px]"
                >
                  Detayları Gör
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </div>

              {/* Card 2 — AI Otomasyon */}
              <div className="group bg-bg-card border border-border backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors duration-200">
                  <Bot className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-bold text-xl text-text mb-2">
                  AI Otomasyon
                </h3>
                <p className="text-text-muted text-sm mb-4">
                  Tekrar eden işleri otomasyona devredin. Müşteri yanıtlama, takip, raporlama.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">
                  Yapay zeka destekli araçlarla iş süreçlerinizi optimize edin, zaman kazanın ve verimliliği artırın.
                </p>
                <ul className="space-y-2 mb-5">
                  {["Müşteri yanıtlama otomasyonu", "Akıllı takip ve hatırlatma", "Detaylı raporlama paneli"].map(
                    (item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {item}
                      </li>
                    )
                  )}
                </ul>
                <a
                  href="#contact-section"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-text transition-colors duration-200 group/link py-2 min-h-[44px]"
                >
                  Detayları Gör
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </div>

              {/* Card 3 — Google Dönüşümleri */}
              <div className="group lg:col-span-3 bg-bg-card border border-border backdrop-blur-sm rounded-2xl p-6 md:p-8 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors duration-200">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-text mb-1">
                      Google Dönüşümleri
                    </h3>
                    <p className="text-text-muted text-sm mb-3">
                      Reklamınız sadece alıcılara gitsin. Dönüşüm odaklı kampanyalar.
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">
                      Google Ads ile doğru kitleye ulaşın. Her kuruşun karşılığını alın.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
                      {["Anahtar kelime ve hedefleme", "Dönüşüm takibi & optimizasyon", "Bütçe dostu kampanya yönetimi"].map(
                        (item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-text-muted">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {item}
                          </div>
                        )
                      )}
                    </div>
                    <a
                      href="#contact-section"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-text transition-colors duration-200 group/link py-2 min-h-[44px]"
                    >
                      Detayları Gör
                      <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-bg py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Part A — Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
              {[
                { value: "47+", label: "Teslim Edilen Proje" },
                { value: "94%", label: "Müşteri Memnuniyeti" },
                { value: "3", label: "Yıl Deneyim" },
                { value: "14", label: "Gün Ort. Teslimat" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-bg-card border border-border rounded-2xl p-5 md:p-6 text-center hover:bg-bg-card-hover hover:border-accent/20 transition-all duration-300"
                >
                  <div className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent tracking-tight">
                    <AnimatedValue value={stat.value} />
                  </div>
                  <div className="text-sm md:text-base text-text-muted mt-1.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Part B — Testimonials */}
            <div>
              <div className="text-center mb-12">
                <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display">
                  MÜŞTERİ YORUMLARI
                </span>
                <h2 className="font-display text-2xl md:text-4xl font-bold text-text mt-3">
                  Müşterilerimiz Ne Diyor?
                </h2>
              </div>

              <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible pb-2 md:pb-0 -mx-4 sm:-mx-0 px-4 sm:px-0">
                {[
                  {
                    name: "Ayşe Yılmaz",
                    company: "Butik Pati",
                    text: "Mevlüt bey siteyi 10 günde teslim etti, Google'da 3 ay içinde ilk sayfaya çıktık. Müşteri sayımız 2 katına çıktı. Web sitemiz sayesinde artık her gün yeni müşteri alıyoruz.",
                  },
                  {
                    name: "Mehmet Demir",
                    company: "Demir Oto Sanayi",
                    text: "Web sitemiz sayesinde artık müşteriler bizi cep telefonuyla bile kolayca buluyor. Randevu sistemimiz otomatikleşti, telefon trafiğimiz azaldı. Profesyonel ekibinizle çalışmak çok keyifliydi.",
                  },
                  {
                    name: "Elif Kaya",
                    company: "Kaya Hukuk Danışmanlık",
                    text: "Profesyonel bir web sitesi ve Google Ads ile danışmanlık firmamızın görünürlüğü arttı. Yatırımın karşılığını fazlasıyla aldık. Özellikle AI otomasyon sayesinde müşteri takibimiz çok kolaylaştı.",
                  },
                ].map((t) => (
                  <div
                    key={t.name}
                    className="snap-center shrink-0 w-[85vw] md:w-auto bg-bg-card border border-border backdrop-blur-sm rounded-2xl p-6 md:p-7 hover:bg-bg-card-hover hover:border-accent/20 transition-all duration-300"
                  >
                    <StarRating rating={5} />
                    <p className="text-sm md:text-base text-slate-300 leading-relaxed mt-4 mb-5">
                      "{t.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <AvatarInitials name={t.name} />
                      <div>
                        <div className="text-sm font-semibold text-text">
                          {t.name}
                        </div>
                        <div className="text-xs text-text-muted">
                          {t.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="bg-surface-container-low py-12">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-8">
              {t("trust.title")}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-2 font-headline font-bold text-xl">
                <span className="material-symbols-outlined">verified</span>
                LocalTrust
              </div>
              <div className="flex items-center gap-2 font-headline font-bold text-xl">
                <span className="material-symbols-outlined">rocket_launch</span>
                SwiftGrow
              </div>
              <div className="flex items-center gap-2 font-headline font-bold text-xl">
                <span className="material-symbols-outlined">storefront</span>
                ShopReady
              </div>
              <div className="flex items-center gap-2 font-headline font-bold text-xl">
                <span className="material-symbols-outlined">security</span>
                SecureWeb
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="bg-bg py-24 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display">
                PORTFÖY
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-3">
                Tamamlanan Projeler
              </h2>
              <p className="text-text-muted mt-3 max-w-xl mx-auto text-base">
                Her biri dönüşüm odaklı, mobil uyumlu ve SEO hazır olarak teslim edildi.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
              {[
                { key: "all", label: "Tümü" },
                { key: "web", label: "Web Sitesi" },
                { key: "ai", label: "AI Otomasyon" },
                { key: "ads", label: "Google Ads" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`px-4 py-2.5 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center ${
                    activeFilter === tab.key
                      ? "text-accent bg-accent/10 border-b-2 border-accent"
                      : "text-text-muted hover:text-text bg-bg-card border-b-2 border-transparent hover:border-accent/20"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {projects
                .filter(
                  (p) => activeFilter === "all" || p.category === activeFilter
                )
                .map((project) => (
                  <div
                    key={project.name}
                    className="group bg-bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-300"
                  >
                    {/* Image placeholder */}
                    <div className="relative aspect-[16/9] bg-bg-card overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <span className="font-display font-bold text-lg md:text-xl text-text/40 text-center px-4 leading-relaxed">
                          {project.name}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link
                          href="/portfolio"
                          className="px-5 py-3 min-h-[44px] bg-accent text-text rounded-lg font-bold text-sm hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
                        >
                          Projeyi İncele
                        </Link>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 md:p-6">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-semibold tracking-wide ${
                          project.category === "web"
                            ? "bg-accent/10 text-accent"
                            : project.category === "ai"
                            ? "bg-purple-500/10 text-purple-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {project.category === "web"
                          ? "Web Sitesi"
                          : project.category === "ai"
                          ? "AI Otomasyon"
                          : "Google Ads"}
                      </span>
                      <h3 className="font-display font-bold text-text text-base md:text-lg mt-3">
                        {project.name}
                      </h3>
                      <p className="text-text-muted text-sm mt-1.5 leading-relaxed">
                        {project.result}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-12">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 bg-bg-card border border-border text-text px-6 py-3 min-h-[48px] rounded-xl font-semibold text-sm hover:bg-bg-card-hover hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Tüm Projeleri Gör
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest text-xs uppercase font-label">
              {t("challenge.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-bold mt-2">
              {t("challenge.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-surface-container-lowest rounded-xl border-b-2 border-error/20 hover:border-error transition-all hover:-translate-y-2 hover:shadow-xl">
              <span className="material-symbols-outlined text-4xl text-error mb-4">search_off</span>
              <h3 className="text-xl font-bold mb-3 font-headline">
                {t("challenge.missingWebsiteTitle")}
              </h3>
              <p className="text-on-surface-variant">{t("challenge.missingWebsiteText")}</p>
            </div>
            <div className="group p-8 bg-surface-container-lowest rounded-xl border-b-2 border-error/20 hover:border-error transition-all hover:-translate-y-2 hover:shadow-xl">
              <span className="material-symbols-outlined text-4xl text-error mb-4">location_off</span>
              <h3 className="text-xl font-bold mb-3 font-headline">
                {t("challenge.hardToFindTitle")}
              </h3>
              <p className="text-on-surface-variant">{t("challenge.hardToFindText")}</p>
            </div>
            <div className="group p-8 bg-surface-container-lowest rounded-xl border-b-2 border-error/20 hover:border-error transition-all hover:-translate-y-2 hover:shadow-xl">
              <span className="material-symbols-outlined text-4xl text-error mb-4">trending_down</span>
              <h3 className="text-xl font-bold mb-3 font-headline">
                {t("challenge.losingToRivalsTitle")}
              </h3>
              <p className="text-on-surface-variant">{t("challenge.losingToRivalsText")}</p>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="bg-surface text-on-surface py-24 px-6" id="services">
          <div className="max-w-5xl mx-auto text-center">
            <span className="text-secondary font-bold tracking-widest text-xs uppercase font-label">
              {t("solution.badge")}
            </span>
            <h2 className="text-4xl md:text-6xl font-headline font-bold mt-4 mb-8 leading-tight text-primary">
              {t("solution.title")}
            </h2>
            <p className="text-xl text-on-surface-variant mb-12 max-w-2xl mx-auto">
              {t("solution.text")}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="p-4 bg-surface-container-high rounded-lg">
                <div className="text-3xl font-headline font-black text-primary">{t("solution.stat1Value")}</div>
                <div className="text-xs uppercase font-bold tracking-widest mt-1 opacity-60">
                  {t("solution.stat1Label")}
                </div>
              </div>
              <div className="p-4 bg-surface-container-high rounded-lg">
                <div className="text-3xl font-headline font-black text-primary">100%</div>
                <div className="text-xs uppercase font-bold tracking-widest mt-1 opacity-60">
                  {t("solution.stat2Label")}
                </div>
              </div>
              <div className="p-4 bg-surface-container-high rounded-lg">
                <div className="text-3xl font-headline font-black text-primary">SEO</div>
                <div className="text-xs uppercase font-bold tracking-widest mt-1 opacity-60">
                  {t("solution.stat3Label")}
                </div>
              </div>
              <div className="p-4 bg-surface-container-high rounded-lg">
                <div className="text-3xl font-headline font-black text-primary">24/7</div>
                <div className="text-xs uppercase font-bold tracking-widest mt-1 opacity-60">
                  {t("solution.stat4Label")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="bg-bg py-24 px-4 sm:px-6" id="pricing">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display">
                PAKETLER
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-3 leading-tight">
                İşletmenize Özel Çözümler
              </h2>

              {/* Toggle */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <span className={`text-sm font-medium transition-colors ${!annualBilling ? "text-text" : "text-text-muted"}`}>
                  Tek Seferlik
                </span>
                <button
                  type="button"
                  onClick={() => setAnnualBilling((p) => !p)}
                  className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full transition-colors duration-300 cursor-pointer"
                  role="switch"
                  aria-checked={annualBilling}
                >
                  <div className={`w-12 h-7 rounded-full p-0.5 flex items-center ${annualBilling ? "bg-accent" : "bg-bg-card-3"}`}>
                    <span
                      className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${annualBilling ? "translate-x-[22px]" : "translate-x-0"}`}
                    />
                  </div>
                </button>
                <span className={`text-sm font-medium transition-colors ${annualBilling ? "text-text" : "text-text-muted"}`}>
                  Aylık
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div
                  key={plan.key}
                  className={`relative flex flex-col rounded-2xl p-6 md:p-8 transition-all duration-300 ${
                    plan.popular
                      ? "bg-bg-card-hover border-2 border-accent scale-[1.02] shadow-xl shadow-accent/10 hover:shadow-accent/20 md:-translate-y-2"
                      : "bg-bg-card border border-border hover:border-accent/20 hover:-translate-y-1"
                  }`}
                >
                  {/* Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-text px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                      En Popüler
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="font-display font-bold text-xl text-text">{plan.name}</h3>
                    <p className="text-sm text-accent font-semibold mt-0.5">{plan.subtitle}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-2">
                    <span className="font-display text-4xl font-extrabold text-text tracking-tight">
                      {annualBilling ? prices[plan.key as keyof typeof prices].month : prices[plan.key as keyof typeof prices].year}
                    </span>
                    <span className="text-text-muted text-sm ml-1.5">{annualBilling ? "/ay" : "tek sefer"}</span>
                  </div>
                  <p className="text-text-muted text-xs mb-6">{plan.desc}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-accent" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={handleWhatsAppClick}
                    className={`w-full min-h-[48px] py-3 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center ${
                      plan.popular
                        ? "bg-accent text-text shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.02]"
                        : "bg-bg-card-hover text-text border border-border hover:bg-bg-card-hover hover:border-accent/40"
                    }`}
                  >
                    Teklif Al
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom note */}
            <p className="text-center text-text-muted text-xs mt-10 max-w-lg mx-auto leading-relaxed">
              Fiyatlar projeye göre değişir. Ücretsiz görüşmede kesinleştirilir.
            </p>
          </div>
        </section>

        <FAQ />

        {/* Timeline Section */}
        <section
          className="bg-bg py-24 px-4 sm:px-6 overflow-hidden"
          id="process"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display">
                SÜREÇ
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-3 leading-tight">
                Nasıl Çalışıyoruz?
              </h2>
              <p className="text-text-muted mt-3 max-w-xl mx-auto text-base">
                Projenizi anlıyor, net fiyat veriyor, hızlı teslim ediyoruz.
              </p>
            </div>

            {/* Desktop: horizontal */}
            <div className="hidden md:block">
              <div className="flex items-start gap-0" data-stagger>
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="flex-1 group fade-up"
                  >
                    {/* Circle + connector line */}
                    <div className="flex items-center mb-5">
                      <div className="w-11 h-11 rounded-full bg-bg-card border border-border flex items-center justify-center font-display font-bold text-sm text-text group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:text-accent transition-all duration-300 shrink-0 relative z-10">
                        {i + 1}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="h-px flex-1 bg-bg-card-hover group-hover:bg-accent/20 transition-colors duration-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center pr-4">
                      <h3 className="font-display font-bold text-text text-sm mb-1 group-hover:text-accent transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-text-muted text-xs leading-relaxed">
                        {step.desc}
                      </p>
                      <span className="text-accent/50 text-xs mt-1.5 inline-block">
                        {step.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical */}
            <div className="md:hidden">
              <div className="relative pl-10" data-stagger>
                <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-bg-card-hover" />
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    className="relative pb-8 last:pb-0 fade-up"
                  >
                    <div className="absolute -left-10 top-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs border bg-accent/20 border-accent/40 text-accent">
                      {i + 1}
                    </div>
                    <h3 className="font-display font-bold text-text text-sm mb-0.5">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {step.desc}
                    </p>
                    <span className="text-accent/60 text-xs mt-1 inline-block">
                      {step.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom emphasis */}
            <div className="text-center mt-16">
              <p className="font-display text-xl md:text-2xl font-bold text-text">
                Ortalama <span className="text-accent">14 gün</span> içinde canlıda
              </p>
              <p className="text-text-muted text-sm mt-2">
                Hızlı teslimat, şeffaf süreç, garantili sonuç.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-headline font-bold">{t("faq.title")}</h2>
          </div>
          <div className="space-y-4">
            <details className="group bg-surface-container-low rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer">
                <h5 className="font-bold font-headline">{t("faq.q1")}</h5>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p className="mt-4 text-on-surface-variant leading-relaxed">{t("faq.a1")}</p>
            </details>
            <details className="group bg-surface-container-low rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer">
                <h5 className="font-bold font-headline">{t("faq.q2")}</h5>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p className="mt-4 text-on-surface-variant leading-relaxed">{t("faq.a2")}</p>
            </details>
            <details className="group bg-surface-container-low rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer">
                <h5 className="font-bold font-headline">{t("faq.q3")}</h5>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p className="mt-4 text-on-surface-variant leading-relaxed">{t("faq.a3")}</p>
            </details>
            <details className="group bg-surface-container-low rounded-xl p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer">
                <h5 className="font-bold font-headline">{t("faq.q4")}</h5>
                <span className="material-symbols-outlined group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p className="mt-4 text-on-surface-variant leading-relaxed">{t("faq.a4")}</p>
            </details>
          </div>
        </section>

        <BlogSection />

        {/* Contact Form Section */}
        <section className="bg-bg py-24 px-4 sm:px-6" id="contact-section">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {/* Left — Trust column */}
              <div className="flex flex-col justify-center">
                <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display mb-4">
                  İLETİŞİM
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text leading-tight mb-4">
                  Projenizi Ücretsiz Analiz Edelim
                </h2>
                <p className="text-text-muted text-base leading-relaxed mb-8 max-w-md">
                  30 dakikalık ücretsiz görüşme ile ihtiyacınızı belirleyelim, size özel çözüm sunalım.
                </p>

                {/* Trust bullets */}
                <ul className="space-y-5 mb-10">
                  {[
                    { icon: "zap", title: "Hızlı Teslimat", desc: "Ortalama 14 günde canlıya alıyoruz." },
                    { icon: "shield", title: "Şeffaf Fiyat", desc: "Gizli ücret yok, peşin fiyat garantisi." },
                    { icon: "bar_chart", title: "Garantili Sonuç", desc: "Dönüşüm odaklı tasarım, ölçülebilir başarı." },
                  ].map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-accent text-xl mt-0.5">{item.icon}</span>
                      <div>
                        <strong className="text-text text-sm font-semibold">{item.title}</strong>
                        <p className="text-text-muted text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Avatar placeholder */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center border border-accent/20">
                    <span className="material-symbols-outlined text-accent text-2xl">person</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text">Mevlüt Keleş</div>
                    <div className="text-xs text-text-muted">Kurucu & Geliştirici</div>
                  </div>
                </div>
              </div>

              {/* Right — Form column */}
              <div className="bg-bg-card border border-border backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10">
                {formSubmitted ? (
                  /* Success state */
                  <div className="flex flex-col items-center justify-center text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-5">
                      <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-text mb-2">
                      Teşekkürler!
                    </h3>
                    <p className="text-text-muted text-sm max-w-xs">
                      En geç 4 saat içinde sizi arayacağız.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">Ad Soyad</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleFormChange("name", e.target.value)}
                        className={`w-full bg-bg-card border rounded-xl px-4 py-3 min-h-[48px] text-sm text-text placeholder-text-muted outline-none transition-colors duration-200 ${
                          formErrors.name ? "border-red-500/60" : "border-border focus:border-accent/50"
                        }`}
                        placeholder="Adınız ve soyadınız"
                      />
                      {formErrors.name && <p className="text-red-400 text-xs mt-1.5">{formErrors.name}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">Telefon *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleFormChange("phone", e.target.value)}
                        className={`w-full bg-bg-card border rounded-xl px-4 py-3 min-h-[48px] text-sm text-text placeholder-text-muted outline-none transition-colors duration-200 ${
                          formErrors.phone ? "border-red-500/60" : "border-border focus:border-accent/50"
                        }`}
                        placeholder="05XX XXX XX XX"
                      />
                      <p className="text-text-muted text-xs mt-1">WhatsApp'tan ulaşabiliriz.</p>
                      {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
                    </div>

                    {/* Service */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">Hizmet Seçimi</label>
                      <select
                        value={formData.service}
                        onChange={(e) => handleFormChange("service", e.target.value)}
                        className={`w-full bg-bg-card border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none transition-colors duration-200 appearance-none ${
                          formErrors.service ? "border-red-500/60" : "border-border focus:border-accent/50"
                        } ${formData.service ? "text-text" : "text-text-muted"}`}
                      >
                        <option value="" disabled>Seçiniz</option>
                        <option value="web">Web Sitesi</option>
                        <option value="ads">Google Ads</option>
                        <option value="ai">AI Otomasyon</option>
                        <option value="all">Tümü</option>
                      </select>
                      {formErrors.service && <p className="text-red-400 text-xs mt-1.5">{formErrors.service}</p>}
                    </div>

                    {/* Has website radio */}
                    <fieldset>
                      <legend className="block text-sm font-medium text-text mb-2">Mevcut web siteniz var mı?</legend>
                      <div className="flex gap-4">
                        {["Evet", "Hayır"].map((opt) => (
                          <label key={opt} className="flex items-center gap-2 cursor-pointer group min-h-[44px] px-3 py-2 rounded-lg hover:bg-bg-card transition-colors">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                              formData.hasWebsite === opt
                                ? "border-accent"
                                : "border-border group-hover:border-accent/40"
                            }`}>
                              {formData.hasWebsite === opt && (
                                <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                              )}
                            </div>
                            <input
                              type="radio"
                              name="hasWebsite"
                              value={opt}
                              checked={formData.hasWebsite === opt}
                              onChange={(e) => handleFormChange("hasWebsite", e.target.value)}
                              className="sr-only"
                            />
                            <span className="text-sm text-slate-300">{opt}</span>
                          </label>
                        ))}
                      </div>
                      {formErrors.hasWebsite && <p className="text-red-400 text-xs mt-1">{formErrors.hasWebsite}</p>}
                    </fieldset>

                    {/* Budget */}
                    <div>
                      <label className="block text-sm font-medium text-text mb-1.5">Bütçe Aralığı</label>
                      <select
                        value={formData.budget}
                        onChange={(e) => handleFormChange("budget", e.target.value)}
                        className={`w-full bg-bg-card border rounded-xl px-4 py-3 min-h-[48px] text-sm outline-none transition-colors duration-200 appearance-none ${
                          formErrors.budget ? "border-red-500/60" : "border-border focus:border-accent/50"
                        } ${formData.budget ? "text-text" : "text-text-muted"}`}
                      >
                        <option value="" disabled>Seçiniz</option>
                        <option value="5k-15k">₺5K - ₺15K</option>
                        <option value="15k-30k">₺15K - ₺30K</option>
                        <option value="30k+">₺30K+</option>
                      </select>
                      {formErrors.budget && <p className="text-red-400 text-xs mt-1.5">{formErrors.budget}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-accent text-text h-14 rounded-xl font-bold text-base shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      Ücretsiz Analiz Talep Et
                    </button>

                    <p className="text-center text-text-muted text-xs">
                      Bilgileriniz gizli tutulur, üçüncü tarafla paylaşılmaz.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-bg-footer border-t border-accent/20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Main grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 py-16">
              {/* Col 1 — Logo + Tagline + Social */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-accent text-2xl">architecture</span>
                  <span className="font-display font-extrabold text-text text-lg tracking-tight">
                    DEV<span className="text-accent">-</span>ARCHITECT
                  </span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  Web. AI. Dönüşüm.
                </p>
                <p className="text-text-muted text-xs leading-relaxed mb-5 max-w-xs">
                  KOBİ'lere yönelik web sitesi, AI otomasyon ve Google Ads hizmetleri.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/in/mevlut-keles-435607215"
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-lg bg-bg-card flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 border border-border transition-all duration-200 group"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-lg bg-bg-card flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 border border-border transition-all duration-200 group"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://wa.me/905449622337"
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 rounded-lg bg-bg-card flex items-center justify-center hover:bg-accent/20 hover:border-accent/30 border border-border transition-all duration-200 group"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Col 2 — Hizmetler */}
              <div>
                <h4 className="font-display font-bold text-text text-sm uppercase tracking-wider mb-4">
                  Hizmetler
                </h4>
                  <ul className="space-y-1">
                  {["Web Sitesi", "AI Otomasyon", "Google Dönüşümleri", "Teknik Destek"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#services"
                          className="text-text-muted text-sm hover:text-accent transition-colors duration-200 py-2 min-h-[44px] inline-flex items-center"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Col 3 — İletişim */}
              <div>
                <h4 className="font-display font-bold text-text text-sm uppercase tracking-wider mb-4">
                  İletişim
                </h4>
                <ul className="space-y-1 text-sm">
                  <li>
                    <a
                      href="tel:+905449622337"
                      onClick={() => track("phone_click", { phone_number: "+905449622337" })}
                      className="text-text-muted hover:text-accent transition-colors duration-200 py-2 min-h-[44px] inline-flex items-center"
                    >
                      +90 544 962 23 37
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:kelesmevlut71@gmail.com"
                      className="text-text-muted hover:text-accent transition-colors duration-200 py-2 min-h-[44px] inline-flex items-center"
                    >
                      kelesmevlut71@gmail.com
                    </a>
                  </li>
                  <li className="text-text-muted py-2">
                    Ankara, Türkiye
                  </li>
                  <li>
                    <a
                      href="https://maps.google.com/?q=Ankara"
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent text-xs font-medium hover:underline inline-flex items-center gap-1 py-2 min-h-[44px]"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Haritada Gör
                    </a>
                  </li>
                </ul>
              </div>

              {/* Col 4 — Mini CTA */}
              <div>
                <h4 className="font-display font-bold text-text text-sm uppercase tracking-wider mb-2">
                  Projenizi Konuşalım
                </h4>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  Ücretsiz 30 dk danışmanlık. İhtiyacınızı birlikte belirleyelim.
                </p>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-accent text-text px-5 py-3 min-h-[48px] rounded-lg font-bold text-sm shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Randevu Al
                </button>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 border-t border-border">
              <p className="text-text-muted text-xs">
                © 2024 DevArchitect. Tüm hakları saklıdır.
              </p>
              <div className="flex items-center gap-5">
                <a
                  href="#"
                  className="text-text-muted text-xs hover:text-slate-300 transition-colors py-2 min-h-[44px] inline-flex items-center"
                >
                  Gizlilik Politikası
                </a>
                <a
                  href="#"
                  className="text-text-muted text-xs hover:text-slate-300 transition-colors py-2 min-h-[44px] inline-flex items-center"
                >
                  Çerez Bildirimi
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
