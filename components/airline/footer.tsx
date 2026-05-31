"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plane, ArrowRight, Check, Twitter, Instagram, Facebook, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const columns = [
  { title: "Quick Links", links: ["Flights", "Destinations", "Loyalty Program", "Travel Information"] },
  { title: "Customer Support", links: ["Contact Us", "FAQs", "Baggage Policy", "Manage Booking"] },
  { title: "Company", links: ["About Us", "Careers", "Press", "Sustainability"] },
]

const socials = [Twitter, Instagram, Facebook, Linkedin]

export function Footer() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <footer className="bg-navy-deep text-white">
      {/* Final CTA */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative -mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-navy to-navy-deep p-8 text-center sm:p-12"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/15 blur-3xl" />
          <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Ready For Your Next Adventure?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-base text-white/70">
            Your journey beyond borders begins with a single search. Where will Wings of Freedom take you?
          </p>
          <Button asChild size="lg" className="mt-7 h-12 rounded-full bg-gold px-8 text-base font-semibold text-accent-foreground hover:bg-gold/90">
            <a href="#search">
              Search Flights
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          <div className="col-span-2">
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-navy-deep">
                <Plane className="h-5 w-5 -rotate-45" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold">Wings of Freedom</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">Airlines</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Beyond Borders. Beyond Expectations. Connecting the world with world-class travel since 2001.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setSubmitted(true)
              }}
              className="mt-6 max-w-sm"
            >
              <label htmlFor="newsletter" className="text-xs font-medium uppercase tracking-wider text-white/50">
                Get exclusive deals
              </label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="h-11 border-white/15 bg-white/5 text-white placeholder:text-white/40"
                />
                <Button type="submit" className="h-11 shrink-0 rounded-lg bg-gold px-4 text-accent-foreground hover:bg-gold/90">
                  {submitted ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </Button>
              </div>
              {submitted && <p className="mt-2 text-xs text-emerald">Thanks — you're on the list!</p>}
            </form>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/60 transition-colors hover:text-gold">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Wings of Freedom Airlines. All rights reserved.
          </p>
          <div className="flex gap-2">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
