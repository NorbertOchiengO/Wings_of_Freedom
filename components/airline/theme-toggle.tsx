"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/60 text-foreground transition-colors hover:bg-accent/20 ${className}`}
    >
      {mounted ? (
        isDark ? <Sun className="h-[18px] w-[18px] text-gold" /> : <Moon className="h-[18px] w-[18px]" />
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  )
}
