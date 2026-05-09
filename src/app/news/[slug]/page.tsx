import { ShareMenu } from "@/components/ShareMenu"
import getMdContent from "@/lib/content/getContent"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { openGraph, pageTitle } from "@/lib/utils"
import type { Metadata } from "next"
import { ViewTransition } from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = getMdContent(`news/${slug}`)

  if (!post) return {}

  return {
    title: pageTitle(`${post.data.title} | News`),
    openGraph: openGraph({
      type: "article",
      title: post.data.title,
      description: post.data.excerpt,
    }),
  }
}

export async function generateStaticParams() {
  return getDirMetadata("news").map((post) => ({ slug: post.slug }))
}

export default async function NewsPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getMdContent(`news/${slug}`)
  const date = slug.match(/^(\d{4}-\d{2}-\d{2})/)![1]

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <ViewTransition name={`news-title-${slug}`}>
        <h1 className="mb-4 text-4xl font-bold">{post.data.title}</h1>
      </ViewTransition>
      <ViewTransition name={`news-meta-${slug}`}>
        <p className="mb-8 text-sm text-zinc-500">{date}</p>
      </ViewTransition>
      <ShareMenu slug={slug} />
      <div className="max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
