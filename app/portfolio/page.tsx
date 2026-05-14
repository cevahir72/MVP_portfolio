"use client";
import { useState } from "react";
import Link from "next/link";

export default function PortfolioPage() {
  type ShowcaseItem = {
    id: number;
    title: string;
    label: string;
    description: string;
    image: string;
    demoUrl?: string;
  };

  type Category = {
    id: number;
    title: string;
    summary: string;
    img: string;
    colSpan: string;
    examples: ShowcaseItem[];
  };

  const demoLinks = {
    beauty: "https://kuafor-theta.vercel.app/",
    auto: "https://auto-gallery-demo-client.vercel.app/",
    wedding: "https://wedding-orcin-alpha.vercel.app/",
  };

  const categories: Category[] = [
    {
      id: 1,
      title: "Güzellik Merkezi & Estetik",
      summary: "Online randevu, uzman profilleri ve dönüşüm odaklı önce/sonra galerileriyle premium bir güzellik deneyimi sunar.",
      img: "/kuaffor_1.png",
      colSpan: "md:col-span-2 md:row-span-2 min-h-[420px] md:min-h-0",
      examples: [
        {
          id: 101,
          title: "Beauty Studio Canlı Demo",
          label: "Canlı Yayında",
          description: "Ziyaretçinin saniyeler içinde randevuya geçtiği, hizmet paketleri ve uzman ekibin net sunulduğu canlı örnek site.",
          image: "/kuaffor.png",
          demoUrl: demoLinks.beauty,
        },
        {
          id: 102,
            title: "Sağlık ve Güzellik Merkezi",
          label: "Lead Toplama",
          description: "Kampanya, işlem detayları ve WhatsApp yönlendirmesiyle reklam trafiğini sıcak talebe dönüştüren vitrin yapısı.",
          image: "/kuaffor_1.png",
            demoUrl: "https://hairdresser-demo-two.vercel.app/",
        },
      ],
    },
    {
      id: 2,
      title: "Oto Servis, Tamir & Galeri",
      summary: "Acil çağrı, konum paylaşımı ve araç vitrini birleşimiyle servis ve galeri müşterisini aynı akışta toplar.",
      img: "/oto_1.png",
      colSpan: "col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 201,
            title: "Oto Galeri",
          label: "Canlı Yayında",
          description: "Mobil öncelikli acil yardım, hizmet listesi ve hızlı teklif alma modülleriyle çalışan canlı örnek site.",
          image: "/oto_sanayi.png",
          demoUrl: demoLinks.auto,
        },
        {
          id: 202,
          title: "Araç Galeri Vitrini",
          label: "Listeleme Kurgusu",
          description: "Stoktaki araçları güven veren kartlarla öne çıkaran, filtre ve iletişim odaklı galeri sayfası taslağı.",
          image: "/oto_1.png",
        },
      ],
    },
    {
      id: 3,
      title: "Restoran, Kafe & Bistro",
      summary: "QR menü, sipariş ve rezervasyon kurgusuyla masadan telefona kadar hızlı ve şık bir deneyim verir.",
      img: "/restorant_1.png",
      colSpan: "col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 301,
          title: "Bistro Menü Deneyimi",
          label: "Menü Akışı",
          description: "Telefon ekranında okunaklı dijital menü, kampanya alanları ve hızlı rezervasyon butonlarıyla kafe odaklı yapı.",
          image: "/restorant.png",
        },
        {
          id: 302,
          title: "Restoran Sipariş Vitrini",
          label: "Sipariş Odaklı",
          description: "Paket servis, öne çıkan lezzetler ve yorum bloklarıyla sipariş kararını hızlandıran landing page kurgusu.",
          image: "/restorant_1.png",
        },
      ],
    },
    {
      id: 4,
      title: "Pet Shop & Veteriner",
      summary: "Randevu, hizmet paketleri ve acil ulaşım alanlarını birleştirerek güven odaklı bir veteriner görünümü oluşturur.",
      img: "/petshop_1.png",
      colSpan: "md:col-span-2 col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 401,
          title: "Veteriner Klinik Tanıtımı",
          label: "Güven İnşası",
          description: "Hekim kadrosu, klinik imkanları ve online randevu formunu aynı akışta toplayan tanıtım sitesi örneği.",
          image: "/petshop_1.png",
            demoUrl: "https://veteriner-navy.vercel.app/",
        },
        {
          id: 402,
          title: "Pet Shop Ürün Vitrini",
          label: "Mağaza Deneyimi",
          description: "Mama, aksesuar ve kampanya ürünlerini kategorili biçimde sergileyen hafif e-ticaret ön yüz kurgusu.",
          image: "/petshop_1.png",
        },
      ],
    },
    {
      id: 5,
      title: "Kırtasiye & Kitabevi",
      summary: "Sezon ürünleri, okul listeleri ve popüler kitap raflarını sade bir vitrin mantığında öne çıkarır.",
      img: "/kirtasiye_1.png",
      colSpan: "col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 501,
          title: "Okul Dönemi Ürün Vitrini",
          label: "Sezon Kampanyası",
          description: "Defter, çanta ve kırtasiye setlerini hızlı erişimli kategorilerle sunan dönemsel satış sayfası.",
          image: "/kirtasiye_1.png",
        },
        {
          id: 502,
          title: "Kitabevi Seçki Sayfası",
          label: "Editör Önerileri",
          description: "Yeni çıkanlar, çok satanlar ve etkinlik duyurularını aynı çatı altında sunan kültürel mağaza yapısı.",
          image: "/kirtasiye_1.png",
        },
      ],
    },
    {
      id: 6,
      title: "Market & Şarküteri",
      summary: "Mahalle müşterisine ürün vitrini, hızlı sipariş ve anlık iletişim kanallarıyla doğrudan ulaşır.",
      img: "/manav_1.png",
      colSpan: "col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 601,
          title: "Şarküteri Sipariş Hattı",
          label: "WhatsApp Satış",
          description: "Peynir, zeytin ve günlük ürünleri tek dokunuşla WhatsApp siparişine dönüştüren kompakt sayfa yapısı.",
          image: "/butik.png",
        },
        {
          id: 602,
          title: "Market Kampanya Afişi",
          label: "Yerel Dönüşüm",
          description: "Günün fırsatlarını, açık saat bilgisini ve bölgesel teslimat mesajını öne çıkaran landing page kurgusu.",
          image: "/manav_1.png",
        },
      ],
    },
    {
      id: 7,
      title: "Fotoğraf & Prodüksiyon",
      summary: "Portfolyo, çekim paketleri ve teklif toplama akışını görsel ağırlıklı bir düzende sergiler.",
      img: "/fotograf_1.png",
      colSpan: "col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 701,
          title: "Prodüksiyon Showreel Sayfası",
          label: "Portfolyo Odaklı",
          description: "Video işleri, referans markalar ve teklif formunu sinematik bir vitrinle bir araya getiren yapı.",
          image: "/fotograf_1.png",
        },
        {
          id: 702,
          title: "Fotoğrafçı Paket Landing",
          label: "Teklif Toplama",
          description: "Düğün, etkinlik ve stüdyo çekim paketlerini net fiyat bloklarıyla anlatan dönüşüm sayfası.",
          image: "/fotograf_1.png",
        },
      ],
    },
    {
      id: 8,
      title: "Kurumsal & Danışmanlık",
      summary: "Prestij, uzmanlık ve güveni öne çıkaran kurumsal yapı; içerik ve lead form dengesini birlikte sunar.",
      img: "/kurumsal.png",
      colSpan: "col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 801,
          title: "Kurumsal Hizmet Vitrini",
          label: "Prestij Sunumu",
          description: "Hizmet alanları, ekip profilleri ve referans logolarıyla güven oluşturan klasik kurumsal yapı.",
          image: "/kurumsal.png",
        },
        {
          id: 802,
          title: "Danışmanlık Lead Sayfası",
          label: "Randevu Talebi",
          description: "Uzmanlık alanları, vaka örnekleri ve toplantı talep formuyla yeni müşteri akışını hızlandıran sayfa.",
          image: "/kurumsal_1.png",
        },
      ],
    },
    {
      id: 9,
      title: "Düğün & Event",
      summary: "Düğün organizasyonları, etkinlik planlaması ve davetiye tasarımlarıyla unutulmaz anlar yaratır.",
      img: "/dugun.png",
      colSpan: "col-span-1 row-span-1 min-h-[200px]",
      examples: [
        {
          id: 901,
          title: "Düğün Organizasyonu",
          label: "Canlı Demo",
          description: "Düğün planlaması, davetiye tasarımı ve etkinlik yönetimi için kapsamlı web sitesi çözümü.",
          image: "/dugun.png",
          demoUrl: demoLinks.wedding,
        },
      ],
    },
  ];

  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id ?? 1);

  const activeCategory = categories.find((category) => category.id === selectedCategoryId) ?? categories[0];

  const portfolios = [
    { 
      id: 1, 
      title: "Restoran, Kafe & Bistro", 
      frontSubtitle: "Online Menü ve Sipariş", 
      backTitle: "Lezzeti Dijitale Taşıyın", 
      backDesc: "QR ve Canlı Menü entegrasyonu, Google Maps yorumlarını çekme ve doğrudan WhatsApp'tan sipariş modülü.",
      btnText: "Demoyu İncele",
      image: "/restorant.png"
    },
    { 
      id: 2, 
      title: "Güzellik Merkezi & Estetik", 
      frontSubtitle: "7/24 Online Randevu", 
      backTitle: "Müşterileriniz Beklemesin", 
      backDesc: "7/24 Online randevu sistemi, vurucu Öncesi/Sonrası güzellik galerisi ve uzman çalışan profillerinin tanıtımı.",
      btnText: "Demoyu İncele",
      image: "/kuaffor.png",
      demoUrl: demoLinks.beauty,
    },
    { 
      id: 3, 
      title: "Oto Servis, Tamir & Galeri", 
      frontSubtitle: "Konum ve Acil Yardım", 
      backTitle: "Yolda Kalan Sizi Bulsun", 
      backDesc: "Mobilde devasa boyutlarda 'Acil Ara' ve 'Konum Gönder' butonları. Kaporta, mekanik gibi hizmetleriniz için hızlı erişim.",
      btnText: "Demoyu İncele",
      image: "/oto_sanayi.png",
      demoUrl: demoLinks.auto,
    },
    { 
      id: 4, 
      title: "Market & Şarküteri", 
      frontSubtitle: "Hızlı WhatsApp Sipariş", 
      backTitle: "Mahallenin Gücü", 
      backDesc: "WhatsApp üzerinden tek tıkla ürün siparişi, çok satanlar için basit ürün vitrini ve 'Açık/Kapalı' dijital tabela.",
      btnText: "Demoyu İncele",
      image: "/butik.png"
    },
    { 
      id: 5, 
      title: "Kurumsal & Danışmanlık", 
      frontSubtitle: "Prestij ve Güven", 
      backTitle: "Mesleki Duruş", 
      backDesc: "Avukat, Danışman ve Mali Müşavirler için prestijli imaj. Güçlü SEO altyapısı ve imaj artırıcı makale sayfası.",
      btnText: "Demoyu İncele",
      image: "/kurumsal.png"
    },
  ];

  const openCategoryInquiry = (categoryName: string, exampleTitle?: string) => {
    const phone = "905449622337";
    const message = encodeURIComponent(
      exampleTitle
        ? `Merhaba, ${categoryName} kategorisindeki ${exampleTitle} örneğine benzer bir web sitesi hakkında bilgi almak istiyorum.`
        : `Merhaba, ${categoryName} kategorisi için hazırladığınız web sitesi çözümleri hakkında bilgi almak istiyorum.`
    );
    const ua = navigator.userAgent || "";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    if (isMobile) {
      window.open(`https://wa.me/${phone}?text=${message}`, "_self");
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank");
    }
  };

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    document.getElementById("category-showcase")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShowcaseClick = (categoryTitle: string, item: ShowcaseItem) => {
    if (item.demoUrl) {
      window.open(item.demoUrl, "_blank", "noopener,noreferrer");
      return;
    }

    openCategoryInquiry(categoryTitle, item.title);
  };

  return (
    <main className="min-h-screen bg-[#f7f9fb] font-body text-on-surface">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <span className="material-symbols-outlined text-secondary group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="text-xl font-extrabold tracking-tighter text-[#0F172A] font-headline">
              DevArchitect
            </span>
          </Link>
        </div>
      </header>

      <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto">
        {/* Banner / Hero Portfolyolar Kısmı (Kitap Sayfası Efekti) */}
        <section className="mb-24 flex flex-col items-center">
          <div className="text-center mb-12">
            <span className="text-secondary font-bold tracking-widest text-xs uppercase font-label">
              Öne Çıkan Çalışmalarımız
            </span>
            <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2 text-[#0F172A]">
              Eşsiz Portföyümüz
            </h1>
            <p className="mt-4 text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
              İşletmenizi dijital dünyada bir adım öne çıkaracak örnek çalışmalarımıza göz atın.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full mt-8">
            {portfolios.map((item) => (
              <div key={item.id} className="group h-95 w-full perspective-[1000px] cursor-pointer">
                <div className="relative h-full w-full transform-3d rounded-2xl shadow-xl transition-all duration-700 group-hover:transform-[rotateY(180deg)]">
                  
                  {/* Ön Yüz */}
                  <div className="absolute inset-0 flex h-full w-full backface-hidden flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white">
                    <div className="w-full h-3/5 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover absolute inset-0" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-center items-center text-center">
                      <h3 className="text-xl font-bold font-headline text-[#0F172A] leading-tight">{item.title}</h3>
                      <p className="text-xs font-semibold text-secondary mt-1">{item.frontSubtitle}</p>
                      <p className="text-[10px] text-on-surface-variant mt-auto uppercase tracking-wider opacity-60">Hover edip arka yüzü gör</p>
                    </div>
                  </div>

                  {/* Arka Yüz */}
                  <div className="absolute inset-0 flex h-full w-full transform-[rotateY(180deg)] flex-col items-center justify-center rounded-2xl bg-linear-to-br from-secondary to-blue-400 p-6 text-center text-white backface-hidden">
                    <h3 className="text-lg font-bold font-headline mb-3">{item.backTitle}</h3>
                    <p className="text-sm opacity-90 leading-relaxed mb-6">
                      {item.backDesc}
                    </p>
                    {item.demoUrl ? (
                      <a
                        href={item.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="cursor-pointer px-5 py-2 bg-white text-secondary rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-transform shadow-md"
                      >
                        {item.btnText}
                      </a>
                    ) : (
                      <span className="px-5 py-2 bg-white/20 text-white rounded-full font-bold text-xs shadow-md cursor-not-allowed">
                        Demo Yakında
                      </span>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Kategoriler Grid Bölümü (Bento Katmanı) */}
        <section className="pt-16 border-t border-slate-200">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-[#0F172A]">
              Sektörlere Özel Çözümler
            </h2>
            <p className="mt-4 text-on-surface-variant font-medium text-lg leading-relaxed">
              10+ farklı sektörde çalışmaya hazır, <span className="text-secondary font-bold">Google uyumlu ve SEO destekli</span> mimarilerimizle işletmenizi yarın sabah dijitale taşıyalım.
            </p>
          </div>

          {/* Bento Grid Yapısı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[200px] gap-4 md:gap-6">
            {categories.map((category) => (
              <div 
                key={category.id} 
                onClick={() => handleCategoryClick(category.id)}
                className={`group relative bg-white rounded-3xl p-6 shadow-sm border cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-end ${category.colSpan} ${selectedCategoryId === category.id ? "border-secondary shadow-xl ring-2 ring-secondary/20" : "border-slate-100 hover:border-primary/40"}`}
              >
                {/* Arka Plan Fotoğraf Alanı */}
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-5xl text-slate-300 group-hover:scale-110 group-hover:text-primary transition-all duration-300 z-10">
                    add_photo_alternate
                  </span>
                  {/* FOTOĞRAF EKLENECEK ALAN */}
                  <img src={category.img} alt={category.title} className="w-full h-full object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent"></div>
                </div>

                {/* İçerik (Bento Hücresi Alt Kısmı) */}
                <div className="relative z-20 mt-auto flex items-end justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-white drop-shadow-lg group-hover:text-blue-300 transition-colors">{category.title}</h3>
                    <p className="text-xs text-white/80 mt-1 uppercase tracking-wider font-bold">
                      {selectedCategoryId === category.id ? "Kategori Açık" : "Örnekleri Gör"}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-sm">
                      {selectedCategoryId === category.id ? "check_circle" : "gallery_thumbnail"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="category-showcase" className="mt-12 rounded-[32px] border border-slate-200 bg-white p-6 md:p-10 shadow-[0_24px_80px_rgba(15,23,42,0.08)] scroll-mt-32">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="text-secondary font-bold tracking-widest text-xs uppercase font-label">
                  Seçili Kategori
                </span>
                <h3 className="mt-2 text-3xl md:text-4xl font-headline font-bold text-[#0F172A]">
                  {activeCategory.title}
                </h3>
                <p className="mt-4 text-base md:text-lg text-on-surface-variant leading-relaxed">
                  {activeCategory.summary}
                </p>
              </div>
              <div className="inline-flex items-center gap-3 self-start rounded-full bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                <span className="material-symbols-outlined text-secondary">view_carousel</span>
                {activeCategory.examples.length} örnek kart sergileniyor
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {activeCategory.examples.map((item) => (
                <article
                  key={item.id}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-secondary shadow-sm">
                      {item.label}
                    </div>
                  </div>

                  <div className="flex h-[260px] flex-col p-6">
                    <h4 className="text-xl font-headline font-bold text-[#0F172A]">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                      {item.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {item.demoUrl ? "Canlı örnek hazır" : "Benzer yapı hazırlanır"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleShowcaseClick(activeCategory.title, item)}
                        className={`cursor-pointer rounded-full px-5 py-2 text-xs font-bold transition-transform active:scale-95 ${item.demoUrl ? "bg-secondary text-white hover:scale-105" : "bg-[#0F172A] text-white hover:scale-105"}`}
                      >
                        {item.demoUrl ? "Demoyu Aç" : "Bu Yapıyı İste"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
