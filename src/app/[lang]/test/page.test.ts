import { generateMetadata } from "./page"
import { expect, test } from "bun:test"

test("marks both localized test pages noindex", async () => {
  for (const lang of ["en", "ko"] as const) {
    const metadata = await generateMetadata({
      params: Promise.resolve({ lang }),
      searchParams: Promise.resolve({}),
    })

    expect(metadata.robots).toEqual({ index: false, follow: true })
  }
})
