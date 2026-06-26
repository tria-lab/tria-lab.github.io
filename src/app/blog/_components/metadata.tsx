import { type Metadata } from "@/lib/content/getMetadata"
import { getTeamMemberById, getTeamMemberImage } from "@/lib/content/getTeam"
import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

type BlogMetadataProps = {
  metadata: Metadata
  className?: string
}

export default function BlogMetadata({ metadata, className = "" }: BlogMetadataProps) {
  const { authors, date, readingTime, wordCount } = metadata

  return (
    <div className={`flex items-center gap-3 text-sm text-zinc-500 ${className}`}>
      {authors.length > 0 && (
        <div className="flex items-center gap-2">
          <span>
            by{" "}
            {authors.map((uid, i) => {
              const author = getTeamMemberById(uid)!
              const imageSrc = getTeamMemberImage(author.uid)

              return (
                <Fragment key={uid}>
                  {i > 0 &&
                    (i === authors.length - 1 ? (authors.length > 2 ? ", and " : " and ") : ", ")}
                  <Link
                    href={`/team/${uid}`}
                    className="inline-flex items-center gap-2 hover:text-hongik-medium-blue hover:underline"
                  >
                    {author.nameKo}
                    {imageSrc && (
                      <Image
                        src={imageSrc}
                        alt={author.nameKo}
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
      {date && <span>{date}</span>}
      {date && (readingTime || wordCount) && <span>·</span>}
      {readingTime && <span>{readingTime} min read</span>}
      {readingTime && wordCount && <span>·</span>}
      {wordCount && <span>{wordCount} words</span>}
    </div>
  )
}
