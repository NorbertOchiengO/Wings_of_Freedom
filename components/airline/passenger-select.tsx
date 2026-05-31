"use client"

import { Minus, Plus, Users, ChevronsUpDown } from "lucide-react"
import { useBooking } from "./booking-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Row = { key: "adults" | "children" | "infants"; label: string; sub: string; min: number }
const rows: Row[] = [
  { key: "adults", label: "Adults", sub: "12+ years", min: 1 },
  { key: "children", label: "Children", sub: "2–11 years", min: 0 },
  { key: "infants", label: "Infants", sub: "Under 2 years", min: 0 },
]

export function PassengerSelect({ compact = false }: { compact?: boolean }) {
  const { passengers, setPassengers, totalPassengers } = useBooking()

  function update(key: Row["key"], delta: number, min: number) {
    const next = Math.max(min, Math.min(9, passengers[key] + delta))
    setPassengers({ ...passengers, [key]: next })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label="Select passengers"
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl border border-border/70 bg-card/50 px-4 text-left transition-colors hover:border-sky/60",
            compact ? "h-12" : "h-16",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky/12 text-sky">
            <Users className="h-[18px] w-[18px]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Passengers</span>
            <span className="block truncate text-base font-semibold text-foreground">
              {totalPassengers} {totalPassengers === 1 ? "Traveler" : "Travelers"}
            </span>
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-2" align="start">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center justify-between rounded-lg px-2 py-2.5">
            <div>
              <p className="text-sm font-medium text-foreground">{r.label}</p>
              <p className="text-xs text-muted-foreground">{r.sub}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={`Decrease ${r.label}`}
                onClick={() => update(r.key, -1, r.min)}
                disabled={passengers[r.key] <= r.min}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent/20 disabled:opacity-40"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center text-sm font-semibold tabular-nums">{passengers[r.key]}</span>
              <button
                type="button"
                aria-label={`Increase ${r.label}`}
                onClick={() => update(r.key, 1, r.min)}
                disabled={passengers[r.key] >= 9}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent/20 disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
