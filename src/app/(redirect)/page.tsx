"use client"

import { useEffect } from "react"

export default function LocaleRedirect() {
  useEffect(() => {
    const lang = navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en"
    window.location.replace(`/${lang}/`)
  }, [])

  return (
    <main className="grid min-h-screen place-items-center">
      Redirecting to your language... / 언어 페이지로 이동 중...
    </main>
  )
}
