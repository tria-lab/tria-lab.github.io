import OpenGraphImage, { openGraphImageSize } from "@/components/OpenGraphImage"
import { getTranslation, hasLocale, locales } from "@/i18n/config"
import { getMemberName, getTeam, getTeamMemberById } from "@/lib/content/getTeam"
import { ImageResponse } from "@vercel/og"

export const dynamic = "force-static"
export const alt = "TRIA Lab team member"
export const size = openGraphImageSize
export const contentType = "image/png"

export function generateStaticParams() {
  const { professors, students } = getTeam()
  return locales.flatMap((lang) => [...professors, ...students].map(({ uid }) => ({ lang, uid })))
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>
}) {
  const { lang, uid: encodedUid } = await params
  if (!hasLocale(lang)) return new Response(null, { status: 404 })
  const member = getTeamMemberById(decodeURIComponent(encodedUid))
  if (!member) return new Response(null, { status: 404 })
  const { t } = await getTranslation(lang)
  const role = t("email" in member ? "team.professor" : "team.student")

  return new ImageResponse(
    <OpenGraphImage label={t("page.team")} title={getMemberName(member, lang)} detail={role} />,
    size,
  )
}
