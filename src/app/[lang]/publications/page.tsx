import Breadcrumbs from "@/components/Breadcrumbs"
import JsonLd, { publicationJsonLd } from "@/components/JsonLd"
import { A } from "@/components/Link"
import { formatDate, getTranslation, hasLocale, localePath } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import { getPublications } from "@/lib/content/getPublications"
import { Rss } from "lucide-react"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/publications">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return localizedMetadata({ lang, title: t("page.publications"), path: "/publications" })
}

export default async function Publications({ params }: PageProps<"/[lang]/publications">) {
  const { lang } = await params
  if (!hasLocale(lang)) return null
  const { t } = await getTranslation(lang)
  const publications = getPublications()

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Breadcrumbs
        lang={lang}
        items={[
          { name: t("page.home"), path: "/" },
          { name: t("page.publications"), path: "/publications" },
        ]}
      />
      {publications.map((publication, index) => (
        <JsonLd
          key={`${publication.link}-${index}`}
          data={publicationJsonLd({ lang, publication })}
        />
      ))}
      <h1 className="mb-8 text-4xl font-bold">
        {t("page.publications")}{" "}
        <A target="_blank" href={localePath(lang, "/publications.xml")} className="text-zinc-500">
          <Rss />
        </A>
      </h1>

      <section className="mb-12">
        <div className="space-y-8">
          {publications.length > 0 ? (
            publications.map(({ titleEn, titleKo, authorsEn, authorsKo, date, link }, index) => (
              <div key={index} className="border-b pb-6">
                <h3 className="mb-2 text-xl font-medium">{lang === "en" ? titleEn : titleKo}</h3>
                <p className="mb-2 text-zinc-600">{lang === "en" ? authorsEn : authorsKo}</p>
                <p className="mb-2 text-zinc-600">{formatDate(date.replaceAll(".", "-"), lang)}</p>
                <A href={link}>{t("common.read")}</A>
              </div>
            ))
          ) : (
            <p className="text-lg text-zinc-600">{t("publications.empty")}</p>
          )}
        </div>
      </section>
    </div>
  )
}
