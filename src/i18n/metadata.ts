import { type Locale, localePath } from "./config"
import { openGraph, pageTitle } from "@/lib/utils"
import type { Metadata } from "next"

export function localizedMetadata(
  options: {
    lang: Locale
    title: string
    path?: string
    description?: string
  } & (
    | {
        type: "article"
        publishedTime?: string
        authors?: string[]
      }
    | {
        type?: never
        publishedTime?: never
        authors?: never
      }
  ),
) {
  const { lang, title } = options
  const { path = "/", ...openGraphOptions } = options

  return {
    title: pageTitle(title),
    alternates: {
      canonical: localePath(lang, path),
      languages: {
        en: localePath("en", path),
        ko: localePath("ko", path),
        "x-default": localePath("en", path),
      },
    },
    openGraph: openGraph({ ...openGraphOptions, url: localePath(lang, path) }),
  } as const satisfies Metadata
}
