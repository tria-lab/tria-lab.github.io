import { siteConfig } from "@/lib/config"
import getMdContent from "@/lib/content/getContent"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { Feed } from "feed"

export const dynamic = "force-static"
export const revalidate = false

export async function GET() {
  const posts = getDirMetadata("blog")
  const siteUrl = siteConfig.url

  const feed = new Feed({
    title: `${siteConfig.title} - Blog`,
    description: siteConfig.description,
    id: siteUrl,
    link: `${siteUrl}/blog`,
    language: "en",
    copyright: `© ${new Date().getFullYear()} ${siteConfig.title}`,
    updated: posts[0] ? new Date(posts[0].date) : new Date(),
  })

  for (const post of posts) {
    const { content } = getMdContent(`blog/${post.slug}`)
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
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
