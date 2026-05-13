"use client"

import React from "react"

export default function Heading({ level, children }: { level: number; children: React.ReactNode }) {
  switch (level) {
    case 1:
      return <h1 className="mb-6 text-4xl font-bold">{children}</h1>
    case 2:
      return <h2 className="mt-8 mb-5 text-3xl font-semibold">{children}</h2>
    case 3:
      return <h3 className="mt-6 mb-4 text-2xl font-semibold">{children}</h3>
    case 4:
      return <h4 className="mt-5 mb-3 text-xl font-semibold">{children}</h4>
    case 5:
      return <h5 className="mt-4 mb-2 text-base font-semibold">{children}</h5>
    case 6:
      return <h6 className="mt-3 mb-1 text-sm font-semibold">{children}</h6>
    default:
      return <h1>{children}</h1>
  }
}
