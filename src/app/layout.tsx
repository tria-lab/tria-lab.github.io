import "./globals.css"
import Navbar from "@/components/Navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TRIA Lab",
  description: "TRustworthy Intelligence for Autonomous systems Laboratory",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>

      <body>
        <Navbar />
        <main className="min-h-screen pt-17.5">{children}</main>
      </body>
    </html>
  )
}
