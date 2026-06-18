import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { blogPosts, getBlogPost } from "@/lib/blog"

const SITE_URL = "https://devarchitect.com.tr"

// ── Simple markdown → React elements ──
function renderContent(text: string) {
  const lines = text.trim().split("\n")
  const elements: React.ReactNode[] = []
  let idx = 0

  while (idx < lines.length) {
    const line = lines[idx]

    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={idx} className="font-display text-3xl md:text-4xl font-extrabold text-text mt-10 mb-4 leading-tight">
          {line.slice(2)}
        </h1>,
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={idx} className="font-display text-xl md:text-2xl font-bold text-text mt-8 mb-3 leading-tight">
          {line.slice(3)}
        </h2>,
      )
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={idx} className="font-display text-lg font-bold text-text mt-6 mb-2 leading-tight">
          {line.slice(4)}
        </h3>,
      )
    } else if (line.startsWith("---")) {
      elements.push(<hr key={idx} className="my-8 border-border" />)
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={idx} className="border-l-4 border-accent/40 pl-4 italic text-text-muted my-4 text-sm leading-relaxed">
          {formatInline(line.slice(2))}
        </blockquote>,
      )
    } else if (line.startsWith("| ")) {
      // Table row — collect all consecutive table rows
      const rows: string[] = []
      while (idx < lines.length && lines[idx].startsWith("|")) {
        rows.push(lines[idx])
        idx++
      }
      idx--
      elements.push(renderTable(rows, idx))
    } else if (line.startsWith("**")) {
      // standalone bold line (CTA separator emphasis)
      elements.push(
        <p key={idx} className="text-text font-bold text-sm mt-4 mb-2">{formatInline(line)}</p>,
      )
    } else if (line.trim() === "") {
      // skip
    } else if (line.includes("http") && line.includes("→")) {
      // CTA link line
      const match = line.match(/\[(.+?)\]\((.+?)\)/)
      if (match) {
        elements.push(
          <p key={idx} className="mt-6">
            <a
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-bg font-bold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors duration-200"
            >
              {match[1]}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </p>,
        )
      }
    } else {
      elements.push(
        <p key={idx} className="text-text-muted text-sm md:text-base leading-relaxed mb-4">
          {formatInline(line)}
        </p>,
      )
    }
    idx++
  }

  return elements
}

function formatInline(text: string): React.ReactNode {
  // Bold
  const parts = text.split(/(\*\*.*?\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-text font-semibold">{part.slice(2, -2)}</strong>
    }
    // Internal links [text](/path)
    const linkMatch = part.match(/\[(.+?)\]\((.+?)\)/)
    if (linkMatch) {
      const before = part.slice(0, part.indexOf("["))
      const after = part.slice(part.indexOf(")") + 1)
      return (
        <span key={i}>
          {before}
          <Link href={linkMatch[2]} className="text-accent underline hover:no-underline underline-offset-2">
            {linkMatch[1]}
          </Link>
          {after}
        </span>
      )
    }
    return part
  })
}

function renderTable(rows: string[], key: number) {
  const cells = rows.map((r) =>
    r
      .split("|")
      .filter((c) => c.trim())
      .map((c) => c.trim()),
  )
  const header = cells[0]
  const body = cells.slice(2) // skip separator row

  return (
    <div key={key} className="overflow-x-auto my-6">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            {header.map((h, i) => (
              <th key={i} className="text-left font-display font-bold text-text py-3 px-4 first:pl-0 last:pr-0">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => (
            <tr key={ri} className="border-b border-border/50 last:border-0">
              {row.map((cell, ci) => (
                <td key={ci} className="py-3 px-4 text-text-muted first:pl-0 last:pr-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Static params ──
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

// ── Metadata ──
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

// ── Page ──
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-bg pt-28 pb-24 px-4 sm:px-6">
      <article className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent text-sm transition-colors duration-200 mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <span className="text-accent text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-text mt-3 leading-tight">
            {post.title}
          </h1>
          <p className="text-text-muted text-sm mt-3">{post.readTime}</p>
        </header>

        {/* Content */}
        <div className="prose-custom">
          {renderContent(post.content)}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-border text-center">
          <p className="font-display text-xl font-bold text-text mb-2">
            Projenize Özel Çözüm İçin Konuşalım
          </p>
          <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
            Web sitesi, Google Ads veya AI otomasyon ihtiyacınız mı var?
            Ücretsiz danışmanlık için bize yazın.
          </p>
          <a
            href="https://wa.me/905449622337?text=Blog%20yaz%C4%B1n%C4%B1z%C4%B1%20okudum%2C%20bilgi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent text-bg font-bold text-sm px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors duration-200"
          >
            Ücretsiz Danışmanlık Al
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </article>
    </main>
  )
}
