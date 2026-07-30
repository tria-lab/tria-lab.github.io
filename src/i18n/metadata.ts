import { type Locale, localePath, localeStaticFilePath } from "./config"
import { openGraph, pageTitle } from "@/lib/utils"
import type { Metadata } from "next"

export function localizedMetadata(
  options: {
    lang: Locale
    title: string
    path?: string
    description?: string
    imagePath?: string
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
  const { path = "/", imagePath, ...openGraphOptions } = options

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
    openGraph: openGraph({
      ...openGraphOptions,
      url: localePath(lang, path),
      ...(imagePath && { imagePath: localeStaticFilePath(lang, imagePath) }),
    }),
  } as const satisfies Metadata
}
