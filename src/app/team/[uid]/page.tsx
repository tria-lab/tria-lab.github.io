import BlogMetadata from "@/app/blog/_components/metadata"
import { A } from "@/components/Link"
import { getDirMetadata } from "@/lib/content/getMetadata"
import { getTeam, getTeamMemberById, getTeamMemberImage } from "@/lib/content/getTeam"
import { openGraph, pageTitle } from "@/lib/utils"
import { SiGooglescholar, SiGithub } from "@icons-pack/react-simple-icons"
import { ArrowRight, Mail, User } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ViewTransition } from "react"

export async function generateStaticParams() {
  const { professors, students } = getTeam()
  return [...professors, ...students].map((member) => ({ uid: member.uid }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ uid: string }>
}): Promise<Metadata> {
  const uid = decodeURIComponent((await params).uid)
  const member = getTeamMemberById(uid)

  if (!member) return {}

  return {
    title: pageTitle(`${member.nameKo} | Team`),
    openGraph: openGraph({
      title: `${member.nameKo} | Team`,
      description: member.nameEn,
    }),
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<{ uid: string }> }) {
  const uid = decodeURIComponent((await params).uid)
  const member = getTeamMemberById(uid)

  if (!member) notFound()

  const imageSrc = getTeamMemberImage(member.uid)
  const isProfessor = "email" in member
  const posts = getDirMetadata("blog").filter(
    (post) => post.authors.includes(member.uid) || post.authors.includes(member.nameKo),
  )

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/team"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-hongik-medium-blue hover:underline"
      >
        ← Back to Team
      </Link>

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full max-w-75 shrink-0 rounded-sm border border-black/20">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={member.nameKo}
              width={300}
              height={400}
              className="aspect-3/4 w-full rounded-lg object-cover"
            />
          ) : (
            <div className="flex aspect-3/4 w-full items-center justify-center rounded-lg">
              <User className="size-full text-gray-200" strokeWidth={0.5} />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold">{member.nameKo}</h1>
          {member.nameEn && <p className="text-xl text-zinc-500">{member.nameEn}</p>}

          <p className="mt-2 text-lg font-medium text-zinc-700">
            {isProfessor ? "Professor" : "Student"}
          </p>

          <div className="mt-6 space-y-3">
            {"department" in member && member.department && (
              <p>
                <span className="font-bold">Department:</span> {member.department}
              </p>
            )}

            {"researchArea" in member && member.researchArea && (
              <p>
                <span className="font-bold">Research Area:</span> {member.researchArea}
              </p>
            )}

            {"email" in member && (
              <p className="flex items-center gap-2">
                <Mail className="size-5" />
                <A href={`mailto:${member.email}`}>{member.email}</A>
              </p>
            )}

            {"github" in member && member.github && (
              <p className="flex items-center gap-2">
                <SiGithub className="size-5" />
                <A href={member.github}>GitHub</A>
              </p>
            )}

            {"googleScholar" in member && member.googleScholar && (
              <p className="flex items-center gap-2">
                <SiGooglescholar className="size-5" />
                <A href={member.googleScholar}>Google Scholar</A>
              </p>
            )}
          </div>
        </div>
      </div>

      {posts.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Blog Posts</h2>
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-zinc-500 pb-8 last:border-0">
                <ViewTransition name={`blog-title-${post.slug}`}>
                  <h3 className="mb-1 text-xl font-semibold">{post.title}</h3>
                </ViewTransition>
                <ViewTransition name={`blog-meta-${post.slug}`}>
                  <BlogMetadata metadata={post} className="mb-3" />
                </ViewTransition>
                <p className="mb-3">{post.excerpt}</p>
                <A
                  href={`/blog/${post.slug}`}
                  className="flex text-blue-400 transition-all duration-100 hover:gap-2 hover:underline"
                >
                  Read <ArrowRight size={16} />
                </A>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
