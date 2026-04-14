"use client";
import Link from "next/link";

export default function PortfolioPage() {
  const categories = [
    { id: 1, title: "Kuaför & Güzellik", img: "/kuaffor_1.png", colSpan: "md:col-span-2 md:row-span-2 min-h-[420px] md:min-h-0" },
    { id: 2, title: "Oto Servis & Tamir", img: "/oto_1.png", colSpan: "col-span-1 row-span-1 min-h-[200px]" },
    { id: 3, title: "Restoran & Kafe", img: "/restorant_1.png", colSpan: "col-span-1 row-span-1 min-h-[200px]" },
    { id: 4, title: "Pet Shop", img: "/petshop_1.png", colSpan: "md:col-span-2 col-span-1 row-span-1 min-h-[200px]" },
    { id: 5, title: "Kırtasiye", img: "/kirtasiye_1.png", colSpan: "col-span-1 row-span-1 min-h-[200px]" },
    { id: 6, title: "Yerel Market", img: "/manav_1.png", colSpan: "col-span-1 row-span-1 min-h-[200px]" },
    { id: 7, title: "Fotoğrafçı", img: "/fotograf_1.png", colSpan: "col-span-1 row-span-1 min-h-[200px]" },
    { id: 8, title: "Kurumsal Uzman", img: "/kurumsal.png", colSpan: "col-span-1 row-span-1 min-h-[200px]" },
  ];

  const portfolios = [
    { 
      id: 1, 
      title: "Restoran & Kafe", 
      frontSubtitle: "Online Menü ve Sipariş", 
      backTitle: "Lezzeti Dijitale Taşıyın", 
      backDesc: "QR ve Canlı Menü entegrasyonu, Google Maps yorumlarını çekme ve doğrudan WhatsApp'tan sipariş modülü.",
      btnText: "Demoyu İncele",
      image: "/restorant.png"
    },
    { 
      id: 2, 
      title: "Güzellik & Kuaför", 
      frontSubtitle: "7/24 Online Randevu", 
      backTitle: "Müşterileriniz Beklemesin", 
      backDesc: "7/24 Online randevu sistemi, vurucu Öncesi/Sonrası güzellik galerisi ve uzman çalışan profillerinin tanıtımı.",
      btnText: "Demoyu İncele",
      image: "/kuaffor.png"
    },
    { 
      id: 3, 
      title: "Oto Servis & Tamir", 
      frontSubtitle: "Konum ve Acil Yardım", 
      backTitle: "Yolda Kalan Sizi Bulsun", 
      backDesc: "Mobilde devasa boyutlarda 'Acil Ara' ve 'Konum Gönder' butonları. Kaporta, mekanik gibi hizmetleriniz için hızlı erişim.",
      btnText: "Demoyu İncele",
      image: "/oto_sanayi.png"
    },
    { 
      id: 4, 
      title: "Yerel Esnaf & Market", 
      frontSubtitle: "Hızlı WhatsApp Sipariş", 
      backTitle: "Mahallenin Gücü", 
      backDesc: "WhatsApp üzerinden tek tıkla ürün siparişi, çok satanlar için basit ürün vitrini ve 'Açık/Kapalı' dijital tabela.",
      btnText: "Demoyu İncele",
      image: "/butik.png"
    },
    { 
      id: 5, 
      title: "Kurumsal Uzmanlar", 
      frontSubtitle: "Prestij ve Güven", 
      backTitle: "Mesleki Duruş", 
      backDesc: "Avukat, Danışman ve Mali Müşavirler için prestijli imaj. Güçlü SEO altyapısı ve imaj artırıcı makale sayfası.",
      btnText: "Demoyu İncele",
      image: "/kurumsal.png"
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    const phone = "905449622337";
    const message = encodeURIComponent(
      `Merhaba, ${categoryName} sektörü için hazırladığınız web sitesi çözümleri hakkında bilgi almak istiyorum.`
    );
    const ua = navigator.userAgent || "";
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    if (isMobile) {
      window.location.href = `https://wa.me/${phone}?text=${message}`;
    } else {
      window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`, "_blank");
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9fb] font-body text-on-surface">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <span className="material-symbols-outlined text-[#0051d5] group-hover:-translate-x-1 transition-transform">
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
              <div key={item.id} className="group h-[380px] w-full [perspective:1000px] cursor-pointer">
                <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-2xl shadow-xl">
                  
                  {/* Ön Yüz */}
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-100">
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
                  <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-[#0051d5] to-blue-400 rounded-2xl p-6 flex flex-col justify-center items-center text-center text-white">
                    <h3 className="text-lg font-bold font-headline mb-3">{item.backTitle}</h3>
                    <p className="text-sm opacity-90 leading-relaxed mb-6">
                      {item.backDesc}
                    </p>
                    <button className="px-5 py-2 bg-white text-[#0051d5] rounded-full font-bold text-xs hover:scale-105 active:scale-95 transition-transform shadow-md">
                      {item.btnText}
                    </button>
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
              10+ farklı sektörde çalışmaya hazır, <span className="text-[#0051d5] font-bold">Google uyumlu ve SEO destekli</span> mimarilerimizle işletmenizi yarın sabah dijitale taşıyalım.
            </p>
          </div>

          {/* Bento Grid Yapısı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:auto-rows-[200px] gap-4 md:gap-6">
            {categories.map((category) => (
              <div 
                key={category.id} 
                onClick={() => handleCategoryClick(category.title)}
                className={`group relative bg-white rounded-3xl p-6 shadow-sm border border-slate-100 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1 flex flex-col justify-end ${category.colSpan}`}
              >
                {/* Arka Plan Fotoğraf Alanı */}
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-5xl text-slate-300 group-hover:scale-110 group-hover:text-primary transition-all duration-300 z-10">
                    add_photo_alternate
                  </span>
                  {/* FOTOĞRAF EKLENECEK ALAN */}
                  <img src={category.img} alt={category.title} className="w-full h-full object-cover absolute inset-0 z-0 group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/30 to-transparent z-10"></div>
                </div>

                {/* İçerik (Bento Hücresi Alt Kısmı) */}
                <div className="relative z-20 mt-auto flex items-end justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-headline text-white drop-shadow-lg group-hover:text-blue-300 transition-colors">{category.title}</h3>
                    <p className="text-xs text-white/80 mt-1 uppercase tracking-wider font-bold">Fiyat & Detay Al</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="material-symbols-outlined text-white text-sm">chat</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
