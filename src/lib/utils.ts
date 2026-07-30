import { siteConfig } from "./config"
import { openGraphImageSize } from "@/components/OpenGraphImage"
import type { Locale } from "@/i18n/config"
import { clsx, type ClassValue } from "clsx"
import type { Metadata } from "next"
import { twMerge } from "tailwind-merge"

const openGraphLocales = {
  en: "en_US",
  ko: "ko_KR",
} as const satisfies Record<Locale, string>

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pageTitle(pageName: string) {
  return `${pageName} | ${siteConfig.title}`
}

export function openGraph({
  lang,
  title,
  description,
  url,
  imagePath,
  type,
  publishedTime,
  authors,
}: {
  lang: Locale
  title: string
  description?: string
  url?: string
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
)) {
  const metadata = {
    title: pageTitle(title),
    description: description || siteConfig.description,
    ...(url && { url }),
    locale: openGraphLocales[lang],
    alternateLocale: lang === "en" ? openGraphLocales.ko : openGraphLocales.en,
    images: [
      {
        url: imagePath || `/${lang}/opengraph-image`,
        ...openGraphImageSize,
        type: "image/png",
        alt: url === `/${lang}` ? siteConfig.description : `${title} — ${siteConfig.title}`,
      },
    ],
  } as const satisfies Metadata["openGraph"]

  if (type === "article") {
    return {
      ...metadata,
      type,
      ...(publishedTime && { publishedTime }),
      ...(authors?.length && { authors }),
    } as const satisfies Metadata["openGraph"]
  }

  return metadata satisfies Metadata["openGraph"]
}
