import BlogMetadata from "@/app/blog/_components/metadata"
import Markdown from "@/components/Markdown"
import { ShareMenu } from "@/components/ShareMenu"
import getMdContent from "@/lib/content/getContent"
import { getDirMetadata, getFileMetadata } from "@/lib/content/getMetadata"
import { openGraph, pageTitle } from "@/lib/utils"
import type { Metadata } from "next"
import { basename } from "path"
import { ViewTransition } from "react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = getMdContent(`blog/${slug}`)

  if (!post) return {}

  return {
    title: pageTitle(`${post.data.title} | Blog`),
    openGraph: openGraph({
      type: "article",
      title: post.data.title,
      description: post.data.excerpt,
    }),
  }
}

export async function generateStaticParams() {
  return getDirMetadata("blog").map((post) => ({ slug: basename(post.slug) }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getMdContent(`blog/${slug}`)
  const metadata = getFileMetadata(`blog/${slug}`)
  const date = slug.match(/^(\d{4}-\d{2}-\d{2})/)![1]

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <ViewTransition name={`blog-title-${slug}`}>
        <h1>{post.data.title}</h1>
      </ViewTransition>
      <ViewTransition name={`blog-meta-${slug}`}>
        <BlogMetadata metadata={{ ...metadata, date }} className="mb-8" />
      </ViewTransition>
      <ShareMenu slug={slug} />
      <Markdown>{post.content}</Markdown>
    </article>
  )
}
