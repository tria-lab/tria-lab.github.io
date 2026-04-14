import fs from "fs"
import matter from "gray-matter"
import slugify from "slugify"

type Metadata = {
  filename: string
  slug: string
  title: string
  date: string
  excerpt: string
  wordCount: number
  readingTime: number
}

export default function getMetadata(contentPath: string): Metadata[] {
  const folder = `src/content/${contentPath}/`
  const files = fs.readdirSync(folder)
  const markdownFiles = files.filter((file) => file.endsWith(".md"))

  return markdownFiles
    .map((filename: string) => {
      const content = fs.readFileSync(`${folder}/${filename}`, "utf8")
      const matterResult = matter(content)
      const rawSlug = filename.replace(".md", "")
      const slug = slugify(rawSlug, { lower: true })
      const dateMatch = rawSlug.match(/^(\d{4}-\d{2}-\d{2})/) // YYYY-MM-DD

      if (!dateMatch)
        throw `filename "${filename}" in "${folder}" does not start with YYYY-MM-DD(-n)`

      return {
        filename,
        slug,
        title: matterResult.data.title,
        date: dateMatch[1],
        excerpt: matterResult.data.excerpt,
        wordCount: 999,
        readingTime: 999,
      } satisfies Metadata
    })
    .sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime())
}
