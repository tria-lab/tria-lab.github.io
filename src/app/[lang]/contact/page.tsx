import ContactMap from "./ContactMap"
import { A } from "@/components/Link"
import { getTranslation, hasLocale } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import { getContact } from "@/lib/content/getContact"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return localizedMetadata({ lang, title: t("page.contact"), path: "/contact" })
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params
  if (!hasLocale(lang)) return null
  const { t } = await getTranslation(lang)
  const { addressEn, addressKo, email } = getContact()
  const address = lang === "en" ? addressEn : addressKo

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">{t("page.contact")}</h1>

      <section className="mb-12">
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">{t("contact.address")}</h3>
            <p dangerouslySetInnerHTML={{ __html: address.replace(/\n/g, "<br/>") }} />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">{t("contact.email")}</h3>
            <A href={`mailto:${email}`}>{email}</A>
          </div>
        </div>

        <ContactMap />
      </section>
    </div>
  )
}
