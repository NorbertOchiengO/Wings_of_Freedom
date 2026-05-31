"use client"

import { motion } from "framer-motion"
import { CalendarCheck, Award, Globe2, Armchair, Coffee, Headphones } from "lucide-react"
import { SectionHeading } from "./section-heading"

const props = [
  { icon: CalendarCheck, title: "Flexible Booking", desc: "Free date changes and easy cancellations on most fares — plans change, and that's fine." },
  { icon: Award, title: "Loyalty Rewards", desc: "Earn Freedom Miles on every journey and unlock priority upgrades and lounge perks." },
  { icon: Globe2, title: "Global Destinations", desc: "Hundreds of routes across six continents, connecting you to the world's great cities." },
  { icon: Armchair, title: "Premium Comfort", desc: "A modern fleet with spacious seating, mood lighting, and award-winning cabins." },
  { icon: Coffee, title: "Airport Lounge Access", desc: "Relax before you fly with premium lounge access for Gold and Platinum members." },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated customer care, any time zone, any day — we're with you the whole way." },
]

export function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <SectionHeading
        eyebrow="The Wings difference"
        title="Why Fly With Wings of Freedom?"
        description="Every detail engineered around your comfort, flexibility, and peace of mind."
        align="center"
      />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {props.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group rounded-3xl border border-border/70 bg-card p-6 transition-all hover:-translate-y-1 hover:border-sky/50 hover:shadow-lg"
          >
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-sky/12 text-sky transition-colors group-hover:bg-sky group-hover:text-white">
              <p.icon className="h-6 w-6" />
            </span>
            <h3 className="mb-1.5 text-lg font-semibold text-foreground">{p.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
