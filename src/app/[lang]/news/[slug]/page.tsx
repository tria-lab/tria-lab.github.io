import Breadcrumbs from "@/components/Breadcrumbs"
import JsonLd, { postJsonLd } from "@/components/JsonLd"
import Markdown from "@/components/Markdown"
import { ShareMenu } from "@/components/ShareMenu"
import { formatDate, getTranslation, hasLocale } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import getMdContent from "@/lib/content/getContent"
import { getDirMetadata, getFileMetadata } from "@/lib/content/getMetadata"
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
  const metadata = getFileMetadata(lang, `news/${slug}`)

  return localizedMetadata({
    lang,
    title: post.data.title,
    path: `/news/${slug}`,
    description: post.data.excerpt,
    type: "article",
    publishedTime: metadata.date,
    authors: metadata.authors,
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
  const metadata = getFileMetadata(lang, `news/${slug}`)
  const { t } = await getTranslation(lang)
  const jsonLd = postJsonLd({
    lang,
    section: "news",
    slug,
    metadata,
  })

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        lang={lang}
        items={[
          { name: t("page.home"), path: "/" },
          { name: t("page.news"), path: "/news" },
          { name: post.data.title, path: `/news/${slug}` },
        ]}
      />
      <ViewTransition name={`news-title-${slug}`}>
        <h1 className="mb-1 text-4xl font-bold">{post.data.title}</h1>
      </ViewTransition>
      <ViewTransition name={`news-meta-${slug}`}>
        <p className="mb-8 text-sm text-zinc-500">{formatDate(metadata.date, lang)}</p>
      </ViewTransition>
      <ShareMenu lang={lang} section="news" slug={slug} />
      <Markdown lang={lang}>{post.content}</Markdown>
    </article>
  )
}
