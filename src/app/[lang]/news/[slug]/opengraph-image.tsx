import OpenGraphImage, { openGraphImageSize } from "@/components/OpenGraphImage"
import { getTranslation, hasLocale, locales } from "@/i18n/config"
import { getDirMetadata, getFileMetadata } from "@/lib/content/getMetadata"
import { ImageResponse } from "@vercel/og"

export const dynamic = "force-static"
export const alt = "TRIA Lab news article"
export const size = openGraphImageSize
export const contentType = "image/png"

export function generateStaticParams() {
  return locales.flatMap((lang) => getDirMetadata(lang, "news").map(({ slug }) => ({ lang, slug })))
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return new Response(null, { status: 404 })
  const post = getFileMetadata(lang, `news/${slug}`)
  const { t } = await getTranslation(lang)

  return new ImageResponse(
    <OpenGraphImage label={t("page.news")} title={post.title} detail={post.date} />,
    size,
  )
}
