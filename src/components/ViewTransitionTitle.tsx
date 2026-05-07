"use client"

import { ViewTransition } from "react"

export function ViewTransitionTitle({
  children,
  name,
}: {
  children: React.ReactNode
  name: string
}) {
  return <ViewTransition name={name}>{children}</ViewTransition>
}
