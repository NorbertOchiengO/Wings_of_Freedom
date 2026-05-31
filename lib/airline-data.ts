export type Airport = {
  code: string
  city: string
  name: string
  country: string
}

export const airports: Airport[] = [
  { code: "NBO", city: "Nairobi", name: "Jomo Kenyatta Intl", country: "Kenya" },
  { code: "LHR", city: "London", name: "Heathrow", country: "United Kingdom" },
  { code: "DXB", city: "Dubai", name: "Dubai Intl", country: "UAE" },
  { code: "HND", city: "Tokyo", name: "Haneda", country: "Japan" },
  { code: "JFK", city: "New York", name: "John F. Kennedy Intl", country: "USA" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "SIN", city: "Singapore", name: "Changi", country: "Singapore" },
  { code: "CPT", city: "Cape Town", name: "Cape Town Intl", country: "South Africa" },
  { code: "ZNZ", city: "Zanzibar", name: "Abeid Amani Karume Intl", country: "Tanzania" },
  { code: "FCO", city: "Rome", name: "Leonardo da Vinci–Fiumicino", country: "Italy" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles Intl", country: "USA" },
  { code: "IST", city: "Istanbul", name: "Istanbul Airport", country: "Türkiye" },
  { code: "AMS", city: "Amsterdam", name: "Schiphol", country: "Netherlands" },
  { code: "JNB", city: "Johannesburg", name: "O. R. Tambo Intl", country: "South Africa" },
]

export type CabinClass = "Economy" | "Premium Economy" | "Business" | "First Class"
export const cabinClasses: CabinClass[] = ["Economy", "Premium Economy", "Business", "First Class"]
export type TripType = "round" | "oneway" | "multi"

export type Flight = {
  id: string
  flightNo: string
  departTime: string
  arriveTime: string
  duration: string
  stops: number
  stopLabel: string
  aircraft: string
  price: number
  cabin: CabinClass
}

const aircraftFleet = ["Boeing 787-9", "Airbus A350-1000", "Airbus A380", "Boeing 777-300ER"]

function pad(n: number) {
  return n.toString().padStart(2, "0")
}

// Deterministic pseudo-random generator so SSR and client match.
function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const cabinMultiplier: Record<CabinClass, number> = {
  Economy: 1,
  "Premium Economy": 1.7,
  Business: 3.4,
  "First Class": 6.2,
}

export function generateFlights(origin: string, destination: string, cabin: CabinClass): Flight[] {
  const seedBase =
    origin.split("").reduce((a, c) => a + c.charCodeAt(0), 0) * 31 +
    destination.split("").reduce((a, c) => a + c.charCodeAt(0), 0)
  const rand = seeded(seedBase + 7)
  const count = 5 + Math.floor(rand() * 2)
  const base = 320 + Math.floor(rand() * 540)

  return Array.from({ length: count }).map((_, i) => {
    const departH = Math.floor(rand() * 22)
    const departM = rand() > 0.5 ? 30 : 0
    const durH = 3 + Math.floor(rand() * 13)
    const durM = rand() > 0.5 ? 45 : 15
    const arriveTotal = departH * 60 + departM + durH * 60 + durM
    const arriveH = Math.floor(arriveTotal / 60) % 24
    const arriveM = arriveTotal % 60
    const stops = rand() > 0.62 ? (rand() > 0.5 ? 1 : 2) : 0
    const price = Math.round(
      (base + i * 47 + rand() * 120) * cabinMultiplier[cabin],
    )
    return {
      id: `${origin}-${destination}-${i}`,
      flightNo: `WF ${100 + Math.floor(rand() * 899)}`,
      departTime: `${pad(departH)}:${pad(departM)}`,
      arriveTime: `${pad(arriveH)}:${pad(arriveM)}`,
      duration: `${durH}h ${pad(durM)}m`,
      stops,
      stopLabel: stops === 0 ? "Non-stop" : `${stops} stop${stops > 1 ? "s" : ""}`,
      aircraft: aircraftFleet[Math.floor(rand() * aircraftFleet.length)],
      price,
      cabin,
    }
  }).sort((a, b) => a.price - b.price)
}

export type Deal = {
  from: string
  to: string
  image: string
  price: number
  currency: string
  badge: string
  badgeTone: "gold" | "emerald" | "sunset"
}

export const deals: Deal[] = [
  { from: "Nairobi", to: "Dubai", image: "/images/dest-dubai.png", price: 389, currency: "USD", badge: "Save 25%", badgeTone: "emerald" },
  { from: "Nairobi", to: "London", image: "/images/dest-paris.png", price: 612, currency: "USD", badge: "Flash Sale", badgeTone: "sunset" },
  { from: "Nairobi", to: "Tokyo", image: "/images/dest-tokyo.png", price: 845, currency: "USD", badge: "Limited Seats", badgeTone: "gold" },
  { from: "Nairobi", to: "Paris", image: "/images/dest-paris.png", price: 578, currency: "USD", badge: "Save 18%", badgeTone: "emerald" },
  { from: "Nairobi", to: "Cape Town", image: "/images/dest-capetown.png", price: 264, currency: "USD", badge: "Flash Sale", badgeTone: "sunset" },
]

export type Destination = {
  city: string
  country: string
  image: string
  highlight: string
  duration: string
  tags: string[]
}

export const destinations: Destination[] = [
  { city: "Tokyo", country: "Japan", image: "/images/dest-tokyo.png", highlight: "Neon nights & timeless tradition", duration: "13h 40m", tags: ["Popular", "International"] },
  { city: "Dubai", country: "UAE", image: "/images/dest-dubai.png", highlight: "Skyline luxury in the desert", duration: "5h 10m", tags: ["Popular", "Business Class"] },
  { city: "Paris", country: "France", image: "/images/dest-paris.png", highlight: "Romance above the rooftops", duration: "8h 25m", tags: ["Weekend Escapes", "International"] },
  { city: "New York", country: "USA", image: "/images/dest-newyork.png", highlight: "The city that never sleeps", duration: "15h 05m", tags: ["Popular", "Business Class"] },
  { city: "Singapore", country: "Singapore", image: "/images/dest-singapore.png", highlight: "Gardens, bay & beyond", duration: "10h 30m", tags: ["Family Travel", "International"] },
  { city: "Cape Town", country: "South Africa", image: "/images/dest-capetown.png", highlight: "Where mountains meet ocean", duration: "4h 50m", tags: ["Weekend Escapes", "Family Travel"] },
  { city: "Zanzibar", country: "Tanzania", image: "/images/dest-zanzibar.png", highlight: "Turquoise water, white sand", duration: "1h 15m", tags: ["Weekend Escapes", "Family Travel"] },
  { city: "Rome", country: "Italy", image: "/images/dest-rome.png", highlight: "Ancient wonders await", duration: "8h 05m", tags: ["Popular", "International"] },
]

export const fareTabs = [
  "Popular",
  "Business Class",
  "Family Travel",
  "Weekend Escapes",
  "International",
] as const

export type Review = {
  name: string
  role: string
  rating: number
  text: string
  initials: string
}

export const reviews: Review[] = [
  { name: "Amara Okonkwo", role: "Frequent Flyer · Platinum", rating: 5, text: "The business class cabin felt like a private suite. Lounge access in Nairobi was seamless and the crew remembered my name on a 14-hour flight.", initials: "AO" },
  { name: "James Whitfield", role: "Business Traveler", rating: 5, text: "Booked Nairobi to London last minute. The fare was unbeatable and the lie-flat seat let me land ready for my meeting. Wings of Freedom is now my default.", initials: "JW" },
  { name: "Mei Lin Tan", role: "Family Traveler", rating: 5, text: "Traveling with two kids to Singapore was effortless. Priority boarding, extra baggage on Gold tier, and the kids loved the entertainment.", initials: "MT" },
  { name: "Sofia Romano", role: "Leisure Traveler", rating: 5, text: "From Rome to Zanzibar for our honeymoon. The whole experience was elegant from booking to landing. Truly travel without limits.", initials: "SR" },
  { name: "David Kimani", role: "Loyalty · Gold", rating: 5, text: "Freedom Miles add up fast. I upgraded to First Class on points and the suite, dining, and service exceeded every expectation.", initials: "DK" },
  { name: "Elena Petrova", role: "Digital Nomad", rating: 5, text: "Flexible booking saved me when plans changed twice. Free changes meant zero stress. Premium Economy legroom is genuinely premium.", initials: "EP" },
]

export type Cabin = {
  name: CabinClass
  image: string
  tagline: string
  seatPitch: string
  recline: string
  amenities: string[]
}

export const cabins: Cabin[] = [
  { name: "Economy", image: "/images/cabin-economy.png", tagline: "Comfort for every journey", seatPitch: "31–33 in pitch", recline: "6 in recline", amenities: ["Personal 12\" HD screen", "USB-C power", "Complimentary meals", "23kg baggage"] },
  { name: "Premium Economy", image: "/images/cabin-premium.png", tagline: "Extra space to unwind", seatPitch: "38 in pitch", recline: "9 in recline", amenities: ["13.3\" HD screen", "Priority boarding", "Enhanced dining", "2 × 23kg baggage"] },
  { name: "Business", image: "/images/cabin-business.png", tagline: "Lie-flat luxury at altitude", seatPitch: "Full lie-flat", recline: "180° flat bed", amenities: ["Direct aisle access", "Lounge access", "Chef-curated menu", "2 × 32kg baggage"] },
  { name: "First Class", image: "/images/cabin-first.png", tagline: "Your private suite in the sky", seatPitch: "Private suite", recline: "Full bed + closet", amenities: ["Sliding suite doors", "On-demand fine dining", "Chauffeur transfer", "3 × 32kg baggage"] },
]

export type LoyaltyTier = {
  name: string
  miles: string
  accent: "silver" | "gold" | "platinum"
  perks: string[]
}

export const loyaltyTiers: LoyaltyTier[] = [
  { name: "Silver", miles: "0 – 25,000 miles", accent: "silver", perks: ["Earn 1 mile / km flown", "Priority check-in", "Extra 5kg baggage"] },
  { name: "Gold", miles: "25,000 – 75,000 miles", accent: "gold", perks: ["Earn 1.5× miles", "Lounge access", "Priority boarding", "Extra 15kg baggage"] },
  { name: "Platinum", miles: "75,000+ miles", accent: "platinum", perks: ["Earn 2× miles", "Global lounge & suite access", "Guaranteed upgrades", "Dedicated concierge"] },
]

export const stats = [
  { value: 15, suffix: "M+", label: "Passengers Flown" },
  { value: 120, suffix: "+", label: "Global Destinations" },
  { value: 98, suffix: "%", label: "Satisfaction Rate" },
  { value: 25, suffix: "", label: "Years of Excellence" },
]
