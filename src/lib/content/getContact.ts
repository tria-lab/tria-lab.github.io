import fs from "fs"
import { load } from "js-yaml"
import { z } from "zod"

const contactSchema = z.object({
  addressEn: z.string(),
  addressKo: z.string(),
  email: z.email(),
})

export function getContact() {
  return contactSchema.parse(load(fs.readFileSync("src/content/contact.yaml", "utf8")))
}
