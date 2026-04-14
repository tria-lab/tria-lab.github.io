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

  const post = getMdContent(`blog/${slug}`)

  if (!post) return {}

  return { title: pageTitle(`${post.data.title} | Blog`) }
}

export async function generateStaticParams() {
  const posts = getMetadata("blog")
  return posts.map((post) => ({ slug: post.slug }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getMdContent(`blog/${slug}`)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-4 text-4xl font-bold">{post.data.title}</h1>
      <p className="mb-8 text-sm text-zinc-500">{post.data.date}</p>
      <div
        className="prose prose-zinc max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
