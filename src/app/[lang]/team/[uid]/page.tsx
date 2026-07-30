import BlogMetadata from "@/components/BlogMetadata"
import Breadcrumbs from "@/components/Breadcrumbs"
import JsonLd from "@/components/JsonLd"
import { A } from "@/components/Link"
import { getTranslation, hasLocale, localePath, locales } from "@/i18n/config"
import { localizedMetadata } from "@/i18n/metadata"
import { siteConfig } from "@/lib/config"
import { getContact } from "@/lib/content/getContact"
import { getDirMetadata } from "@/lib/content/getMetadata"
import {
  getMemberDepartment,
  getMemberName,
  getMemberResearchArea,
  getTeam,
  getTeamMemberById,
  getTeamMemberImage,
} from "@/lib/content/getTeam"
import { SiGooglescholar, SiGithub } from "@icons-pack/react-simple-icons"
import { ArrowRight, Mail, User } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ViewTransition } from "react"
import type { Person, WithContext } from "schema-dts"

export async function generateStaticParams() {
  const { professors, students } = getTeam()
  return locales.flatMap((lang) =>
    [...professors, ...students].map((member) => ({ lang, uid: member.uid })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>
}): Promise<Metadata> {
  const { lang, uid: encodedUid } = await params
  if (!hasLocale(lang)) return {}
  const uid = decodeURIComponent(encodedUid)
  const member = getTeamMemberById(uid)

  if (!member) return {}

  const { t } = await getTranslation(lang)
  const name = getMemberName(member, lang)
  return localizedMetadata({
    lang,
    title: `${name} | ${t("page.team")}`,
    path: `/team/${member.uid}`,
    description: lang === "ko" ? member.nameEn : member.nameKo,
  })
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ lang: string; uid: string }>
}) {
  const { lang, uid: encodedUid } = await params
  if (!hasLocale(lang)) notFound()
  const uid = decodeURIComponent(encodedUid)
  const member = getTeamMemberById(uid)

  if (!member) notFound()

  const imageSrc = getTeamMemberImage(member.uid)
  const isProfessor = "email" in member
  const { t } = await getTranslation(lang)
  const name = getMemberName(member, lang)
  const department = getMemberDepartment(member, lang)
  const researchArea = getMemberResearchArea(member, lang)
  const posts = getDirMetadata(lang, "blog").filter(
    (post) => post.authors.includes(member.uid) || post.authors.includes(member.nameKo),
  )
  const { addressEn, addressKo } = getContact()
  const profileUrl = `${siteConfig.url}${localePath(lang, `/team/${member.uid}`)}`
  const sameAs = [
    "github" in member ? member.github : undefined,
    "googleScholar" in member ? member.googleScholar : undefined,
  ].filter((url): url is string => Boolean(url))
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person-${encodeURIComponent(member.uid)}`,
    name,
    url: profileUrl,
    jobTitle: t(isProfessor ? "team.professor" : "team.student"),
    worksFor: {
      "@type": "ResearchOrganization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.title,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: lang === "en" ? addressEn : addressKo,
      addressCountry: "KR",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(imageSrc ? { image: `${siteConfig.url}${imageSrc}` } : {}),
  } as const satisfies WithContext<Person>

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        lang={lang}
        items={[
          { name: t("page.home"), path: "/" },
          { name: t("page.team"), path: "/team" },
          { name, path: `/team/${member.uid}` },
        ]}
      />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full max-w-75 shrink-0 rounded-sm border border-black/20">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={name}
              width={300}
              height={400}
              className="aspect-3/4 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex aspect-3/4 w-full items-center justify-center rounded-lg">
              <User className="size-full text-gray-200" strokeWidth={0.5} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold">{name}</h1>
          {lang === "ko" && member.nameEn && (
            <p className="text-xl text-zinc-500">{member.nameEn}</p>
          )}

          <p className="mt-2 text-lg font-medium text-zinc-700">
            {t(isProfessor ? "team.professor" : "team.student")}
          </p>

          <div className="mt-6 space-y-3">
            {department && (
              <p>
                <span className="font-bold">{t("team.department")}</span> {department}
              </p>
            )}

            {researchArea && (
              <p>
                <span className="font-bold">{t("team.researchArea")}</span> {researchArea}
              </p>
            )}

            {"email" in member && (
              <p className="flex items-center gap-2">
                <Mail className="size-5" />
                <A href={`mailto:${member.email}`}>{member.email}</A>
              </p>
            )}

            {"github" in member && member.github && (
              <p className="flex items-center gap-2">
                <SiGithub className="size-5" />
                <A href={member.github}>GitHub</A>
              </p>
            )}

            {"googleScholar" in member && member.googleScholar && (
              <p className="flex items-center gap-2">
                <SiGooglescholar className="size-5" />
                <A href={member.googleScholar}>Google Scholar</A>
              </p>
            )}
          </div>
        </div>
      </div>

      {posts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">{t("team.blogPosts")}</h2>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-zinc-500 pb-8 last:border-0">
                <ViewTransition name={`blog-title-${post.slug}`}>
                  <h3 className="mb-1 text-xl font-semibold">{post.title}</h3>
                </ViewTransition>
                <ViewTransition name={`blog-meta-${post.slug}`}>
                  <BlogMetadata metadata={post} lang={lang} className="mb-3" />
                </ViewTransition>
                <p className="mb-3">{post.excerpt}</p>
                <A
                  href={localePath(lang, `/blog/${post.slug}`)}
                  className="flex text-blue-400 transition-all duration-100 hover:gap-2 hover:underline"
                >
                  {t("common.read")} <ArrowRight size={16} />
                </A>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
