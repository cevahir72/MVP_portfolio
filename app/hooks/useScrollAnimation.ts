"use client"

import { useEffect } from "react"

export default function useScrollAnimation() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      ".fade-up, .fade-left, .fade-right, .scale-in"
    )
    if (targets.length === 0) return

    // Pre-calculate stagger delays for children of [data-stagger]
    targets.forEach((t) => {
      const container = t.closest("[data-stagger]")
      if (!container) return
      const siblings = container.querySelectorAll<HTMLElement>(
        ".fade-up, .fade-left, .fade-right, .scale-in"
      )
      siblings.forEach((s, i) => {
        s.style.setProperty("--delay", `${i * 100}ms`)
      })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          target.classList.add("is-visible")
          observer.unobserve(target)
        })
      },
      { threshold: 0.15 }
    )

    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
}
