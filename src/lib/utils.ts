import { siteConfig } from "./config"
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "@/app/[lang]/opengraph-image.png/route"
import type { Locale } from "@/i18n/config"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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
  type,
}: {
  lang: Locale
  title: string
  description?: string
  url?: string
  type?: string
}) {
  return {
    title: pageTitle(title),
    description: description || siteConfig.description,
    ...(url && { url }),
    ...(type && { type }),
    locale: lang,
    images: [{ url: `/${lang}/opengraph-image.png`, width: IMAGE_WIDTH, height: IMAGE_HEIGHT }],
  }
}
