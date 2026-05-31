"use client"

import { useCallback, useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { SectionHeading } from "./section-heading"
import { reviews } from "@/lib/airline-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function Reviews() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  // auto-scroll
  useEffect(() => {
    if (!emblaApi) return
    const id = setInterval(() => emblaApi.scrollNext(), 4500)
    return () => clearInterval(id)
  }, [emblaApi])

  return (
    <section className="border-y border-border/60 bg-secondary/40 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Loved worldwide"
            title="What Our Travelers Say"
            description="Real stories from millions of journeys taken with Wings of Freedom."
          />
          <div className="flex gap-2">
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {reviews.map((r) => (
              <div key={r.name} className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
                <figure className="flex h-full flex-col rounded-3xl border border-border/70 bg-card p-6">
                  <Quote className="h-8 w-8 text-sky/30" />
                  <div className="mt-2 flex items-center gap-0.5 text-gold">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                    {`"${r.text}"`}
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        {r.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {snaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                selected === i ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
