import fs from "fs"
import matter from "gray-matter"
import path from "path"

export default function getMdContent(slug: string) {
  try {
    const file = path.join("src/content", `${slug}.md`)
    const content = fs.readFileSync(file, "utf8")

    return matter(content)
  } catch (error) {
    throw `Unable to read markdown file for slug "${slug}": ${error}`
  }
}
