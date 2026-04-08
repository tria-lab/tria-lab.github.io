"use client"

import type { ReactNode } from "react"

export default function LinkNode({
  href,
  children,
}: {
  href?: string | undefined
  children: ReactNode
}) {
  const isExternalHttpLink = (href: string) =>
    href.startsWith("http://") || href.startsWith("https://")

  if (!href) return <span className="mb-4 text-[rgb(36,36,36)]">{children}</span>

  const external = isExternalHttpLink(href)

  return (
    <a
      className="mb-4 text-[rgb(36,36,36)]"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer nofollow" : undefined}
    >
      {children}
    </a>
  )
}
