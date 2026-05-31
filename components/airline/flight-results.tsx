"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plane, ArrowRight, Clock, Briefcase, Filter } from "lucide-react"
import { useBooking } from "./booking-context"
import { airports } from "@/lib/airline-data"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SortKey = "price" | "duration" | "nonstop"
const sortOptions: { key: SortKey; label: string }[] = [
  { key: "price", label: "Lowest price" },
  { key: "duration", label: "Shortest" },
  { key: "nonstop", label: "Non-stop first" },
]

function durationToMinutes(d: string) {
  const [h, m] = d.replace("m", "").split("h ").map((s) => Number.parseInt(s, 10))
  return h * 60 + m
}

export function FlightResults() {
  const { results, searched, origin, destination, cabin, totalPassengers } = useBooking()
  const [sort, setSort] = useState<SortKey>("price")
  const [nonstopOnly, setNonstopOnly] = useState(false)

  const o = airports.find((a) => a.code === origin)
  const d = airports.find((a) => a.code === destination)

  const visible = useMemo(() => {
    if (!results) return []
    let list = [...results]
    if (nonstopOnly) list = list.filter((f) => f.stops === 0)
    if (sort === "price") list.sort((a, b) => a.price - b.price)
    if (sort === "duration") list.sort((a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration))
    if (sort === "nonstop") list.sort((a, b) => a.stops - b.stops || a.price - b.price)
    return list
  }, [results, sort, nonstopOnly])

  if (!searched || !results) return null

  return (
    <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-foreground">
            {o?.city} <ArrowRight className="inline h-5 w-5 text-sky" /> {d?.city}
          </h3>
          <p className="text-sm text-muted-foreground">
            {visible.length} flights · {cabin} · {totalPassengers} {totalPassengers === 1 ? "traveler" : "travelers"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setNonstopOnly((v) => !v)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              nonstopOnly ? "border-sky bg-sky/15 text-sky" : "border-border bg-card/50 text-muted-foreground hover:text-foreground",
            )}
          >
            <Filter className="h-3.5 w-3.5" /> Non-stop
          </button>
          {sortOptions.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                sort === s.key ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card/50 text-muted-foreground hover:text-foreground",
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="popLayout">
          {visible.map((f, i) => (
            <motion.div
              key={f.id + sort + nonstopOnly}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="group flex flex-col gap-4 rounded-2xl border border-border/70 bg-card p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:p-5"
            >
              <div className="flex items-center gap-3 sm:w-44">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Plane className="h-5 w-5 -rotate-45" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.flightNo}</p>
                  <p className="text-xs text-muted-foreground">{f.aircraft}</p>
                </div>
              </div>

              <div className="flex flex-1 items-center gap-3">
                <div className="text-center">
                  <p className="text-xl font-semibold tabular-nums text-foreground">{f.departTime}</p>
                  <p className="text-xs text-muted-foreground">{origin}</p>
                </div>
                <div className="flex flex-1 flex-col items-center">
                  <span className="text-[11px] text-muted-foreground">{f.duration}</span>
                  <div className="relative my-1 h-px w-full bg-border">
                    <Plane className="absolute -top-1.5 right-0 h-3 w-3 rotate-90 text-sky" fill="currentColor" />
                  </div>
                  <span className={cn("text-[11px] font-medium", f.stops === 0 ? "text-emerald" : "text-muted-foreground")}>
                    {f.stopLabel}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold tabular-nums text-foreground">{f.arriveTime}</p>
                  <p className="text-xs text-muted-foreground">{destination}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3 sm:w-44 sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <div className="text-right">
                  <p className="text-[11px] text-muted-foreground">from</p>
                  <p className="text-2xl font-bold tabular-nums text-foreground">
                    ${f.price.toLocaleString()}
                  </p>
                </div>
                <Button size="sm" className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90">
                  Select
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-12 text-center">
            <Briefcase className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium text-foreground">No non-stop flights on this route</p>
            <p className="text-sm text-muted-foreground">Try turning off the non-stop filter.</p>
          </div>
        )}
      </div>
    </div>
  )
}
