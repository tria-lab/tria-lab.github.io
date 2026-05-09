import BlogMetadata from "@/app/blog/_components/metadata"
import { A } from "@/components/Link"
import { ViewTransitionTitle } from "@/components/ViewTransitionTitle"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { openGraph, pageTitle } from "@/lib/utils"
import { ArrowRight, Rss } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: pageTitle("Blog"),
  openGraph: openGraph({ title: "Blog" }),
}

export default function Blog() {
  const posts = getDirMetadata("blog")

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        Blog{" "}
        <A target="_blank" href="/blog.xml" className="text-zinc-500">
          <Rss />
        </A>
      </h1>

      <section className="mb-12">
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article key={index} className="border-b border-zinc-500 pb-8 last:border-0">
              <ViewTransitionTitle name={`blog-title-${post.slug}`}>
                <h3 className="mb-1 text-xl font-semibold">{post.title}</h3>
              </ViewTransitionTitle>
              <ViewTransitionTitle name={`blog-meta-${post.slug}`}>
                <BlogMetadata metadata={post} className="mb-3" />
              </ViewTransitionTitle>
              <p className="mb-3">{post.excerpt}</p>
              <A
                href={`/blog/${post.slug}`}
                className="flex text-blue-400 transition-all duration-100 hover:gap-2 hover:underline"
              >
                Read <ArrowRight size={16} />
              </A>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
