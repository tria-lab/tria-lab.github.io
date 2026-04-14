import type { Metadata } from "next"
import { pageTitle } from "@/lib/utils"

export const metadata: Metadata = {
  title: pageTitle("News"),
}

export default function News() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">News</h1>
      <p className="text-lg text-zinc-600">coming soon</p>
    </div>
  )
}
