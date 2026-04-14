import Markdown from "@/components/Markdown"
import getContent from "@/lib/content/getContent"
import { pageTitle } from "@/lib/utils"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: pageTitle("About"),
}

export default function About() {
  const about = getContent("about")

  if (!about) return notFound()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">About</h1>

      <article>
        <Markdown>{about.content}</Markdown>
      </article>
    </div>
  )
}
