import { siteConfig } from "@/lib/config"
import { Feed } from "feed"
import fs from "fs"
import { load } from "js-yaml"
import { z } from "zod"

export const dynamic = "force-static"
export const revalidate = false

const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.string(),
  date: z.string(),
  link: z.url(),
})

export async function GET() {
  const publications = z
    .array(publicationSchema)
    .parse(load(fs.readFileSync("src/content/publications.yaml", "utf8")))
  const siteUrl = siteConfig.url

  const feed = new Feed({
    title: `${siteConfig.title} - Publications`,
    description: siteConfig.description,
    id: siteUrl,
    link: `${siteUrl}/publications`,
    language: "en",
    copyright: `© ${new Date().getFullYear()} ${siteConfig.title}`,
    updated: publications[0] ? new Date(publications[0].date) : new Date(),
  })

  for (const pub of publications) {
    feed.addItem({
      title: pub.title,
      id: pub.link,
      link: pub.link,
      description: `${pub.authors} - ${pub.date}`,
      author: pub.authors.split(", ").map((a) => ({ name: a })),
      date: new Date(pub.date.replace(/\./g, "-")),
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
