"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Plane, ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background image with parallax */}
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img
          src="/images/hero-aircraft.png"
          alt="Aircraft wing soaring above golden clouds at sunrise"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-navy-deep/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/60 to-transparent" />
      </motion.div>

      {/* Floating cloud accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute left-[6%] top-[28%] h-28 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="animate-float-slower absolute right-[10%] top-[55%] h-32 w-72 rounded-full bg-white/10 blur-3xl" />
      </div>

      {/* Aircraft trajectory animation */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <motion.path
          d="M -50 600 Q 400 500 650 320 T 1250 80"
          fill="none"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeDasharray="6 10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.4, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.g
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.g
            animate={{
              offsetDistance: ["0%", "100%"],
            }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            style={{ offsetPath: `path("M -50 600 Q 400 500 650 320 T 1250 80")`, offsetRotate: "auto" } as React.CSSProperties}
          >
            <Plane className="h-7 w-7 -translate-x-3 -translate-y-3 text-gold" fill="currentColor" />
          </motion.g>
        </motion.g>
      </svg>

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-md"
        >
          <span className="flex items-center gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3" fill="currentColor" />
            ))}
          </span>
          4.9/5 · Rated by 15M+ travelers worldwide
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-gold"
        >
          Beyond Borders. Beyond Expectations.
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-3xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
        >
          Fly Beyond Boundaries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-5 max-w-xl text-lg leading-relaxed text-white/80"
        >
          Experience world-class travel with comfort, flexibility, and destinations across the globe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="group h-12 rounded-full bg-gold px-7 text-base font-semibold text-accent-foreground hover:bg-gold/90">
            <a href="#search">
              Search Flights
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/30 bg-white/5 px-7 text-base font-medium text-white backdrop-blur-md hover:bg-white/15 hover:text-white">
            <a href="#destinations">Explore Destinations</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5"
        >
          <span className="h-2 w-1 rounded-full bg-white/70" />
        </motion.div>
      </div>
    </section>
  )
}
