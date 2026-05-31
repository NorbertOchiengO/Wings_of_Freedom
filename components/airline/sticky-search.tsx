"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plane, Search, ArrowRight } from "lucide-react"
import { useBooking } from "./booking-context"
import { airports } from "@/lib/airline-data"
import { Button } from "@/components/ui/button"

export function StickySearch() {
  const { origin, destination, departDate, returnDate, tripType, search } = useBooking()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("search")
      if (!el) return
      const bottom = el.getBoundingClientRect().bottom
      setShow(bottom < 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const o = airports.find((a) => a.code === origin)
  const d = airports.find((a) => a.code === destination)
  const dateLabel = departDate
    ? `${departDate}${tripType === "round" && returnDate ? ` – ${returnDate}` : ""}`
    : "Select dates"

  function go() {
    search()
    document.getElementById("search")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 top-[68px] z-40 px-3"
        >
          <div className="mx-auto flex max-w-4xl items-center gap-2 rounded-2xl glass-strong p-2 shadow-lg sm:gap-3 sm:p-2.5">
            <div className="flex flex-1 items-center gap-2 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-2 rounded-xl bg-card/50 px-3 py-2 text-sm">
                <Plane className="h-4 w-4 shrink-0 text-sky" />
                <span className="whitespace-nowrap font-semibold">{o?.code}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="whitespace-nowrap font-semibold">{d?.code}</span>
              </div>
              <div className="hidden whitespace-nowrap rounded-xl bg-card/50 px-3 py-2 text-sm text-muted-foreground sm:block">
                {dateLabel}
              </div>
            </div>
            <Button onClick={go} className="h-10 shrink-0 rounded-xl bg-primary px-4 text-primary-foreground hover:bg-primary/90">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
