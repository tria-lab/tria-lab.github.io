import Footer from "./_components/Footer"
import Navbar from "./_components/Navbar"
import NavigationLoader from "./_components/NavigationLoader"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import "katex/dist/katex.min.css"
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
        <NavigationLoader />
        <Navbar />
        <main className="flex-1 pt-17.5">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
