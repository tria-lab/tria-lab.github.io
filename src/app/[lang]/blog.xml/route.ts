import { getTranslation, hasLocale, localePath, locales } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import getMdContent from "@/lib/content/getContent"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { Feed } from "feed"

export const dynamic = "force-static"
export const revalidate = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return new Response(null, { status: 404 })
  const { t } = await getTranslation(lang)
  const posts = getDirMetadata(lang, "blog")
  const siteUrl = siteConfig.url
  const feedUrl = `${siteUrl}${localePath(lang, "/blog")}`

  const feed = new Feed({
    title: `${siteConfig.title} - ${t("page.blog")}`,
    description: t("site.description"),
    id: feedUrl,
    link: feedUrl,
    language: lang,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.title}`,
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
  })

  for (const post of posts) {
    const { content } = getMdContent(lang, `blog/${post.slug}`)
    const postUrl = `${siteUrl}${localePath(lang, `/blog/${post.slug}`)}`
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.excerpt,
      content: content.slice(0, 500),
      date: new Date(post.date),
    })
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}
