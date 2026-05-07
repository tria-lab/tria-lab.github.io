"use client"

import { usePathname } from "next/navigation"
import NextTopLoader from "nextjs-toploader"
import nprogress from "nprogress"
import { useEffect } from "react"

export default function NavigationLoader() {
  const pathname = usePathname()

  useEffect(() => {
    nprogress.done()
  }, [pathname])

  return <NextTopLoader showSpinner={false} />
}
