"use client"

import { siteConfig } from "@/lib/config"
import { Link2 } from "lucide-react"
import { toast } from "sonner"

export function ShareMenu({ slug }: { slug: string }) {
  return (
    <div className="my-8 flex items-center gap-2">
      <button
        onClick={() => {
          navigator.clipboard.writeText(`${siteConfig.url}/blog/${slug}`)
          toast.success("Link copied to clipboard")
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        <Link2 size={16} />
        Copy link
      </button>
    </div>
  )
}
