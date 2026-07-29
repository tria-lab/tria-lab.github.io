import { resources } from "./resources"
import { createInstance } from "i18next"

export const locales = ["en", "ko"] as const
export type Locale = (typeof locales)[number]

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function localePath(lang: Locale, path = "/") {
  return path === "/" ? `/${lang}` : `/${lang}${path.startsWith("/") ? path : `/${path}`}`
}

export async function getTranslation(lang: Locale) {
  const i18n = createInstance()
  await i18n.init({
    lng: lang,
    fallbackLng: "en",
    resources,
    interpolation: { escapeValue: false },
  })

  return { i18n, t: i18n.getFixedT(lang) }
}

export function formatDate(date: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`))
}
