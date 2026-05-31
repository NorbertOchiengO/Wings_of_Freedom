"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Clock, MapPin, ArrowUpRight } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { destinations, fareTabs } from "@/lib/airline-data"
import { cn } from "@/lib/utils"

export function Destinations() {
  const [active, setActive] = useState<(typeof fareTabs)[number]>("Popular")
  const filtered = destinations.filter((d) => d.tags.includes(active))

  return (
    <section id="destinations" className="border-y border-border/60 bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Where will you go"
          title="Destinations Worth The Window Seat"
          description="From neon cities to turquoise coastlines, explore the routes our travelers love most."
          align="center"
        />

        {/* Fare tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {fareTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {active === tab && (
                <motion.span
                  layoutId="fare-tab-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              <span className={cn("relative z-10", active === tab ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
                {tab}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((dest, i) => (
              <motion.a
                key={dest.city}
                href="#search"
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative h-80 overflow-hidden rounded-3xl"
              >
                <img
                  src={dest.image || "/placeholder.svg"}
                  alt={`${dest.city}, ${dest.country}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/30 to-transparent" />

                <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="mb-1 flex items-center gap-1 text-xs text-white/70">
                    <MapPin className="h-3 w-3" /> {dest.country}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold">{dest.city}</h3>
                  <p className="mt-0.5 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-300 group-hover:max-h-12 group-hover:opacity-100">
                    {dest.highlight}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gold">
                    <Clock className="h-3.5 w-3.5" /> {dest.duration} direct
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
