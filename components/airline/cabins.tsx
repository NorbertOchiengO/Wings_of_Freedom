"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Armchair, MoveVertical } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { cabins } from "@/lib/airline-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Cabins() {
  const [active, setActive] = useState(0)
  const cabin = cabins[active]

  return (
    <section id="cabins" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="On board experience"
        title="A Cabin For Every Journey"
        description="From everyday comfort to private suites in the sky — find your perfect way to fly."
        align="center"
      />

      {/* Cabin tabs */}
      <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-2">
        {cabins.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setActive(i)}
            className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            {active === i && (
              <motion.span
                layoutId="cabin-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <span className={cn("relative z-10", active === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground")}>
              {c.name}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={cabin.image}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative h-72 overflow-hidden rounded-3xl sm:h-96 lg:order-2"
          >
            <img
              src={cabin.image || "/placeholder.svg"}
              alt={`${cabin.name} cabin interior`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={cabin.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="lg:order-1"
          >
            <h3 className="font-serif text-3xl font-semibold text-foreground">{cabin.name}</h3>
            <p className="mt-1 text-base text-muted-foreground">{cabin.tagline}</p>

            <div className="mt-6 flex gap-3">
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
                <Armchair className="h-5 w-5 text-sky" />
                <div>
                  <p className="text-xs text-muted-foreground">Seat</p>
                  <p className="text-sm font-semibold text-foreground">{cabin.seatPitch}</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
                <MoveVertical className="h-5 w-5 text-sky" />
                <div>
                  <p className="text-xs text-muted-foreground">Recline</p>
                  <p className="text-sm font-semibold text-foreground">{cabin.recline}</p>
                </div>
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {cabin.amenities.map((a) => (
                <li key={a} className="flex items-center gap-2 text-sm text-foreground/90">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>

            <Button asChild className="mt-7 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
              <a href="#search">Book {cabin.name}</a>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
