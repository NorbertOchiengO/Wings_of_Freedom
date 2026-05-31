"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowLeftRight, Search, PlaneTakeoff, PlaneLanding, AlertCircle } from "lucide-react"
import { useBooking } from "./booking-context"
import { AirportSelect } from "./airport-select"
import { DatePicker } from "./date-picker"
import { PassengerSelect } from "./passenger-select"
import { FlightResults } from "./flight-results"
import { cabinClasses, type TripType } from "@/lib/airline-data"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const tripTypes: { key: TripType; label: string }[] = [
  { key: "round", label: "Round Trip" },
  { key: "oneway", label: "One Way" },
  { key: "multi", label: "Multi-City" },
]

export function SearchEngine() {
  const b = useBooking()
  const [error, setError] = useState<string | null>(null)

  function onSearch() {
    const err = b.search()
    setError(err)
    if (!err) {
      setTimeout(() => {
        document.getElementById("results-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 80)
    }
  }

  return (
    <section id="search" className="relative z-20 mx-auto -mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="glass-strong rounded-3xl p-5 shadow-2xl sm:p-7"
      >
        {/* Trip type selector */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <div className="relative inline-flex rounded-full bg-secondary/70 p-1">
            {tripTypes.map((t) => (
              <button
                key={t.key}
                onClick={() => b.setTripType(t.key)}
                className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
              >
                {b.tripType === t.key && (
                  <motion.span
                    layoutId="trip-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                <span className={cn("relative z-10", b.tripType === t.key ? "text-primary-foreground" : "text-muted-foreground")}>
                  {t.label}
                </span>
              </button>
            ))}
          </div>

          <div className="ml-auto w-full sm:w-48">
            <Select value={b.cabin} onValueChange={(v) => b.setCabin(v as typeof b.cabin)}>
              <SelectTrigger className="h-11 rounded-xl border-border/70 bg-card/50">
                <SelectValue placeholder="Cabin class" />
              </SelectTrigger>
              <SelectContent>
                {cabinClasses.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          {/* Origin + swap + destination */}
          <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-5">
            <AirportSelect
              value={b.origin}
              onChange={b.setOrigin}
              label="From"
              icon={<PlaneTakeoff className="h-[18px] w-[18px]" />}
            />
            <AirportSelect
              value={b.destination}
              onChange={b.setDestination}
              label="To"
              icon={<PlaneLanding className="h-[18px] w-[18px]" />}
            />
            <button
              type="button"
              onClick={b.swap}
              aria-label="Swap origin and destination"
              className="absolute left-1/2 top-1/2 z-10 hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-transform hover:rotate-180 hover:text-sky sm:flex"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-4">
            <DatePicker value={b.departDate} onChange={b.setDepartDate} label="Departure" />
            {b.tripType === "round" ? (
              <DatePicker value={b.returnDate} onChange={b.setReturnDate} label="Return" minDate={b.departDate} />
            ) : (
              <div className="flex h-16 items-center justify-center rounded-xl border border-dashed border-border/60 px-4 text-center text-xs text-muted-foreground">
                {b.tripType === "oneway" ? "One way — no return" : "Add more legs after search"}
              </div>
            )}
          </div>

          {/* Passengers */}
          <div className="lg:col-span-3">
            <PassengerSelect />
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-destructive"
          >
            <AlertCircle className="h-4 w-4" /> {error}
          </motion.p>
        )}

        <div className="mt-5 flex justify-end">
          <Button
            onClick={onSearch}
            size="lg"
            className="group h-12 w-full rounded-xl bg-gold px-8 text-base font-semibold text-accent-foreground hover:bg-gold/90 sm:w-auto"
          >
            <Search className="h-5 w-5" />
            Search Flights
          </Button>
        </div>
      </motion.div>

      <div id="results-anchor" className="scroll-mt-28" />
      <FlightResults />
    </section>
  )
}
