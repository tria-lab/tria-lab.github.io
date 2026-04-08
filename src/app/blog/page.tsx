import getMetadata from "@/lib/content/getMetadata"

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
              <a href={`/blog/${slug}`} className="text-blue-400 hover:underline">
                Read more
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
