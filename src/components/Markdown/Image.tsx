"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useState } from "react"

const isYouTubeUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname.includes("youtube.com") || parsedUrl.hostname.includes("youtu.be")
  } catch {
    return false
  }
}

const getYouTubeEmbedUrl = (url: string) => {
  const parsedUrl = new URL(url)

  if (parsedUrl.hostname === "youtu.be")
    return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`

  const videoId = parsedUrl.searchParams.get("v")
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}

export default function ImageNode({ alt, src }: { alt: string; src: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""
  const resolvedSrc = src ? `${basePath}${src}` : `${basePath}/default-image.jpg`

  if (isYouTubeUrl(src)) {
    const embedUrl = getYouTubeEmbedUrl(src)

    return (
      <span className="relative block h-0 pt-6 pb-[56.25%]">
        <iframe
          src={embedUrl}
          title={alt || "YouTube video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 h-full w-full border-0"
        />
      </span>
    )
  }

  return (
    <span
      data-testid="image-wrapper"
      className={cn(
        "relative mx-auto my-4 mt-4 mb-8 flex w-full max-w-full overflow-hidden rounded-md shadow-md",
        isLoaded ? "min-h-auto" : "min-h-[300px]",
      )}
    >
      <Image
        className="h-auto w-full object-cover brightness-90 transition-all duration-300 hover:brightness-100"
        src={resolvedSrc}
        alt={alt || "Image"}
        unoptimized
        onLoad={() => setIsLoaded(true)}
        sizes="(max-width: 800px) 100vw, 800px"
        width={1}
        height={1}
      />
    </span>
  )
}
