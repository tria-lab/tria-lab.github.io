import fs from "fs"
import matter from "gray-matter"
import { basename, dirname } from "path"
import readingTime from "reading-time"

type Metadata = {
  slug: string
  title: string
  date: string
  excerpt: string
  wordCount: number
  readingTime: number
}

export function getDirMetadata(dir: string): Metadata[] {
  return fs
    .readdirSync(`src/content/${dir}/`)
    .filter((file) => file.endsWith(".md"))
    .map((filename) => getFileMetadata(`${dir}/${filename.slice(0, -3)}`))
    .sort((a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime())
}

export function getFileMetadata(filepath: string) {
  const filePath = `src/content/${filepath}.md`
  const content = fs.readFileSync(filePath, "utf8")
  const matterResult = matter(content)

  const slug = basename(filepath)

  if (!/^[a-zA-Z0-9-]+$/.test(slug))
    throw `slug "${slug}" should only contain alphanumeric and dash (-).`

  const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/) // YYYY-MM-DD
  if (!dateMatch)
    throw `filename "${slug}" in "${dirname(filePath)}" does not start with YYYY-MM-DD(-n)`

  const { words, minutes } = readingTime(matterResult.content)

  return {
    slug,
    title: matterResult.data.title,
    date: dateMatch[1],
    excerpt: matterResult.data.excerpt,
    wordCount: words,
    readingTime: Math.ceil(minutes),
  } satisfies Metadata
}
