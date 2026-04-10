import { YAML } from "bun"
import fs from "fs"
import { z } from "zod"

const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.string(),
  date: z.string(),
  link: z.url(),
})

export default function Publications() {
  const publications = z
    .array(publicationSchema)
    .parse(YAML.parse(fs.readFileSync("src/content/publications.yaml", "utf8")))

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Publications</h1>

      <section className="mb-12">
        <div className="space-y-8">
          {publications.map(({ title, authors, date, link }, index) => (
            <div key={index} className="border-b pb-6">
              <h3 className="mb-2 text-xl font-medium">{title}</h3>
              <p className="mb-2 text-zinc-600">{authors}</p>
              <p className="mb-2 text-zinc-600">{date}</p>
              <a href={link} className="text-blue-400 hover:underline">
                Read paper
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
