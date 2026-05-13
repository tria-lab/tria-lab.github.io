import Markdown from "@/components/Markdown"
import getContent from "@/lib/content/getContent"
import { openGraph, pageTitle } from "@/lib/utils"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: pageTitle("Test"),
  openGraph: openGraph({ title: "Test" }),
}

export default function Test() {
  const test = getContent("test")

  if (!test) return notFound()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Test</h1>

      <article>
        <Markdown>{test.content}</Markdown>
      </article>
    </div>
  )
}
