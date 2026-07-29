import { type Locale, localePath } from "./config"
import { openGraph, pageTitle } from "@/lib/utils"
import type { Metadata } from "next"

export function localizedMetadata({
  lang,
  title,
  path = "/",
  description,
  type,
}: {
  lang: Locale
  title: string
  path?: string
  description?: string
  type?: string
}): Metadata {
  return {
    title: pageTitle(title),
    alternates: {
      canonical: localePath(lang, path),
      languages: {
        en: localePath("en", path),
        ko: localePath("ko", path),
      },
    },
    openGraph: openGraph({ lang, title, description, type, url: localePath(lang, path) }),
  }
}
