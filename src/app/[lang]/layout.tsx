import Footer from "../_components/Footer"
import Navbar from "../_components/Navbar"
import NavigationLoader from "../_components/NavigationLoader"
import "../globals.css"
import { Toaster } from "@/components/ui/sonner"
import I18nProvider from "@/i18n/I18nProvider"
import { getTranslation, hasLocale, locales } from "@/i18n/config"
import "katex/dist/katex.min.css"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

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
