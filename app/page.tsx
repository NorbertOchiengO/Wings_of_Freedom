import { BookingProvider } from "@/components/airline/booking-context"
import { Navbar } from "@/components/airline/navbar"
import { StickySearch } from "@/components/airline/sticky-search"
import { Hero } from "@/components/airline/hero"
import { SearchEngine } from "@/components/airline/search-engine"
import { Deals } from "@/components/airline/deals"
import { ValueProps } from "@/components/airline/value-props"
import { Destinations } from "@/components/airline/destinations"
import { Cabins } from "@/components/airline/cabins"
import { Loyalty } from "@/components/airline/loyalty"
import { SocialProof } from "@/components/airline/social-proof"
import { Reviews } from "@/components/airline/reviews"
import { Footer } from "@/components/airline/footer"

export default function Page() {
  return (
    <BookingProvider>
      <Navbar />
      <StickySearch />
      <main>
        <Hero />
        <SearchEngine />
        <ValueProps />
        <Deals />
        <Destinations />
        <Cabins />
        <Loyalty />
        <SocialProof />
        <Reviews />
      </main>
      <Footer />
    </BookingProvider>
  )
}
