import fs from "fs"
import { load } from "js-yaml"
import { parse } from "path"
import { z } from "zod"

const baseMemberSchema = z.object({
  uid: z.string(),
  nameKo: z.string(),
  nameEn: z.string().optional(),
})

const studentSchema = baseMemberSchema.extend({
  department: z.string().optional(),
  researchArea: z.string().optional(),
  github: z.url().optional(),
})

const professorSchema = baseMemberSchema.extend({
  email: z.email(),
  googleScholar: z.url().optional(),
})

const teamSchema = z.object({
  professors: z.array(professorSchema),
  students: z.array(studentSchema),
})

export type TeamData = z.infer<typeof teamSchema>
export type TeamMember = TeamData["professors"][number] | TeamData["students"][number]

export function getTeam(): TeamData {
  const data = teamSchema.parse(load(fs.readFileSync("src/content/team.yaml", "utf8")))

  const ids = new Set<string>()
  for (const member of [...data.professors, ...data.students]) {
    if (ids.has(member.uid)) {
      throw new Error(`Duplicate team member id: ${member.uid}`)
    }
    ids.add(member.uid)
  }

  return data
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  const { professors, students } = getTeam()
  return [...professors, ...students].find((member) => member.uid === id || member.nameKo === id)
}

export function getTeamMemberImage(uid: string): string | undefined {
  const matches = fs.readdirSync("public/team").filter((f) => parse(f).name === uid)

  if (matches.length === 0) return

  if (matches.length > 1)
    throw new Error(`Multiple images found for "${uid}": ${matches.join(", ")}`)

  return `/team/${matches[0]}`
}
