"use client"

import Link from "next/link"
import { blogPosts } from "@/lib/blog"

export default function BlogSection() {
  return (
    <section className="bg-bg py-24 px-4 sm:px-6" id="blog">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent font-bold text-xs uppercase tracking-[0.15em] font-display">
            BLOG
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-text mt-3 leading-tight">
            Sektörden Güncel İçerikler
          </h2>
          <p className="text-text-muted mt-3 max-w-xl mx-auto text-base">
            Web sitesi, Google Ads ve AI otomasyonu hakkında bilmeniz gereken her şey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col border border-border rounded-2xl overflow-hidden bg-bg-card hover:bg-bg-card-hover hover:border-accent/20 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div
                className={`relative h-48 bg-gradient-to-br ${post.imageBg} flex items-center justify-center overflow-hidden`}
              >
                <span className="font-display text-text/20 text-7xl font-black select-none">
                  01
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <span className="text-accent text-xs font-bold uppercase tracking-wider mb-2">
                  {post.category}
                </span>
                <h3 className="font-display font-bold text-text text-base leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
                  {post.title}
                </h3>
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

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border-2 border-border text-text px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-bg-card hover:border-accent/40 transition-all duration-300"
          >
            Tüm Yazılar
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
