"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"

type Theme = "dark" | "light"

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null
    if (saved === "light" || saved === "dark") {
      setTheme(saved)
      document.documentElement.setAttribute("data-theme", saved)
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      const preferred = mq.matches ? "dark" : "light"
      setTheme(preferred)
      document.documentElement.setAttribute("data-theme", preferred)
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark"
      document.documentElement.setAttribute("data-theme", next)
      localStorage.setItem("theme", next)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
