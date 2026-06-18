import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      nav: {
        services: "Services",
        portfolio: "Portfolio",
        process: "Process",
        ai: "AI Automations",
        aiSoon: "Coming soon...",
        contact: "Contact",
      },
      hero: {
        badge: "Expert Freelance Developer",
        title: "I build simple websites that bring you more customers.",
        subtitle:
          "Affordable, fast, and professional websites tailored specifically for small businesses looking to grow.",
        primaryCta: "Get Your Website",
        secondaryCta: "View Example",
      },
      heroNew: {
        title: "Your Competitors Are Online. Are You?",
        subtitle: "Website + AI automation + Google Conversions. Under one roof.",
        primaryCta: "Get Free Analysis",
        secondaryCta: "View Our Work",
        stat1Value: "47",
        stat1Label: "Projects Delivered",
        stat2Value: "94%",
        stat2Label: "Client Satisfaction",
        stat3Value: "14",
        stat3Label: "Avg. Delivery (Days)",
      },
      trust: {
        title: "Helping local businesses go online",
      },
      challenge: {
        badge: "The Challenge",
        title: "Is your business invisible?",
        missingWebsiteTitle: "Missing Website",
        missingWebsiteText:
          "If you're not on the web, you don't exist for 80% of modern customers searching for services.",
        hardToFindTitle: "Hard to Find",
        hardToFindText:
          "Customers can't find your phone number, address, or hours without a central online hub.",
        losingToRivalsTitle: "Losing to Rivals",
        losingToRivalsText:
          "Your competitors look more professional and reliable with their polished, modern websites.",
      },
      solution: {
        badge: "The Solution",
        title:
          "I create a fast, modern website for your business in a few days.",
        text:
          "Stop overcomplicating your web presence. I focus on what actually drives sales: speed, clarity, and mobile-first design.",
        stat1Value: "3 Days",
        stat1Label: "Avg. Delivery",
        stat2Label: "Mobile Score",
        stat3Label: "Ready",
        stat4Label: "Support",
      },
      pricing: {
        badge: "Pricing",
        title: "Transparent Packages",
        starter: "Starter (Starter Site)",
        starterPrice: "₺6.500",
        starterTagline: "Package to get small businesses online",
        starterItems: [
          "Single-page scroll landing layout",
          "Sections: Hero, About, Services, Vision & Mission, Contact",
          "Contact section with WhatsApp button",
          "Google Maps integration",
          "100% responsive (mobile friendly)",
          "Performance-optimized fast loading",
          "Basic SEO (title, description, indexing)",
          "Domain connection (client provides domain)",
          "Production-ready deployment and go-live setup",
        ],
        starterBonusTitle: "Bonus",
        starterBonusItems: [
          "Free SSL certificate (we handle everything)",
          "1 year free hosting",
          "One-click WhatsApp contact",
        ],
        starterWho: "Best for driving schools, hairdressers, and small local shops.",

        standard: "Standard (Growth Site)",
        standardPrice: "₺10.500",
        standardTagline: "For businesses that want to look more professional",
        standardItems: [
          "Everything in Starter package",
          "Multi-page structure (Home, Services, About, Contact)",
          "Blog system (critical for SEO)",
          "Parallax and modern UI animations",
          "Advanced SEO settings",
          "Google Maps plus guidance to optimize your business listing",
          "Simple admin panel for adding blog posts (optional)",
          "Contact form with email sending",
        ],
        standardBonusTitle: "Bonus",
        standardBonusItems: [
          "Infrastructure ready to make you more visible on Google",
          "1 month free support",
        ],
        standardWho:
          "Ideal for competitive businesses like courses, clinics, and consultancies.",

        premium: "Premium (Lead Machine)",
        premiumPrice: "₺38.000",
        premiumTagline: "Where you really start to stand out",
        premiumItems: [
          "Everything in Standard package",
          "Fully custom design (no template, tailored to your business)",
          "Dedicated landing page for ads",
          "Lead-generation system (form + WhatsApp funnel)",
          "Advanced SEO (schema markup, technical SEO)",
          "Google Analytics setup",
          "Meta Pixel setup for ads",
          "Performance optimization targeting 90+ Lighthouse score",
          "Competitor analysis and content recommendations",
        ],
        premiumBonusTitle: "Bonus",
        premiumBonusItems: [
          "A website that actively brings you customers",
          "Ad-ready infrastructure",
          "3 months of support",
        ],
        premiumWho: "Perfect if you want your website to be a lead machine.",

        chooseStarter: "Choose Starter",
        chooseStandard: "Choose Standard",
        choosePremium: "Choose Premium",
      },
      workflow: {
        badge: "The Workflow",
        title: "How we get you online",
        step1Title: "Send Info",
        step1Text:
          "Fill out a simple form about your business, logo, and services. No technical talk required.",
        step2Title: "I Build",
        step2Text:
          "I design and develop your custom site in 3-5 days. You'll get a preview link to suggest changes.",
        step3Title: "Go Live",
        step3Text:
          "Once you're 100% happy, we launch your site to the world. Your business is now open 24/7 online.",
      },
      faq: {
        title: "Frequently Asked Questions",
        q1: "How much does it really cost?",
        a1:
          "The price you see is what you pay. No hidden monthly fees for the build. You only pay for your domain and hosting (approx $4.5/mo) which I set up for you.",
        q2: "How long will it take?",
        a2:
          "Typically, a standard 5-page website takes 3 to 7 working days once I have all your content and images.",
        q3: "What support do I get after launch?",
        a3:
          "I provide 30 days of free support for any tweaks. After that, I'm available for hourly updates or a monthly maintenance plan.",
        q4: "What if I don't have a domain?",
        a4:
          "No problem! I'll guide you through purchasing your domain name (e.g., yourbusiness.com) and handle all the technical connection work.",
      },
      finalCta: {
        title: "Let's get your business online.",
        text:
          "Ready to attract more customers? Message me now for a free consultation and a quote for your project.",
        whatsapp: "WhatsApp Me",
        schedule: "Schedule a Call",
      },
      footer: {
        rights: "© 2024 DevArchitect. Built with editorial precision.",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        linkedin: "LinkedIn",
        github: "Github",
      },
      localeToggle: {
        labelTR: "TR",
        labelEN: "EN",
      },
    },
  },
  tr: {
    translation: {
      nav: {
        services: "Hizmetler",
        portfolio: "Portföy",
        process: "Süreç",
        ai: "AI Otomasyonları",
        aiSoon: "Yakında...",
        contact: "İletişim",
      },
      hero: {
        badge: "Uzman Serbest Geliştirici",
        title: "Size daha fazla müşteri getiren basit web siteleri yapıyorum.",
        subtitle:
          "Özellikle büyümek isteyen küçük işletmeler için tasarlanmış, hızlı, profesyonel ve uygun maliyetli web siteleri.",
        primaryCta: "Web Sitenizi Yaptırın",
        secondaryCta: "Örneğe Göz At",
      },
      heroNew: {
        title: "Rakipleriniz İnternette Görünüyor. Ya Siz?",
        subtitle: "Web sitesi + AI otomasyon + Google Dönüşümleri. Tek çatı altında.",
        primaryCta: "Ücretsiz Analiz Al",
        secondaryCta: "Projelerimizi Gör",
        stat1Value: "47",
        stat1Label: "Proje Teslim Edildi",
        stat2Value: "%94",
        stat2Label: "Müşteri Memnuniyeti",
        stat3Value: "14",
        stat3Label: "Ortalama Teslim (Gün)",
      },
      trust: {
        title: "Yerel işletmelerin internete açılmasına yardımcı oluyorum",
      },
      challenge: {
        badge: "Zorluk",
        title: "İşletmeniz görünmez mi?",
        missingWebsiteTitle: "Web Sitesi Yok",
        missingWebsiteText:
          "İnternette yoksanız, hizmet arayan modern müşterilerin %80'i için aslında hiç yoksunuz.",
        hardToFindTitle: "Bulunması Zor",
        hardToFindText:
          "Merkezi bir web siteniz yoksa müşteriler telefon numaranızı, adresinizi veya çalışma saatlerinizi bulamaz.",
        losingToRivalsTitle: "Rakiplere Kaybediyorsunuz",
        losingToRivalsText:
          "Rakipleriniz, modern ve temiz web siteleriyle sizden daha profesyonel ve güvenilir görünüyor.",
      },
      solution: {
        badge: "Çözüm",
        title:
          "İşletmeniz için birkaç gün içinde hızlı ve modern bir web sitesi hazırlıyorum.",
        text:
          "Web varlığınızı gereksiz yere karmaşıklaştırmayın. Ben satış getiren asıl şeylere odaklanıyorum: hız, açıklık ve mobil odaklı tasarım.",
        stat1Value: "3 Gün",
        stat1Label: "Ortalama Teslim",
        stat2Label: "Mobil Skor",
        stat3Label: "Hazır",
        stat4Label: "Destek",
      },
      pricing: {
        badge: "Fiyatlandırma",
        title: "Şeffaf Paketler",
        starter: "Başlangıç (Starter Site)",
        starterPrice: "6.500 TL",
        starterTagline: "Küçük işletmeleri internete sokma paketi",
        starterItems: [
          "Tek sayfa scroll landing yapı",
          "Bölümler: Hero/Banner, Hakkımızda, Hizmetler, Vizyon & Misyon, İletişim",
          "İletişim alanı + WhatsApp butonu",
          "Google Maps entegrasyonu",
          "%100 mobil uyumlu (responsive)",
          "Hızlı açılan performans odaklı yapı",
          "Temel SEO (title, description, indexleme)",
          "Domain bağlantısı (müşteri sağlar)",
          "Canlıya çıkma ve deployment süreci",
        ],
        starterBonusTitle: "Bonus",
        starterBonusItems: [
          "SSL Sertifikası (ÜCRETSİZ – biz hallediyoruz)",
          "1 yıl hosting (ÜCRETSİZ)",
          "WhatsApp’tan tek tık iletişim",
        ],
        starterWho: "Sürücü kursu, kuaför, küçük esnaf için ideal.",

        standard: "Standart (Growth Site)",
        standardPrice: "10.500 TL",
        standardTagline: "Bir tık profesyonelleşmek isteyen işletmeler için",
        standardItems: [
          "1. paketteki her şey",
          "Çok sayfalı yapı (Home, Hizmetler, Hakkımızda, İletişim)",
          "Blog altyapısı (SEO için çok kritik)",
          "Parallax ve modern UI animasyonlar",
          "Gelişmiş SEO ayarları",
          "Google Maps + işletme optimizasyon yönlendirmesi",
          "Basit admin panel (blog ekleme için, istenirse)",
          "İletişim formu (mail gönderimi)",
        ],
        standardBonusTitle: "Bonus",
        standardBonusItems: [
          "Google’da daha görünür olmanız için altyapı hazır",
          "1 ay ücretsiz destek",
        ],
        standardWho:
          "Rekabetin yüksek olduğu kurslar, klinikler, danışmanlıklar için ideal.",

        premium: "Premium (Lead Machine)",
        premiumPrice: "38.000 TL",
        premiumTagline: "Fark yarattığınız ve asıl kazancın başladığı paket",
        premiumItems: [
          "2. paketteki her şey",
          "Özel tasarım (template değil, işletmeye özel)",
          "Reklam için ayrı landing page",
          "Lead toplama sistemi (form + WhatsApp funnel)",
          "Gelişmiş SEO (schema, teknik SEO)",
          "Google Analytics kurulumu",
          "Meta Pixel kurulumu (reklamlar için)",
          "Hız optimizasyonu (90+ Lighthouse hedefi)",
          "Rakip analizi + içerik önerisi",
        ],
        premiumBonusTitle: "Bonus",
        premiumBonusItems: [
          "Size gerçekten müşteri getiren web sitesi",
          "Reklam uyumlu altyapı",
          "3 ay destek",
        ],
        premiumWho: "Web sitenizi bir lead makinesine dönüştürmek isteyenler için.",

        chooseStarter: "Başlangıç Paketini Seç",
        chooseStandard: "Standart Paketini Seç",
        choosePremium: "Premium Paketini Seç",
      },
      workflow: {
        badge: "İş Akışı",
        title: "Sizi nasıl internete taşıyorum",
        step1Title: "Bilgileri Gönderin",
        step1Text:
          "İşletmeniz, logonuz ve hizmetleriniz hakkında basit bir form doldurmanız yeterli. Teknik terim yok.",
        step2Title: "Ben İnşa Ederim",
        step2Text:
          "Özel sitenizi 3-5 gün içinde tasarlayıp kodlarım. Yorum yapabilmeniz için size bir önizleme linki gönderirim.",
        step3Title: "Yayına Alırız",
        step3Text:
          "%100 memnun olduğunuzda sitenizi dünyaya açarız. Artık işletmeniz 7/24 internette açık.",
      },
      faq: {
        title: "Sık Sorulan Sorular",
        q1: "Gerçekten ne kadar maliyetli?",
        a1:
          "Gördüğünüz fiyat, ödediğiniz fiyattır. Geliştirme için gizli aylık ücret yok. Sadece alan adı ve hosting (aylık yaklaşık $4.5) ödersiniz, kurulumunu ben yaparım.",
        q2: "Ne kadar sürer?",
        a2:
          "Standart bir 5 sayfalı web sitesi, içerik ve görseller elime ulaştıktan sonra genellikle 3–7 iş günü içinde tamamlanır.",
        q3: "Yayın sonrası nasıl destek alırım?",
        a3:
          "İnce ayarlar için 30 gün ücretsiz destek sunuyorum. Sonrasında saatlik güncelleme veya aylık bakım paketi ile devam edebilirsiniz.",
        q4: "Alan adım yoksa ne olacak?",
        a4:
          "Sorun değil! Alan adınızı (örneğin isletmeniz.com) satın alma sürecinde sizi yönlendiririm ve tüm teknik bağlantıları ben yaparım.",
      },
      finalCta: {
        title: "İşletmenizi internete taşıyalım.",
        text:
          "Daha fazla müşteri çekmeye hazır mısınız? Ücretsiz danışmanlık ve projeniz için fiyat teklifi almak için bana şimdi yazın.",
        whatsapp: "WhatsApp'tan Yaz",
        schedule: "Görüşme Planla",
      },
      footer: {
        rights:
          "© 2024 DevArchitect. Editoryal hassasiyetle hazırlanmıştır.",
        privacy: "Gizlilik Politikası",
        terms: "Kullanım Şartları",
        linkedin: "LinkedIn",
        github: "Github",
      },
      localeToggle: {
        labelTR: "TR",
        labelEN: "EN",
      },
    },
  },
};

let initialized = false;

export function initI18n() {
  if (initialized) return;

  i18n.use(initReactI18next).init({
    resources,
    lng: "tr",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  initialized = true;
}

export default i18n;
