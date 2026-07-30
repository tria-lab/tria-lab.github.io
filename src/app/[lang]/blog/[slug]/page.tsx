import BlogMetadata from "@/components/BlogMetadata"
import Breadcrumbs from "@/components/Breadcrumbs"
import JsonLd, { postJsonLd } from "@/components/JsonLd"
import Markdown from "@/components/Markdown"
import { ShareMenu } from "@/components/ShareMenu"
import { getTranslation, hasLocale } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import getMdContent from "@/lib/content/getContent"
import { getDirMetadata, getFileMetadata } from "@/lib/content/getMetadata"
import type { Metadata } from "next"
import { basename } from "path"
import { ViewTransition } from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}

  const post = getMdContent(lang, `blog/${slug}`)

  if (!post) return {}
  const metadata = getFileMetadata(lang, `blog/${slug}`)

  return localizedMetadata({
    lang,
    title: post.data.title,
    path: `/blog/${slug}`,
    description: post.data.excerpt,
    type: "article",
    publishedTime: metadata.date,
    authors: metadata.authors,
  })
}

export async function generateStaticParams({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) return []
  return getDirMetadata(params.lang, "blog").map((post) => ({ slug: basename(post.slug) }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return null
  const post = getMdContent(lang, `blog/${slug}`)
  const metadata = getFileMetadata(lang, `blog/${slug}`)
  const { t } = await getTranslation(lang)
  const jsonLd = postJsonLd({
    lang,
    section: "blog",
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
          { name: t("page.blog"), path: "/blog" },
          { name: post.data.title, path: `/blog/${slug}` },
        ]}
      />
      <ViewTransition name={`blog-title-${slug}`}>
        <h1 className="mb-1 text-4xl font-bold">{post.data.title}</h1>
      </ViewTransition>
      <ViewTransition name={`blog-meta-${slug}`}>
        <BlogMetadata metadata={metadata} lang={lang} className="mb-8" />
      </ViewTransition>
      <ShareMenu lang={lang} section="blog" slug={slug} />
      <Markdown lang={lang}>{post.content}</Markdown>
    </article>
  )
}
