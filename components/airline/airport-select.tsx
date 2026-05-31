"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { airports } from "@/lib/airline-data"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"

export function AirportSelect({
  value,
  onChange,
  label,
  icon,
  compact = false,
}: {
  value: string
  onChange: (code: string) => void
  label: string
  icon: React.ReactNode
  compact?: boolean
}) {
  const [open, setOpen] = useState(false)
  const selected = airports.find((a) => a.code === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-label={label}
          className={cn(
            "group flex w-full items-center gap-3 rounded-xl border border-border/70 bg-card/50 px-4 text-left transition-colors hover:border-sky/60",
            compact ? "h-12" : "h-16",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky/12 text-sky">
            {icon}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </span>
            {selected ? (
              <span className="flex items-baseline gap-1.5">
                <span className="truncate text-base font-semibold text-foreground">{selected.city}</span>
                <span className="font-mono text-xs text-muted-foreground">{selected.code}</span>
              </span>
            ) : (
              <span className="text-base text-muted-foreground">Select airport</span>
            )}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search city or airport..." />
          <CommandList>
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup>
              {airports.map((a) => (
                <CommandItem
                  key={a.code}
                  value={`${a.city} ${a.code} ${a.name} ${a.country}`}
                  onSelect={() => {
                    onChange(a.code)
                    setOpen(false)
                  }}
                  className="gap-2"
                >
                  <Plane className="h-4 w-4 text-sky" />
                  <span className="flex-1">
                    <span className="font-medium">{a.city}</span>{" "}
                    <span className="text-xs text-muted-foreground">{a.country}</span>
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{a.code}</span>
                  <Check className={cn("h-4 w-4 text-sky", value === a.code ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
