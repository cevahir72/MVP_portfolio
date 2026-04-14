"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { initI18n } from "../lib/i18n";

initI18n();

export default function Home() {
  const { t, i18n } = useTranslation();
  const [loadingLocale, setLoadingLocale] = useState(true);

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
      } finally {
        setLoadingLocale(false);
      }
    }

    if (stored) {
      i18n.changeLanguage(stored).finally(() => setLoadingLocale(false));
    } else {
      detect();
    }
  }, [i18n]);

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

  if (loadingLocale) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-surface text-on-surface font-body">
        <span>Loading...</span>
      </main>
    );
  }

  return (
    <main className="pt-24 bg-surface font-body text-on-surface min-h-screen">
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-[0px_20px_40px_rgba(15,23,42,0.06)]">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#0051d5]">architecture</span>
            <span className="text-xl font-extrabold tracking-tighter text-[#0F172A] font-headline">
              DevArchitect
            </span>
          </button>
          <nav className="hidden md:flex gap-8 items-center">
            <a
              className="text-[#0051d5] font-bold border-b-2 border-[#0051d5] font-inter text-sm tracking-wide"
              href="#services"
            >
              {t("nav.services")}
            </a>
            <a
              className="text-[#191c1e] font-medium hover:text-[#0051d5] transition-colors duration-200 font-inter text-sm tracking-wide"
              href="/portfolio"
            >
              {t("nav.portfolio")}
            </a>
            <a
              className="text-[#191c1e] font-medium hover:text-[#0051d5] transition-colors duration-200 font-inter text-sm tracking-wide"
              href="#process"
            >
              {t("nav.process")}
            </a>
            <div className="relative group">
              <button
                type="button"
                className="text-[#191c1e] font-medium font-inter text-sm tracking-wide flex items-center gap-1 cursor-pointer"
              >
                {t("nav.ai")}
              </button>
              <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all duration-200">
                <div className="px-3 py-1 rounded-full bg-[#0F172A] text-white text-xs shadow-lg whitespace-nowrap">
                  {t("nav.aiSoon")}
                </div>
              </div>
            </div>
          </nav>
          <div className="flex items-center gap-4">
            <button
              className="text-xs font-bold border border-outline rounded-full px-2 py-1 flex items-center gap-1 cursor-pointer"
              type="button"
              onClick={toggleLocale}
            >
              <span
                className={
                  "px-2 py-0.5 rounded-full " +
                  (i18n.language === "tr" ? "bg-secondary text-on-secondary" : "")
                }
              >
                {t("localeToggle.labelTR")}
              </span>
              <span
                className={
                  "px-2 py-0.5 rounded-full " +
                  (i18n.language === "en" ? "bg-secondary text-on-secondary" : "")
                }
              >
                {t("localeToggle.labelEN")}
              </span>
            </button>
            <button
              className="bg-secondary text-on-secondary px-5 py-2 rounded-lg font-medium active:scale-95 transition-transform cursor-pointer"
              type="button"
              onClick={scrollToContact}
            >
              {t("nav.contact")}
            </button>
          </div>
        </div>
      </header>

      <div className="pt-8">
        {/* Hero Section */}
        <section className="px-6 py-12 md:py-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold tracking-widest uppercase font-label">
                {t("hero.badge")}
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight leading-[1.1] text-primary">
                {t("hero.title")}
              </h1>
              <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleWhatsAppClick}
                  className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-opacity-90 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {t("hero.primaryCta")}
                  <span className="material-symbols-outlined text-sm">chat</span>
                </button>
                <Link 
                  href="/portfolio" 
                  className="bg-surface-container-high text-on-surface px-8 py-4 rounded-lg font-bold hover:bg-surface-dim hover:-translate-y-1 text-center transition-all cursor-pointer"
                >
                  {t("hero.secondaryCta")}
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/10 to-tertiary-container/10 blur-3xl rounded-full" />
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-outline-variant/15">
                <img
                  src="/home_image.png"
                  alt="Hero Image"
                  className="w-full h-auto"
                />
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
        <section className="bg-surface text-on-surface py-24 px-6">
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
        <section className="py-24 px-6 max-w-7xl mx-auto" id="services">
          <div className="text-center mb-16">
            <span className="text-secondary font-bold tracking-widest text-xs uppercase font-label">
              {t("pricing.badge")}
            </span>
            <h2 className="text-3xl md:text-5xl font-headline font-bold mt-2">
              {t("pricing.title")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/15 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 hover:bg-surface-container-high">
              <h3 className="text-xl font-bold font-headline">{t("pricing.starter")}</h3>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-black font-headline">{t("pricing.starterPrice")}</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">{t("pricing.starterTagline")}</p>
              <ul className="space-y-4 mb-8 flex-grow">
                {(t("pricing.starterItems", { returnObjects: true }) as string[])
                  .map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-on-surface-variant/90">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 transition-transform duration-200 group-hover:scale-110">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
              <div className="border-t border-outline-variant/20 pt-3 mt-1 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest mb-2">
                  {t("pricing.starterBonusTitle")}
                </p>
                <ul className="space-y-1 text-xs text-on-surface-variant">
                  {(t("pricing.starterBonusItems", { returnObjects: true }) as string[])
                    .map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-xs mt-0.5 transition-transform duration-200 group-hover:scale-110">
                          star
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">{t("pricing.starterWho")}</p>
              <button className="w-full py-3 rounded-lg border-2 border-outline-variant text-on-surface-variant font-semibold opacity-60 cursor-pointer">
                {t("pricing.chooseStarter")}
              </button>
            </div>

            <div className="p-8 bg-surface-container-lowest rounded-xl border-2 border-secondary flex flex-col relative scale-105 shadow-xl transition-all duration-300 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(15,23,42,0.35)] hover:bg-secondary/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
              <h3 className="text-xl font-bold font-headline">{t("pricing.standard")}</h3>
              <div className="mt-4 mb-2">
                <span className="text-3xl font-black font-headline">{t("pricing.standardPrice")}</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">{t("pricing.standardTagline")}</p>
              <ul className="space-y-2 mb-4 flex-grow text-sm text-on-surface-variant">
                {(t("pricing.standardItems", { returnObjects: true }) as string[])
                  .map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 transition-transform duration-200 group-hover:scale-110">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
              <div className="border-t border-outline-variant/20 pt-3 mt-1 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest mb-2">
                  {t("pricing.standardBonusTitle")}
                </p>
                <ul className="space-y-1 text-xs text-on-surface-variant">
                  {(t("pricing.standardBonusItems", { returnObjects: true }) as string[])
                      .map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-xs mt-0.5 transition-transform duration-200 group-hover:scale-110">
                          star
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">{t("pricing.standardWho")}</p>
              <button className="w-full py-3 rounded-lg bg-secondary/20 text-on-surface-variant font-semibold opacity-70 cursor-pointer">
                {t("pricing.chooseStandard")}
              </button>
            </div>

            <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant/15 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 hover:bg-surface-container-high">
              <h3 className="text-xl font-bold font-headline">{t("pricing.premium")}</h3>
              <div className="mt-4 mb-2">
                <span className="text-3xl font-black font-headline">{t("pricing.premiumPrice")}</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">{t("pricing.premiumTagline")}</p>
              <ul className="space-y-2 mb-4 flex-grow text-sm text-on-surface-variant">
                {(t("pricing.premiumItems", { returnObjects: true }) as string[])
                  .map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-sm mt-0.5 transition-transform duration-200 group-hover:scale-110">
                        check_circle
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
              </ul>
              <div className="border-t border-outline-variant/20 pt-3 mt-1 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest mb-2">
                  {t("pricing.premiumBonusTitle")}
                </p>
                <ul className="space-y-1 text-xs text-on-surface-variant">
                  {(t("pricing.premiumBonusItems", { returnObjects: true }) as string[])
                      .map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-xs mt-0.5 transition-transform duration-200 group-hover:scale-110">
                          star
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">{t("pricing.premiumWho")}</p>
              <button className="w-full py-3 rounded-lg border-2 border-outline-variant text-on-surface-variant font-semibold opacity-60 cursor-pointer">
                {t("pricing.choosePremium")}
              </button>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-white py-24 px-6" id="process">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-secondary font-bold tracking-widest text-xs uppercase font-label">
                {t("workflow.badge")}
              </span>
              <h2 className="text-3xl md:text-5xl font-headline font-bold mt-2">
                {t("workflow.title")}
              </h2>
            </div>
            <div className="space-y-12">
              <div className="flex gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline font-black text-2xl shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-xl font-bold font-headline mb-2">
                    {t("workflow.step1Title")}
                  </h4>
                  <p className="text-on-surface-variant">{t("workflow.step1Text")}</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest text-primary flex items-center justify-center font-headline font-black text-2xl shrink-0 border-2 border-secondary">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold font-headline mb-2">
                    {t("workflow.step2Title")}
                  </h4>
                  <p className="text-on-surface-variant">{t("workflow.step2Text")}</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="w-16 h-16 rounded-full bg-surface-container-highest text-on-surface-variant/40 flex items-center justify-center font-headline font-black text-2xl shrink-0 border-2 border-outline-variant">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold font-headline mb-2">
                    {t("workflow.step3Title")}
                  </h4>
                  <p className="text-on-surface-variant">{t("workflow.step3Text")}</p>
                </div>
              </div>
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

        {/* Final CTA */}
        <section className="px-6 py-24" id="contact-section">
          <div className="max-w-5xl mx-auto bg-secondary text-on-secondary rounded-2xl p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 relative z-10">
              {t("finalCta.title")}
            </h2>
            <p className="text-xl text-on-secondary/80 mb-10 max-w-2xl mx-auto relative z-10">
              {t("finalCta.text")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
              <button
                className="bg-white text-secondary px-8 py-4 rounded-lg font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
                type="button"
                onClick={handleWhatsAppClick}
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  chat
                </span>
                {t("finalCta.whatsapp")}
              </button>
              <div className="flex flex-col text-sm text-on-secondary/90">
                <span className="font-semibold tracking-wide">
                  Tel: <a href="tel:+905449622337" className="underline underline-offset-4">+90 544 962 23 37</a>
                </span>
                <span className="font-semibold tracking-wide">
                  E-posta: <a href="mailto:kelesmevlut71@gmail.com" className="underline underline-offset-4">kelesmevlut71@gmail.com</a>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#f2f4f6] w-full mt-24">
          <div className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0051d5]">architecture</span>
                <span className="font-manrope font-black text-[#0F172A] text-lg">DevArchitect</span>
              </div>
              <p className="font-inter text-xs uppercase tracking-[0.1em] text-[#44474e]">
                {t("footer.rights")}
              </p>
            </div>
            <div className="flex gap-8">
              <a className="font-inter text-xs uppercase tracking-[0.1em] text-[#44474e] hover:text-[#0F172A] underline-offset-4 transition-opacity" href="#">
                {t("footer.privacy")}
              </a>
              <a className="font-inter text-xs uppercase tracking-[0.1em] text-[#44474e] hover:text-[#0F172A] underline-offset-4 transition-opacity" href="#">
                {t("footer.terms")}
              </a>
              <a
                className="font-inter text-xs uppercase tracking-[0.1em] text-[#44474e] hover:text-[#0F172A] underline-offset-4 transition-opacity"
                href="https://www.linkedin.com/in/mevlut-keles-435607215"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.linkedin")}
              </a>
              <a
                className="font-inter text-xs uppercase tracking-[0.1em] text-[#44474e] hover:text-[#0F172A] underline-offset-4 transition-opacity"
                href="https://github.com/cevahir72"
                target="_blank"
                rel="noreferrer"
              >
                {t("footer.github")}
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
