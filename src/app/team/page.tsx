import { SiGooglescholar } from "@icons-pack/react-simple-icons"
import { YAML } from "bun"
import fs from "fs"
import { z } from "zod"

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
    YAML.parse(fs.readFileSync("src/content/team.yaml", "utf8")),
  )

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-bold">Our Team</h1>

      <p className="mb-8 text-zinc-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Professors</h2>
        <div className="grid gap-6">
          {professors.map(({ name, email, googleScholar }) => (
            <div key={email} className="rounded-lg border p-6">
              <h3 className="inline text-xl font-semibold">{name}</h3>
              {googleScholar && (
                <a
                  href={googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  {/* #4285F4 = SiGooglescholarHex */}
                  <SiGooglescholar className="ml-2 cursor-pointer hover:text-[#4285F4]" />
                </a>
              )}
              <p className="mt-2 text-sm">
                Email: <a href={`mailto:${email}`}>{email}</a>
              </p>
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

      <section>
        <h2 className="mb-6 text-2xl font-semibold">Join Our Team</h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>
      </section>
    </div>
  )
}
