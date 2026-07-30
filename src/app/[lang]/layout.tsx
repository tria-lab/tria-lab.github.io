import Footer from "../_components/Footer"
import Navbar from "../_components/Navbar"
import NavigationLoader from "../_components/NavigationLoader"
import "../globals.css"
import JsonLd from "@/components/JsonLd"
import { Toaster } from "@/components/ui/sonner"
import I18nProvider from "@/i18n/I18nProvider"
import { getTranslation, hasLocale, locales } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import { getContact } from "@/lib/content/getContact"
import "katex/dist/katex.min.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Graph } from "schema-dts"

// See <https://nextjs.org/docs/app/guides/json-ld>.
function OrganizationJsonLd({
  lang,
  description,
}: {
  lang: (typeof locales)[number]
  description: string
}) {
  const { addressEn, addressKo, email } = getContact()
  const address = lang === "en" ? addressEn : addressKo
  const organizationId = `${siteConfig.url}/#organization` as const
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ResearchOrganization",
        "@id": organizationId,
        name: siteConfig.title,
        alternateName: siteConfig.description,
        description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/favicon.svg`,
        email,
        parentOrganization: {
          "@type": "CollegeOrUniversity",
          name: lang === "en" ? "Hongik University" : "홍익대학교",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: address,
          addressLocality: lang === "en" ? "Seoul" : "서울",
          addressRegion: lang === "en" ? "Seoul" : "서울특별시",
          addressCountry: "KR",
        },
      },
    ],
  } as const satisfies Graph

  return <JsonLd data={jsonLd} />
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}

  const { t } = await getTranslation(lang)
  return {
    metadataBase: new URL("https://trialab.org"),
    title: "TRIA Lab",
    description: t("site.description"),
    icons: { icon: "/favicon.svg" },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const { t } = await getTranslation(lang)

  return (
    <html lang={lang} className="h-screen antialiased" data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col selection:bg-hongik-black selection:text-hongik-white">
        <OrganizationJsonLd lang={lang} description={t("home.mission")} />
        <I18nProvider lang={lang}>
          <NavigationLoader />
          <Navbar lang={lang} />
          <main className="flex-1 pt-17.5">{children}</main>
          <Footer hongikLogoAlt={t("footer.hongikLogo")} />
          <Toaster />
        </I18nProvider>
      </body>
    </html>
  )
}
