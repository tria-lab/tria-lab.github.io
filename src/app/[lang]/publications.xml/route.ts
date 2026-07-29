import { getTranslation, hasLocale, localePath, locales } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import { Feed } from "feed"
import fs from "fs"
import { load } from "js-yaml"
import { z } from "zod"

export const dynamic = "force-static"
export const revalidate = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const publicationSchema = z.object({
  titleEn: z.string().min(1),
  titleKo: z.string().min(1),
  authorsEn: z.string(),
  authorsKo: z.string(),
  date: z.string(),
  link: z.url(),
})

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return new Response(null, { status: 404 })
  const { t } = await getTranslation(lang)
  const publications = z
    .array(publicationSchema)
    .parse(load(fs.readFileSync("src/content/publications.yaml", "utf8")))
  const siteUrl = siteConfig.url
  const feedUrl = `${siteUrl}${localePath(lang, "/publications")}`

  const feed = new Feed({
    title: `${siteConfig.title} - ${t("page.publications")}`,
    description: t("site.description"),
    id: feedUrl,
    link: feedUrl,
    language: lang,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.title}`,
    updated: publications[0] ? new Date(publications[0].date) : new Date(),
  })

  for (const pub of publications) {
    feed.addItem({
      title: lang === "en" ? pub.titleEn : pub.titleKo,
      id: pub.link,
      link: pub.link,
      description: `${lang === "en" ? pub.authorsEn : pub.authorsKo} - ${pub.date}`,
      author: (lang === "en" ? pub.authorsEn : pub.authorsKo).split(", ").map((a) => ({ name: a })),
      date: new Date(pub.date.replace(/\./g, "-")),
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
