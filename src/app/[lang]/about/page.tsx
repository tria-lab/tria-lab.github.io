import Markdown from "@/components/Markdown"
import { getTranslation, hasLocale } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import getContent from "@/lib/content/getContent"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return localizedMetadata({ lang, title: t("page.about"), path: "/about" })
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const { t } = await getTranslation(lang)
  const about = getContent(lang, "about")

  if (!about) return notFound()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">{t("page.about")}</h1>

      <article>
        <Markdown lang={lang}>{about.content}</Markdown>
      </article>
    </div>
  )
}
