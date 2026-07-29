"use client"

import type { Locale } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import { Link2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

export function ShareMenu({
  lang,
  section,
  slug,
}: {
  lang: Locale
  section: "blog" | "news"
  slug: string
}) {
  const { t } = useTranslation()

  return (
    <div className="my-8 flex items-center gap-2">
      <button
        onClick={() => {
          void navigator.clipboard.writeText(`${siteConfig.url}/${lang}/${section}/${slug}`)
          toast.success(t("common.copied"))
        }}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
      >
        <Link2 size={16} />
        {t("common.copyLink")}
      </button>
    </div>
  )
}
