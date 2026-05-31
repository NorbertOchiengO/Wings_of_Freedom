"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"
import { stats } from "@/lib/airline-data"

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1600
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  )
}

export function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="rounded-[2rem] border border-border/70 bg-gradient-to-br from-secondary/60 to-card p-8 sm:p-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5" fill="currentColor" />
            ))}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            <span className="font-serif text-2xl font-semibold text-foreground">4.9/5</span> · Trusted By Millions Of Travelers
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="font-serif text-4xl font-bold text-foreground sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
