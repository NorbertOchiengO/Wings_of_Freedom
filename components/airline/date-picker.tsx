"use client"

import { CalendarDays } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

function format(value: string) {
  if (!value) return null
  const d = new Date(value + "T00:00:00")
  return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

export function DatePicker({
  value,
  onChange,
  label,
  minDate,
  compact = false,
}: {
  value: string
  onChange: (iso: string) => void
  label: string
  minDate?: string
  compact?: boolean
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const min = minDate ? new Date(minDate + "T00:00:00") : today

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl border border-border/70 bg-card/50 px-4 text-left transition-colors hover:border-sky/60",
            compact ? "h-12" : "h-16",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky/12 text-sky">
            <CalendarDays className="h-[18px] w-[18px]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
            <span className={cn("block truncate text-base font-semibold", value ? "text-foreground" : "text-muted-foreground")}>
              {format(value) ?? "Add date"}
            </span>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ? new Date(value + "T00:00:00") : undefined}
          onSelect={(d) => d && onChange(toISO(d))}
          disabled={{ before: min }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
