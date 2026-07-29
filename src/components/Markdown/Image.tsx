"use client"

import { getYouTubeEmbedUrl, isYouTubeUrl } from "./youtube"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const getImageMetadata = (alt: string) => {
  const metadataPattern = /(?:^|\s)(?:width|w)=(\d+)(?=\s|$)/i
  const width = alt.match(metadataPattern)?.[1]

  return {
    alt: alt.replace(metadataPattern, "").trim(),
    width: width ? Number.parseInt(width, 10) : undefined,
  }
}

const getImageSrc = (src: string) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  return src.startsWith("/") ? `${basePath}${src}` : src
}

export function YouTubeEmbed({ alt, src }: { alt?: string; src: string }) {
  const { t } = useTranslation()
  const embedUrl = getYouTubeEmbedUrl(src)

  return (
    <span className="relative block h-0 pt-6 pb-[56.25%]">
      <iframe
        src={embedUrl}
        title={alt || t("common.youtubeVideo")}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 size-full border-0"
      />
    </span>
  )
}

export default function ImageNode({ alt, src }: { alt: string; src: string }) {
  const { t } = useTranslation()
  const [isLoaded, setIsLoaded] = useState(false)
  const image = getImageMetadata(alt)
  const resolvedSrc = getImageSrc(src || "/default-image.jpg")

  if (isYouTubeUrl(src)) {
    return <YouTubeEmbed alt={alt} src={src} />
  }

  return (
    <span
      data-testid="image-wrapper"
      className={cn(
        "relative mx-auto my-4 mt-4 mb-8 flex w-full max-w-full overflow-hidden rounded-md shadow-md",
        isLoaded ? "min-h-auto" : "min-h-75",
      )}
      style={image.width && image.width > 0 ? { maxWidth: `${image.width}px` } : undefined}
    >
      <Image
        className="h-auto w-full object-cover brightness-90 transition-all duration-300 hover:brightness-100"
        src={resolvedSrc}
        alt={image.alt || t("common.image")}
        unoptimized
        onLoad={() => setIsLoaded(true)}
        sizes="(max-width: 800px) 100vw, 800px"
        width={1}
        height={1}
      />
    </span>
  )
}
