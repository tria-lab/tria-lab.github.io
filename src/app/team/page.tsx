import { A } from "@/components/Link"
import Markdown from "@/components/Markdown"
import getContent from "@/lib/content/getContent"
import { getTeam, getTeamMemberImage } from "@/lib/content/getTeam"
import { openGraph, pageTitle } from "@/lib/utils"
import { SiGooglescholar, SiGithub } from "@icons-pack/react-simple-icons"
import { Mail, User } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: pageTitle("Team"),
  openGraph: openGraph({ title: "Team" }),
}

export default function Team() {
  const { professors, students } = getTeam()
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
        <div className="grid gap-6 md:grid-cols-2">
          {professors.map(({ uid, nameKo, email, googleScholar }) => {
            const imageSrc = getTeamMemberImage(uid)

            return (
              <div
                key={uid}
                className="group relative rounded-lg border p-6 transition-colors hover:border-hongik-medium-blue"
              >
                <Link
                  href={`/team/${uid}`}
                  className="absolute inset-0 rounded-lg"
                  aria-label={`${nameKo} profile`}
                />
                {imageSrc ? (
                  <Image
                    src={imageSrc}
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
                <h3 className="inline text-xl font-semibold">{nameKo}</h3>{" "}
                {googleScholar && (
                  <A href={googleScholar} title="Google Scholar" noIcon className="relative z-10">
                    <SiGooglescholar />
                  </A>
                )}
                <ul>
                  <li className="flex gap-2">
                    <Mail />{" "}
                    <A href={`mailto:${email}`} className="relative z-10">
                      {email}
                    </A>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Students</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {students.map(({ uid, nameKo, department, researchArea, github }) => {
            const imageSrc = getTeamMemberImage(uid)

            return (
              <div
                key={uid}
                className="group relative rounded-lg border p-6 transition-colors hover:border-hongik-medium-blue"
              >
                <Link
                  href={`/team/${uid}`}
                  className="absolute inset-0 rounded-lg"
                  aria-label={`${nameKo} profile`}
                />
                {imageSrc ? (
                  <Image
                    src={imageSrc}
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
                    <A
                      href={github}
                      title="Github"
                      noIcon
                      className="relative z-10 ml-2 inline-block"
                    >
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
            )
          })}
        </div>
      </section>
    </div>
  )
}
