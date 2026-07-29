import type { Locale } from "@/i18n/config"
import fs from "fs"
import matter from "gray-matter"
import path from "path"

export default function getMdContent(lang: Locale, filepath: string) {
  try {
    const file = path.join("src/content", lang, `${filepath}.md`)
    const content = fs.readFileSync(file, "utf8")

    return matter(content)
  } catch (error) {
    throw `Unable to read ${lang} markdown file for slug "${filepath}": ${error}`
  }
}
