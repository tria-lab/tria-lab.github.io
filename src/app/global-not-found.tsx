import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found | TRIA Lab",
}

const redirectScript = `
  if (!/^\\/(?:en|ko)(?:\\/|$)/.test(window.location.pathname)) {
    window.location.replace("/en" + window.location.pathname + window.location.search + window.location.hash);
  }
`

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      </head>
      <body>
        <main className="grid min-h-screen place-items-center px-6 text-center">
          <div>
            <h1 className="text-4xl font-bold">Page not found</h1>
            <p className="mt-4">
              <Link className="text-hongik-medium-blue underline" href="/en/">
                Return to the English home page
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  )
}
