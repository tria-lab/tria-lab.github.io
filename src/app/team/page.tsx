import { A } from "@/components/Link"
import Markdown from "@/components/Markdown"
import getContent from "@/lib/content/getContent"
import { openGraph, pageTitle } from "@/lib/utils"
import { SiGooglescholar, SiGithub } from "@icons-pack/react-simple-icons"
import fs from "fs"
import { load } from "js-yaml"
import { Mail, User } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

export const metadata: Metadata = {
  title: pageTitle("Team"),
  openGraph: openGraph({ title: "Team" }),
}

const studentSchema = z.object({
  nameKo: z.string(),
  nameEn: z.string().optional(),
  department: z.string().optional(),
  researchArea: z.string().optional(),
  profilePicture: z.string().optional(),
  github: z.url().optional(),
})

const professorSchema = z.object({
  nameKo: z.string(),
  nameEn: z.string().optional(),
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
          {professors.map(({ nameKo, email, googleScholar }) => (
            <div key={email} className="rounded-lg border p-6">
              <h3 className="inline text-xl font-semibold">{nameKo}</h3>{" "}
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
          {students.map(({ nameKo, department, researchArea, github }) => (
            <div key={nameKo} className="rounded-lg border p-6">
              {fs.existsSync(`public/team/${nameKo}.png`) ? (
                <Image
                  src={`/team/${nameKo}.png`}
                  alt={nameKo}
                  width={1000}
                  height={750}
                  className="mb-4 aspect-3/4"
                />
              ) : (
                <div className="mb-4 flex aspect-3/4 items-center justify-center">
                  <User className="size-full text-gray-200" strokeWidth={0.5} />
                </div>
              )}

              <div className="mb-4 flex h-10 items-center">
                <h3 className="inline text-xl font-semibold">{nameKo}</h3>
                {github && (
                  <A href={github} title="Github" noIcon className="ml-2 inline-block">
                    <SiGithub />
                  </A>
                )}
              </div>

              {department && (
                <>
                  <span className="mb-2 font-bold">Department:</span> <span>{department}</span>
                  <br />
                </>
              )}

              {researchArea && (
                <>
                  <span className="font-bold">Research Area:</span> <span>{researchArea}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
