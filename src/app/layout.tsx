import "./globals.css"
import Navbar from "@/components/Navbar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TRIA Lab",
  description: "TRustworthy Intelligence for Autonomous systems Laboratory",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-screen antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>

      <body className="flex min-h-screen flex-col selection:bg-hongik-black selection:text-hongik-white">
        <Navbar />
        <main className="flex-1 pt-17.5">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

function Footer() {
  return (
    <footer className="bg-hongik-black py-6 text-center text-sm text-hongik-white selection:bg-hongik-white selection:text-hongik-black!">
      © {new Date().getFullYear()} TRIA Lab. All rights reserved.
    </footer>
  )
}
