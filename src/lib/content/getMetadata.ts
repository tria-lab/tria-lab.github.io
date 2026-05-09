import fs from "fs"
import matter from "gray-matter"
import { basename, dirname, parse } from "path"
import readingTime from "reading-time"

export type Metadata = {
  slug: string
  title: string
  date: string
  excerpt: string
  wordCount: number
  readingTime: number
  authors: string[]
}

export function getImageForName(name: string): string | undefined {
  const matches = fs.readdirSync("public/team").filter((f) => parse(f).name === name)

  if (matches.length === 0) return

  if (matches.length > 1)
    throw new Error(`Multiple images found for "${name}": ${matches.join(", ")}`)

  return `/team/${matches[0]}`
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
    authors: matterResult.data.authors ?? [],
  } satisfies Metadata
}
