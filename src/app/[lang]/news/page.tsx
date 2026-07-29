import { A } from "@/components/Link"
import { formatDate, getTranslation, hasLocale, localePath } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { ArrowRight, Rss } from "lucide-react"
import type { Metadata } from "next"
import { ViewTransition } from "react"

export async function generateMetadata({ params }: PageProps<"/[lang]/news">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return localizedMetadata({ lang, title: t("page.news"), path: "/news" })
}

export default async function News({ params }: PageProps<"/[lang]/news">) {
  const { lang } = await params
  if (!hasLocale(lang)) return null
  const { t } = await getTranslation(lang)
  const posts = getDirMetadata(lang, "news")

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">
        {t("page.news")}{" "}
        <A target="_blank" href={localePath(lang, "/news.xml")} className="text-zinc-500">
          <Rss />
        </A>
      </h1>

      <section className="mb-12">
        <div className="space-y-8">
          {posts.map(({ title, date, excerpt, slug }, index) => (
            <article key={index} className="border-b border-zinc-500 pb-8 last:border-0">
              <ViewTransition name={`news-title-${slug}`}>
                <h3 className="mb-1 text-xl font-semibold">{title}</h3>
              </ViewTransition>
              <ViewTransition name={`news-meta-${slug}`}>
                <p className="mb-3 text-sm text-zinc-500">{formatDate(date, lang)}</p>
              </ViewTransition>
              <p className="mb-3">{excerpt}</p>
              <A
                href={localePath(lang, `/news/${slug}`)}
                className="flex text-blue-400 transition-all duration-100 hover:gap-2 hover:underline"
              >
                {t("common.read")} <ArrowRight size={16} />
              </A>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
