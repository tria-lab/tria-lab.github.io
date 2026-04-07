import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TRIA Lab",
  description: "TRustworthy Intelligence for Autonomous systems Laboratory",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>

      <body>{children}</body>
    </html>
  )
}
