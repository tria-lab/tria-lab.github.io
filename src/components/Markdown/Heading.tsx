"use client"

import React from "react"

export default function Heading({ level, children }: { level: number; children: React.ReactNode }) {
  switch (level) {
    case 1:
      return <h1 className="mb-6 text-[40px]">{children}</h1>
    case 2:
      return <h2 className="mb-5">{children}</h2>
    case 3:
      return <h3 className="mb-4">{children}</h3>
    case 4:
      return <h4 className="mb-3">{children}</h4>
    case 5:
      return <h5 className="mb-2">{children}</h5>
    case 6:
      return <h6 className="mb-1">{children}</h6>
    default:
      return <h1 className="mb-6 text-[40px]">{children}</h1>
  }
}
