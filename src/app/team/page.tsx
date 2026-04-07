export default function Team() {
  const professors = [
    {
      name: "Dr. Jane Smith",
      role: "Lab Director",
      email: "jane.smith@example.edu",
      research: "Natural Language Processing, Machine Learning",
    },
    {
      name: "Dr. John Doe",
      role: "Senior Researcher",
      email: "john.doe@example.edu",
      research: "Computer Vision, Deep Learning",
    },
  ]

  const students = [
    {
      name: "Alice Park",
      role: "PhD Student",
      email: "alice.park@example.edu",
      research: "Reinforcement Learning, Robotics",
    },
    {
      name: "Bob Kim",
      role: "PhD Student",
      email: "bob.kim@example.edu",
      research: "Natural Language Understanding",
    },
    {
      name: "Carol Lee",
      role: "Master Student",
      email: "carol.lee@example.edu",
      research: "Data Mining, Information Retrieval",
    },
    {
      name: "David Choi",
      role: "Master Student",
      email: "david.choi@example.edu",
      research: "Computer Vision",
    },
  ]

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
          {professors.map((member) => (
            <div key={member.email} className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-zinc-600">{member.role}</p>
              <p className="mt-2 text-sm">Email: {member.email}</p>
              <p className="mt-1 text-sm">Research: {member.research}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold">Students</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {students.map((member) => (
            <div key={member.email} className="rounded-lg border p-6">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-zinc-600">{member.role}</p>
              <p className="mt-2 text-sm">Email: {member.email}</p>
              <p className="mt-1 text-sm">Research: {member.research}</p>
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
