"use client"

import { cn } from "@/lib/utils"
import React from "react"

const styles = {
  1: "mb-6 text-4xl font-bold",
  2: "mt-8 mb-5 text-3xl font-semibold",
  3: "mt-6 mb-4 text-2xl font-semibold",
  4: "mt-5 mb-3 text-xl font-semibold",
  5: "mt-4 mb-2 text-base font-semibold",
  6: "mt-3 mb-1 text-sm font-semibold",
} as const

export default function Heading({
  level,
  children,
  className,
  id,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { level: number }) {
  const anchor = id ? (
    <a
      aria-label={`Link to ${id}`}
      className="mr-2 text-black/30 no-underline transition-colors hover:text-black"
      href={`#${id}`}
    >
      #
    </a>
  ) : null

  const headingProps = {
    className: cn("scroll-mt-24", styles[level as keyof typeof styles], className),
    id,
    ...props,
  }

  switch (level) {
    case 1:
      return (
        <h1 {...headingProps}>
          {anchor}
          {children}
        </h1>
      )
    case 2:
      return (
        <h2 {...headingProps}>
          {anchor}
          {children}
        </h2>
      )
    case 3:
      return (
        <h3 {...headingProps}>
          {anchor}
          {children}
        </h3>
      )
    case 4:
      return (
        <h4 {...headingProps}>
          {anchor}
          {children}
        </h4>
      )
    case 5:
      return (
        <h5 {...headingProps}>
          {anchor}
          {children}
        </h5>
      )
    case 6:
      return (
        <h6 {...headingProps}>
          {anchor}
          {children}
        </h6>
      )
    default:
      return (
        <h1 {...headingProps}>
          {anchor}
          {children}
        </h1>
      )
  }
}
