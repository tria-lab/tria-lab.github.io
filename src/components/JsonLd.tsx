import { localePath, localeStaticFilePath, type Locale } from "@/i18n/config"
import { siteConfig } from "@/lib/config"
import type { Metadata as PostMetadata } from "@/lib/content/getMetadata"
import type { Publication } from "@/lib/content/getPublications"
import { getMemberName, getTeamMemberByUid } from "@/lib/content/getTeam"
import type { Article, BlogPosting, Graph, ScholarlyArticle, Thing, WithContext } from "schema-dts"

export function postJsonLd({
  lang,
  section,
  slug,
  metadata,
}: {
  lang: Locale
  section: "blog" | "news"
  slug: string
  metadata: PostMetadata
}) {
  const postUrl = `${siteConfig.url}${localePath(lang, `/${section}/${slug}`)}`
  const imageUrl = `${siteConfig.url}${localeStaticFilePath(
    lang,
    `/${section}/${slug}/opengraph-image`,
  )}`
  const authors = metadata.authors.map((author) => {
    const member = getTeamMemberByUid(author)
    return {
      "@type": "Person" as const,
      name: member ? getMemberName(member, lang) : author,
      ...(member ? { "@id": `${siteConfig.url}/#person-${encodeURIComponent(member.uid)}` } : {}),
    }
  })

  return {
    "@context": "https://schema.org",
    "@type": section === "blog" ? "BlogPosting" : "Article",
    headline: metadata.title,
    description: metadata.excerpt,
    datePublished: metadata.date,
    dateModified: metadata.date,
    wordCount: metadata.wordCount,
    timeRequired: `PT${metadata.readingTime}M`,
    mainEntityOfPage: postUrl,
    image: imageUrl,
    ...(authors.length > 0 ? { author: authors } : {}),
    publisher: { "@id": `${siteConfig.url}/#organization` },
  } as const satisfies WithContext<Article | BlogPosting>
}

export function publicationJsonLd({
  lang,
  publication,
}: {
  lang: Locale
  publication: Publication
}) {
  const authors = (lang === "en" ? publication.authorsEn : publication.authorsKo)
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: lang === "en" ? publication.titleEn : publication.titleKo,
    author: authors.map((name) => ({ "@type": "Person" as const, name })),
    datePublished: publication.date.replaceAll(".", "-"),
    inLanguage: lang,
    mainEntityOfPage: publication.link,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  } as const satisfies WithContext<ScholarlyArticle>
}

export default function JsonLd({ data }: { data: Graph | WithContext<Thing> }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
