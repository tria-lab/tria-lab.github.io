import OpenGraphImage, { openGraphImageSize } from "@/components/OpenGraphImage"
import { getTranslation, hasLocale, locales } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import { ImageResponse } from "@vercel/og"

export const dynamic = "force-static"
export const alt = siteConfig.title
export const size = openGraphImageSize
export const contentType = "image/png"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) return new Response(null, { status: 404 })
  const { t } = await getTranslation(lang)

  return new ImageResponse(
    <OpenGraphImage
      label={siteConfig.title}
      title={siteConfig.title}
      detail={t("site.description")}
    />,
    size,
  )
}
