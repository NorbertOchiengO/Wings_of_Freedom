"use client"

import { useEffect, useState } from "react"
import { Menu, X, Plane } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const links = [
  { label: "Flights", href: "#search" },
  { label: "Deals", href: "#deals" },
  { label: "Destinations", href: "#destinations" },
  { label: "Freedom Miles", href: "#loyalty" },
  { label: "Experience", href: "#cabins" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b border-border/60 py-2.5" : "py-4",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Plane className="h-5 w-5 -rotate-45" />
          </span>
          <span className="flex flex-col leading-none">
            <span className={cn("font-serif text-lg font-semibold tracking-tight transition-colors", scrolled ? "text-foreground" : "text-foreground")}>
              Wings of Freedom
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">Airlines</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/15 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden rounded-full bg-primary px-5 text-primary-foreground hover:bg-primary/90 sm:inline-flex">
            <a href="#search">Search Flights</a>
          </Button>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/60 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mt-3 overflow-hidden rounded-2xl glass-strong p-2 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/15"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="mt-1 w-full rounded-xl bg-primary text-primary-foreground">
            <a href="#search" onClick={() => setOpen(false)}>Search Flights</a>
          </Button>
        </div>
      )}
    </header>
  )
}
