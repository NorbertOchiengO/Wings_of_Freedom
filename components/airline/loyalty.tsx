"use client"

import { motion } from "framer-motion"
import { Check, Crown, Sparkles } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { loyaltyTiers } from "@/lib/airline-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const accentRing: Record<string, string> = {
  silver: "from-silver/60 to-silver/10 text-silver",
  gold: "from-gold/70 to-gold/10 text-gold",
  platinum: "from-sky/70 to-sky/10 text-sky",
}

export function Loyalty() {
  return (
    <section id="loyalty" className="relative overflow-hidden bg-navy-deep py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-sky/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
            <Sparkles className="h-3.5 w-3.5" /> Freedom Miles
          </p>
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Rewarded For Every Mile You Fly
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/70">
            Three tiers, endless perks. The more you explore, the more the world opens up.
          </p>
        </div>

        {/* Progress visualization */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="mb-2 flex justify-between text-xs font-medium text-white/60">
            <span>Silver</span>
            <span>Gold</span>
            <span>Platinum</span>
          </div>
          <div className="relative h-2 rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "68%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-silver via-gold to-sky"
            />
            <motion.span
              initial={{ left: 0, opacity: 0 }}
              whileInView={{ left: "68%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-navy-deep bg-gold shadow"
            />
          </div>
          <p className="mt-2 text-center text-xs text-white/60">You're 7,000 miles from Platinum</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {loyaltyTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "relative rounded-3xl border p-6 backdrop-blur-sm",
                tier.accent === "gold"
                  ? "border-gold/40 bg-gradient-to-b from-gold/15 to-white/[0.03]"
                  : "border-white/15 bg-white/[0.04]",
              )}
            >
              {tier.accent === "gold" && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-1 text-[11px] font-bold text-accent-foreground">
                  Most Popular
                </span>
              )}
              <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br", accentRing[tier.accent])}>
                <Crown className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-semibold">{tier.name}</h3>
              <p className="mt-0.5 text-sm text-white/60">{tier.miles}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-white/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button size="lg" className="h-12 rounded-full bg-gold px-8 text-base font-semibold text-accent-foreground hover:bg-gold/90">
            Join Freedom Miles
          </Button>
        </div>
      </div>
    </section>
  )
}
