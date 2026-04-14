import getMdContent from "@/lib/content/getContent"
import getMetadata from "@/lib/content/getMetadata"
import { pageTitle } from "@/lib/utils"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const post = getMdContent(`news/${slug}`)

  if (!post) return {}

  return { title: pageTitle(`${post.data.title} | News`) }
}

export async function generateStaticParams() {
  return getMetadata("news").map((post) => ({ slug: post.slug }))
}

export default async function NewsPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getMdContent(`news/${slug}`)
  const date = slug.match(/^(\d{4}-\d{2}-\d{2})/)![1]

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">{post.data.title}</h1>
      <p className="mb-8 text-sm text-zinc-500">{date}</p>
      <div className="max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}
