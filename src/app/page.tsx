import { A } from "@/components/Link"
import { openGraph, pageTitle } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: pageTitle("Home"),
  openGraph: openGraph({ title: "Home" }),
}

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="mb-6 text-5xl font-bold">TRIA Lab</h1>
        <p className="mb-4 text-xl text-hongik-medium-gray">
          <strong>
            {/* cSpell: disable-next-line */}
            <span className="text-hongik-dark-gray">TR</span>ustworthy
            {" " /* cSpell: disable-next-line */}
            <span className="text-hongik-dark-gray">I</span>ntelligence for
            {" " /* cSpell: disable-next-line */}
            <span className="text-hongik-dark-gray">A</span>utonomous systems Laboratory
          </strong>
        </p>
        <p className="mx-auto mb-8 max-w-2xl text-lg">
          Join our <A href="/team">Team</A>
        </p>
      </section>
    </div>
  )
}
