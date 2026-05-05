import { A } from "@/components/Link"
import { openGraph, pageTitle } from "@/lib/utils"
import fs from "fs"
import { load } from "js-yaml"
import type { Metadata } from "next"
import { z } from "zod"

export const metadata: Metadata = {
  title: pageTitle("Publications"),
  openGraph: openGraph({ title: "Publications" }),
}

const publicationSchema = z.object({
  title: z.string().min(1),
  authors: z.string(),
  date: z.string(),
  link: z.url(),
})

export default function Publications() {
  const publications = z
    .array(publicationSchema)
    .parse(load(fs.readFileSync("src/content/publications.yaml", "utf8")))

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
              <A href={link}>Read</A>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
