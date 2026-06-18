import type { Metadata } from "next"
import Link from "next/link"
import { blogPosts } from "@/lib/blog"

const SITE_URL = "https://devarchitect.com.tr"

export const metadata: Metadata = {
  title: "Blog | DevArchitect",
  description:
    "Web sitesi, Google Ads ve AI otomasyonu hakkında güncel içerikler. KOBİ'ler için dijital pazarlama rehberi.",
  openGraph: {
    title: "Blog | DevArchitect",
    description: "Web sitesi, Google Ads ve AI otomasyonu hakkında güncel içerikler.",
    url: `${SITE_URL}/blog`,
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-bg pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-text mt-3 leading-tight">
            Blog
          </h1>
          <p className="text-text-muted mt-4 max-w-2xl mx-auto text-base md:text-lg">
            Web sitesi kurulumu, Google Ads stratejileri ve AI otomasyonu hakkında
            sektörden güncel içerikler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border border-border rounded-2xl overflow-hidden bg-bg-card hover:bg-bg-card-hover hover:border-accent/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`relative h-48 bg-gradient-to-br ${post.imageBg} flex items-center justify-center overflow-hidden`}
              >
                <span className="font-display text-text/20 text-7xl font-black select-none">
                  01
                </span>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h2 className="font-display font-bold text-text text-base leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-text-muted text-xs">{post.readTime}</span>
                  <span className="text-accent text-xs font-semibold group-hover:underline underline-offset-4 transition-all duration-200">
                    Okumaya Devam Et →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
