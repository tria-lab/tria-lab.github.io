import { A } from "@/components/Link"
import Markdown from "@/components/Markdown"
import getContent from "@/lib/content/getContent"
import { pageTitle } from "@/lib/utils"
import { SiGooglescholar } from "@icons-pack/react-simple-icons"
import fs from "fs"
import { load } from "js-yaml"
import { Mail } from "lucide-react"
import type { Metadata } from "next"
import { z } from "zod"

export const metadata: Metadata = {
  title: pageTitle("Team"),
}

const studentSchema = z.object({
  name: z.string().min(1),
})

const professorSchema = studentSchema.extend({
  email: z.email(),
  googleScholar: z.url().optional(),
})

const teamSchema = z.object({
  professors: z.array(professorSchema),
  students: z.array(studentSchema),
})

export default function Team() {
  const { professors, students } = teamSchema.parse(
    load(fs.readFileSync("src/content/team.yaml", "utf8")),
  )
  const teamMd = getContent("team")

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Our Team</h1>

      {teamMd && (
        <div className="mb-8">
          <Markdown>{teamMd.content}</Markdown>
        </div>
      )}

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Professors</h2>
        <div className="grid gap-6">
          {professors.map(({ name, email, googleScholar }) => (
            <div key={email} className="rounded-lg border p-6">
              <h3 className="inline text-xl font-semibold">{name}</h3>{" "}
              {googleScholar && (
                <A href={googleScholar} title="Google Scholar" noIcon>
                  <SiGooglescholar />
                </A>
              )}
              <ul>
                <li className="flex gap-2">
                  <Mail /> <A href={`mailto:${email}`}>{email}</A>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Students</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {students.map(({ name }) => (
            <div key={name} className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">{name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
