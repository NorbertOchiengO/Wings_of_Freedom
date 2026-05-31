"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { type CabinClass, type TripType, type Flight, generateFlights } from "@/lib/airline-data"

export type Passengers = { adults: number; children: number; infants: number }

type BookingState = {
  tripType: TripType
  setTripType: (t: TripType) => void
  origin: string
  setOrigin: (c: string) => void
  destination: string
  setDestination: (c: string) => void
  departDate: string
  setDepartDate: (d: string) => void
  returnDate: string
  setReturnDate: (d: string) => void
  passengers: Passengers
  setPassengers: (p: Passengers) => void
  cabin: CabinClass
  setCabin: (c: CabinClass) => void
  results: Flight[] | null
  searched: boolean
  search: () => string | null
  swap: () => void
  totalPassengers: number
}

const BookingContext = createContext<BookingState | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [tripType, setTripType] = useState<TripType>("round")
  const [origin, setOrigin] = useState("NBO")
  const [destination, setDestination] = useState("DXB")
  const [departDate, setDepartDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [passengers, setPassengers] = useState<Passengers>({ adults: 1, children: 0, infants: 0 })
  const [cabin, setCabin] = useState<CabinClass>("Economy")
  const [results, setResults] = useState<Flight[] | null>(null)
  const [searched, setSearched] = useState(false)

  const totalPassengers = passengers.adults + passengers.children + passengers.infants

  function search(): string | null {
    if (!origin || !destination) return "Please choose an origin and destination."
    if (origin === destination) return "Origin and destination cannot be the same."
    if (!departDate) return "Please select a departure date."
    if (tripType === "round" && !returnDate) return "Please select a return date."
    setResults(generateFlights(origin, destination, cabin))
    setSearched(true)
    return null
  }

  function swap() {
    setOrigin(destination)
    setDestination(origin)
  }

  const value = useMemo(
    () => ({
      tripType, setTripType, origin, setOrigin, destination, setDestination,
      departDate, setDepartDate, returnDate, setReturnDate, passengers, setPassengers,
      cabin, setCabin, results, searched, search, swap, totalPassengers,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tripType, origin, destination, departDate, returnDate, passengers, cabin, results, searched],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}
