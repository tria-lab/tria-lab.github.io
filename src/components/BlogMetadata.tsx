import { formatDate, getTranslation, localePath, type Locale } from "@/i18n/config"
import { type Metadata } from "@/lib/content/getMetadata"
import { getMemberName, getTeamMemberById, getTeamMemberImage } from "@/lib/content/getTeam"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

type BlogMetadataProps = {
  metadata: Metadata
  lang: Locale
  className?: string
}

export default async function BlogMetadata({ metadata, lang, className = "" }: BlogMetadataProps) {
  const { authors, date, readingTime, wordCount } = metadata
  const { t } = await getTranslation(lang)

  return (
    <div className={`flex items-center gap-3 text-sm text-zinc-500 ${className}`}>
      {authors.length > 0 && (
        <div className="flex items-center gap-2">
          <span>
            {t("blog.by")}{" "}
            {authors.map((uid, i) => {
              const author = getTeamMemberById(uid)!
              const imageSrc = getTeamMemberImage(author.uid)

              return (
                <Fragment key={uid}>
                  {i > 0 &&
                    (i === authors.length - 1
                      ? t(
                          authors.length > 2
                            ? "blog.authorOxfordSeparator"
                            : "blog.authorLastSeparator",
                        )
                      : t("blog.authorSeparator"))}
                  <Link
                    href={localePath(lang, `/team/${uid}`)}
                    className="inline-flex items-center gap-2 hover:text-hongik-medium-blue hover:underline"
                  >
                    {getMemberName(author, lang)}
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={getMemberName(author, lang)}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                  </Link>
                </Fragment>
              )
            })}
          </span>
          <span>·</span>
        </div>
      )}
      {date && <span>{formatDate(date, lang)}</span>}
      {date && (readingTime || wordCount) && <span>·</span>}
      {readingTime && <span>{t("blog.minRead", { count: readingTime })}</span>}
      {readingTime && wordCount && <span>·</span>}
      {wordCount && <span>{t("blog.words", { count: wordCount })}</span>}
    </div>
  )
}
