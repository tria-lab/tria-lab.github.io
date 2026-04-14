import { A } from "@/components/Link"
import getMetadata from "@/lib/content/getMetadata"
import { pageTitle } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: pageTitle("Blog"),
}

export default function Blog() {
  const posts = getMetadata("blog")

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>

      <section className="mb-12">
        <div className="space-y-8">
          {posts.map(({ title, date, readingTime, wordCount, excerpt, slug }, index) => (
            <article key={index} className="border-b border-zinc-500 pb-8 last:border-0">
              <h3 className="mb-1 text-xl font-semibold">{title}</h3>
              <p className="mb-3 text-sm text-zinc-500">
                {date} · {readingTime} min read · {wordCount} words
              </p>
              <p className="mb-3">{excerpt}</p>
              <A
                href={`/blog/${slug}`}
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
