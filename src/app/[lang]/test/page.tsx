import Markdown from "@/components/Markdown"
import { getTranslation, hasLocale } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import getContent from "@/lib/content/getContent"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({ params }: PageProps<"/[lang]/test">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return {
    ...localizedMetadata({ lang, title: t("page.test"), path: "/test" }),
    robots: { index: false, follow: true },
  }
}

export default async function Test({ params }: PageProps<"/[lang]/test">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const { t } = await getTranslation(lang)
  const test = getContent(lang, "test")

  if (!test) return notFound()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">{t("page.test")}</h1>

      <article>
        <Markdown lang={lang}>{test.content}</Markdown>
      </article>
    </div>
  )
}
