import { getImageForName, type Metadata } from "@/lib/content/getMetadata"
import Image from "next/image"

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
          {authors.map((a, i) => {
            const imageSrc = getImageForName(a)
            return (
              <span key={i} className="flex items-center gap-2">
                by {a}
                {imageSrc && (
                  <Image src={imageSrc} alt={a} width={20} height={20} className="rounded-full" />
                )}
              </span>
            )
          })}
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
