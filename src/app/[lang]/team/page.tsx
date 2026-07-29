import { A } from "@/components/Link"
import Markdown from "@/components/Markdown"
import { getTranslation, hasLocale, localePath } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import getContent from "@/lib/content/getContent"
import {
  getMemberDepartment,
  getMemberName,
  getMemberResearchArea,
  getTeam,
  getTeamMemberImage,
} from "@/lib/content/getTeam"
import { SiGooglescholar, SiGithub } from "@icons-pack/react-simple-icons"
import { Mail, User } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export async function generateMetadata({ params }: PageProps<"/[lang]/team">): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const { t } = await getTranslation(lang)
  return localizedMetadata({ lang, title: t("page.team"), path: "/team" })
}

export default async function Team({ params }: PageProps<"/[lang]/team">) {
  const { lang } = await params
  if (!hasLocale(lang)) return null
  const { t } = await getTranslation(lang)
  const { professors, students } = getTeam()
  const teamMd = getContent(lang, "team")

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">{t("page.ourTeam")}</h1>

      {teamMd && (
        <div className="mb-8">
          <Markdown lang={lang}>{teamMd.content}</Markdown>
        </div>
      )}

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">{t("team.professors")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {professors.map((member) => {
            const { uid, email, googleScholar } = member
            const name = getMemberName(member, lang)
            const imageSrc = getTeamMemberImage(uid)

            return (
              <div
                key={uid}
                className="group relative rounded-lg border p-6 transition-colors hover:border-hongik-medium-blue"
              >
                <Link
                  href={localePath(lang, `/team/${uid}`)}
                  className="absolute inset-0 z-10 rounded-lg"
                  aria-label={t("team.profile", { name })}
                />
                <div className="mb-4 flex aspect-3/4 overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={name}
                      width={1000}
                      height={750}
                      className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <User
                      className="size-full text-gray-200 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      strokeWidth={0.5}
                    />
                  )}
                </div>
                <h3 className="inline text-xl font-semibold">{name}</h3>{" "}
                {googleScholar && (
                  <A href={googleScholar} title="Google Scholar" noIcon className="relative z-20">
                    <SiGooglescholar />
                  </A>
                )}
                <ul>
                  <li className="flex gap-2">
                    <Mail />{" "}
                    <A href={`mailto:${email}`} className="relative z-20">
                      {email}
                    </A>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">{t("team.students")}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {students.map((member) => {
            const { uid, github } = member
            const name = getMemberName(member, lang)
            const department = getMemberDepartment(member, lang)
            const researchArea = getMemberResearchArea(member, lang)
            const imageSrc = getTeamMemberImage(uid)

            return (
              <div
                key={uid}
                className="group relative rounded-lg border p-6 transition-colors hover:border-hongik-medium-blue"
              >
                <Link
                  href={localePath(lang, `/team/${uid}`)}
                  className="absolute inset-0 z-10 rounded-lg"
                  aria-label={t("team.profile", { name })}
                />
                <div className="mb-4 flex aspect-3/4 overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={name}
                      width={1000}
                      height={750}
                      className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <User
                      className="size-full text-gray-200 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      strokeWidth={0.5}
                    />
                  )}
                </div>

                <div className="mb-4 flex h-10 items-center">
                  <h3 className="inline text-xl font-semibold">{name}</h3>
                  {github && (
                    <A
                      href={github}
                      title="Github"
                      noIcon
                      className="relative z-20 ml-2 inline-block"
                    >
                      <SiGithub />
                    </A>
                  )}
                </div>

                {department && (
                  <>
                    <span className="mb-2 font-bold">{t("team.department")}</span>{" "}
                    <span>{department}</span>
                    <br />
                  </>
                )}

                {researchArea && (
                  <>
                    <span className="font-bold">{t("team.researchArea")}</span>{" "}
                    <span>{researchArea}</span>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
