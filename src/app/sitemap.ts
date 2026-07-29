import { locales, localePath, type Locale } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { getPublications } from "@/lib/content/getPublications"
import { getTeam } from "@/lib/content/getTeam"
import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const staticRoutes = ["/", "/about", "/blog", "/news", "/publications", "/team", "/contact"]

function absoluteUrl(lang: Locale, path = "/") {
  return `${siteConfig.url}${localePath(lang, path)}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of locales) {
    for (const path of staticRoutes) {
      const entry: MetadataRoute.Sitemap[number] = {
        url: absoluteUrl(lang, path),
      }

      if (path === "/publications") {
        const [latest] = getPublications()
        if (latest) {
          entry.lastModified = new Date(latest.date.replaceAll(".", "-"))
        }
      }

      if (path === "/blog" || path === "/news") {
        const dir = path.slice(1)
        const latestPost = getDirMetadata(lang, dir)[0]
        if (latestPost) {
          entry.lastModified = new Date(`${latestPost.date}T00:00:00Z`)
        }
      }

      entries.push(entry)
    }

    for (const dir of ["blog", "news"] as const) {
      for (const post of getDirMetadata(lang, dir)) {
        entries.push({
          url: absoluteUrl(lang, `/${dir}/${post.slug}`),
          lastModified: new Date(`${post.date}T00:00:00Z`),
        })
      }
    }

    const team = getTeam()
    for (const member of [...team.professors, ...team.students]) {
      entries.push({
        url: absoluteUrl(lang, `/team/${member.uid}`),
      })
    }
  }

  return entries
}
