import { A } from "@/components/Link"
import { getTranslation, hasLocale, localePath } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import type { Metadata } from "next"

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return localizedMetadata({ lang, title: t("page.home") })
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) return null
  const { t } = await getTranslation(lang)

  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold">TRIA Lab</h1>
        <p className="mb-4 text-xl text-hongik-medium-gray">
          <strong>
            {/* cSpell: disable-next-line */}
            <span className="text-hongik-dark-gray">TR</span>ustworthy
            {" " /* cSpell: disable-next-line */}
            <span className="text-hongik-dark-gray">I</span>ntelligence for
            {" " /* cSpell: disable-next-line */}
            <span className="text-hongik-dark-gray">A</span>utonomous systems Laboratory
          </strong>
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          {t("home.meetTeamBefore")} <A href={localePath(lang, "/team")}>{t("page.team")}</A>
          {t("home.meetTeamAfter")}
        </p>
      </section>
    </div>
  )
}
