import { localePath, localeStaticFilePath } from "./config"
import { describe, expect, test } from "bun:test"

describe("localized URLs", () => {
  test("uses Next.js canonical trailing slashes for page routes", () => {
    expect(localePath("en")).toBe("/en/")
    expect(localePath("ko", "/about")).toBe("/ko/about/")
    expect(localePath("en", "/blog/post/")).toBe("/en/blog/post/")
  })

  test("does not add trailing slashes to static file routes", () => {
    expect(localePath("en", "/blog.xml")).toBe("/en/blog.xml")
    expect(localeStaticFilePath("ko", "/team/member/opengraph-image")).toBe(
      "/ko/team/member/opengraph-image",
    )
  })
})
