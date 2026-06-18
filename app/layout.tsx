import type { Metadata } from "next";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import ThemeProvider from "@/components/ThemeProvider";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import CookieBanner from "@/components/CookieBanner";

const SITE_URL = "https://devarchitect.com.tr";

const faqSchema = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Web sitem kaç günde hazır olur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Standart projeler 7-14 gün. İçerikleri hazır getirirseniz 7 güne inebilir.",
      },
    },
    {
      "@type": "Question",
      name: "Siteyi teslim ettikten sonra ne olur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "30 gün ücretsiz teknik destek dahil. Sonrasında aylık bakım paketi sunuyoruz.",
      },
    },
    {
      "@type": "Question",
      name: "Google Ads bütçesi ne olmalı?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Minimum ₺3.000/ay öneririz. Bütçenizi boşa harcamıyoruz — önce test, sonra ölçeklendirme.",
      },
    },
    {
      "@type": "Question",
      name: "AI otomasyon ne işime yarar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Müşteri yanıtlama, randevu takibi, lead scoring — bunları otomatik yapınca ekibiniz satışa odaklanır.",
      },
    },
    {
      "@type": "Question",
      name: "Sözleşme yapıyor musunuz?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Her proje için yazılı sözleşme ve milestone bazlı ödeme.",
      },
    },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "DevArchitect",
      url: SITE_URL,
      telephone: "+905449622337",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ankara",
        addressRegion: "Ankara",
        addressCountry: "TR",
      },
      openingHours: "Mo-Fr 09:00-18:00",
      priceRange: "₺₺",
      serviceType: [
        "Web Tasarım",
        "AI Otomasyon",
        "Google Ads",
        "E-Ticaret",
      ],
      sameAs: [
        `https://wa.me/905449622337`,
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: SITE_URL,
        },
      ],
    },
    faqSchema,
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DevArchitect | Profesyonel Web Sitesi & AI Otomasyon",
    template: "%s | DevArchitect",
  },
  description:
    "Ankara'da profesyonel web sitesi, AI otomasyon ve Google Ads hizmetleri. 7-14 günde teslimat, 30 gün ücretsiz destek. Hemen ücretsiz görüşme alın.",
  other: {
    "keywords":
      "web sitesi, Ankara web tasarım, AI otomasyon, Google Ads, dijital pazarlama, web geliştirme",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "DevArchitect",
    title: "DevArchitect | Profesyonel Web Sitesi & AI Otomasyon",
    description:
      "Ankara'da profesyonel web sitesi, AI otomasyon ve Google Ads hizmetleri. 7-14 günde teslimat, 30 gün ücretsiz destek.",
    url: SITE_URL,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DevArchitect - Profesyonel Web Çözümleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevArchitect | Profesyonel Web Sitesi & AI Otomasyon",
    description:
      "Ankara'da profesyonel web sitesi, AI otomasyon ve Google Ads hizmetleri. 7-14 günde teslimat.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      tr: SITE_URL,
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="light h-full antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || ""}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AnalyticsProvider>
          <ThemeProvider>
            {children}
            <FloatingActions />
          </ThemeProvider>
        </AnalyticsProvider>
        <CookieBanner />
      </body>
    </html>
  );
}
