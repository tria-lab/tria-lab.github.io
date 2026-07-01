export const isYouTubeUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname.endsWith("youtube.com") || parsedUrl.hostname === "youtu.be"
  } catch {
    return false
  }
}

export const getYouTubeEmbedUrl = (url: string) => {
  const parsedUrl = new URL(url)

  if (parsedUrl.hostname === "youtu.be")
    return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`

  const videoId = parsedUrl.searchParams.get("v")
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url
}
