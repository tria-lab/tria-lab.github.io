import { A } from "@/components/Link"
import { openGraph, pageTitle } from "@/lib/utils"
import fs from "fs"
import { load } from "js-yaml"
import type { Metadata } from "next"
import { z } from "zod"

export const metadata: Metadata = {
  title: pageTitle("Contact"),
  openGraph: openGraph({ title: "Contact" }),
}

const contactSchema = z.object({
  address: z.string(),
  email: z.email(),
})

export default function Contact() {
  const { address, email } = contactSchema.parse(
    load(fs.readFileSync("src/content/contact.yaml", "utf8")),
  )

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Contact</h1>

      <section className="mb-12">
        <div className="mb-8 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold">Address</h3>
            <p dangerouslySetInnerHTML={{ __html: address.replace(/\n/g, "<br/>") }} />
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold">Email</h3>
            <A href={`mailto:${email}`}>{email}</A>
          </div>
        </div>
      </section>
    </div>
  )
}
