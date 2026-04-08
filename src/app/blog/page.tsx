export default function Blog() {
  const posts = [
    {
      title: "Getting Started with Research",
      date: "March 15, 2026",
      wordCount: 1000,
      readingTime: 60,
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    },
    {
      title: "Our Latest Findings",
      date: "February 28, 2026",
      wordCount: 1000,
      readingTime: 60,
      excerpt:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat...",
    },
    {
      title: "Conference Highlights",
      date: "January 10, 2026",
      wordCount: 1000,
      readingTime: 60,
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet purus quis metus aliquam, vitae fermentum ex...",
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Blog</h1>

      <section className="mb-12">
        <div className="space-y-8">
          {posts.map(({ title, date, readingTime, wordCount, excerpt }, index) => (
            <article key={index} className="border-b border-zinc-500 pb-8 last:border-0">
              <h3 className="mb-1 text-xl font-semibold">{title}</h3>
              <p className="mb-3 text-sm text-zinc-500">
                {date} · {readingTime} min read · {wordCount} words
              </p>
              <p className="mb-3">{excerpt}</p>
              <a href="#" className="text-blue-400 hover:underline">
                Read more
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
