import { resources } from "./resources"
import { createInstance } from "i18next"

export const locales = ["en", "ko"] as const
export type Locale = (typeof locales)[number]

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

function localizedPath(lang: Locale, path: string) {
  return path === "/" ? `/${lang}` : `/${lang}${path.startsWith("/") ? path : `/${path}`}`
}

export function localePath(lang: Locale, path = "/") {
  const suffixIndex = path.search(/[?#]/)
  const pathname = suffixIndex === -1 ? path : path.slice(0, suffixIndex)
  const suffix = suffixIndex === -1 ? "" : path.slice(suffixIndex)
  const localized = localizedPath(lang, pathname).replace(/\/+$/, "")

  // next.config.ts enables trailingSlash, so page URLs must match Next's slash-terminated
  // canonicals. Next exempts static files; extensionless generated files use the helper below.
  const isStaticFile = /\/[^/]+\.[^/]+$/.test(pathname)
  return `${localized}${isStaticFile ? "" : "/"}${suffix}`
}

export function localeStaticFilePath(lang: Locale, path: string) {
  return localizedPath(lang, path).replace(/\/+$/, "")
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
