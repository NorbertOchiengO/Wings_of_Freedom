"use client"

import { motion } from "framer-motion"
import { Plane, ArrowRight } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { deals } from "@/lib/airline-data"
import { cn } from "@/lib/utils"

const toneClasses: Record<string, string> = {
  gold: "bg-gold text-accent-foreground",
  emerald: "bg-emerald text-white",
  sunset: "bg-sunset text-white",
}

export function Deals() {
  return (
    <section id="deals" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Limited time offers"
          title="Deals From Your City"
          description="Handpicked fares from Nairobi. Book early — these go fast."
        />
        <a href="#destinations" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-sky">
          View all deals
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal, i) => (
          <motion.a
            key={`${deal.to}-${i}`}
            href="#search"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-border/60",
              i === 0 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={deal.image || "/placeholder.svg"}
                alt={`${deal.from} to ${deal.to}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/20 to-transparent" />

              <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold shadow-sm", toneClasses[deal.badgeTone])}>
                {deal.badge}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <div className="mb-1.5 flex items-center gap-2 text-sm font-medium text-white/80">
                  <span>{deal.from}</span>
                  <Plane className="h-3.5 w-3.5 -rotate-45" />
                  <span>{deal.to}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-white/70">Round trip from</p>
                    <p className="font-serif text-3xl font-semibold">
                      ${deal.price}
                      <span className="ml-1 text-sm font-normal text-white/70">{deal.currency}</span>
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition-colors group-hover:bg-gold group-hover:text-accent-foreground">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
