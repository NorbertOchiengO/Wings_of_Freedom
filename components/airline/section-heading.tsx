"use client"

import { motion } from "framer-motion"

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
    >
      {eyebrow && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky">{eyebrow}</p>
      )}
      <h2 className="font-serif text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">{description}</p>
      )}
    </motion.div>
  )
}
