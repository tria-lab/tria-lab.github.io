import sitemap from "./sitemap"
import { describe, expect, test } from "bun:test"

describe("sitemap", () => {
  test("uses the same trailing-slash URLs as Next.js canonical metadata", () => {
    const entries = sitemap()

    expect(entries.length).toBeGreaterThan(0)
    expect(entries.every(({ url }) => url.endsWith("/"))).toBe(true)
  })
})
