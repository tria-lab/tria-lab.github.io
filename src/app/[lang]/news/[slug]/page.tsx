import Markdown from "@/components/Markdown"
import { ShareMenu } from "@/components/ShareMenu"
import { formatDate, hasLocale } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import getMdContent from "@/lib/content/getContent"
import { getDirMetadata } from "@/lib/content/getMetadata"
import type { Metadata } from "next"
import { ViewTransition } from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}

  const post = getMdContent(lang, `news/${slug}`)

  if (!post) return {}

  return localizedMetadata({
    lang,
    title: post.data.title,
    path: `/news/${slug}`,
    description: post.data.excerpt,
    type: "article",
  })
}

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) return []
  return getDirMetadata(params.lang, "news").map((post) => ({ slug: post.slug }))
}

export default async function NewsPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return null
  const post = getMdContent(lang, `news/${slug}`)
  const date = slug.match(/^(\d{4}-\d{2}-\d{2})/)![1]

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <ViewTransition name={`news-title-${slug}`}>
        <h1 className="mb-1 text-4xl font-bold">{post.data.title}</h1>
      </ViewTransition>
      <ViewTransition name={`news-meta-${slug}`}>
        <p className="mb-8 text-sm text-zinc-500">{formatDate(date, lang)}</p>
      </ViewTransition>
      <ShareMenu lang={lang} section="news" slug={slug} />
      <Markdown lang={lang}>{post.content}</Markdown>
    </article>
  )
}
