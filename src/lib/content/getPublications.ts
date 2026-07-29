import fs from "fs"
import { load } from "js-yaml"
import { z } from "zod"

const publicationSchema = z.object({
  titleEn: z.string().min(1),
  titleKo: z.string().min(1),
  authorsEn: z.string(),
  authorsKo: z.string(),
  date: z.string(),
  link: z.url(),
})

export type Publication = z.infer<typeof publicationSchema>

export function getPublications(): Publication[] {
  return z
    .array(publicationSchema)
    .parse(load(fs.readFileSync("src/content/publications.yaml", "utf8")))
    .sort(
      (a, b) =>
        new Date(b.date.replaceAll(".", "-")).getTime() -
        new Date(a.date.replaceAll(".", "-")).getTime(),
    )
}
