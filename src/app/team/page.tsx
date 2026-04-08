import { SiGooglescholar } from "@icons-pack/react-simple-icons"

type Human = {
  name: string
}

type Student = Human & {
  // Type extension
}

type Professor = Human & {
  email: string
  googleScholar?: string
}

const professors = [
  {
    name: "Kuk Jin Jang",
    email: "jangkj@hongik.ac.kr",
    googleScholar: "https://scholar.google.com/citations?user=HFajZtgAAAAJ",
  },
] as const satisfies Professor[]

const students = [
  { name: "김형준" },
  { name: "김범수" },
  { name: "손기배" },
  { name: "홍진우" },
  { name: "이광호" },
  { name: "윤서준" },
  { name: "김휘수" },
  { name: "장문경" },
  { name: "박주민" },
  { name: "배나영" },
  { name: "윤서준" },
  { name: "이태훈" },
  { name: "소정호" },
] as const satisfies Student[]

export default function Team() {
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
