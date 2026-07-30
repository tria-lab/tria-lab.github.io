import { getShareUrl } from "./ShareMenu"
import { expect, test } from "bun:test"

test("copy-link URLs use Next.js canonical trailing slashes", () => {
  expect(getShareUrl("ko", "news", "2026-01-02-example")).toBe(
    "https://trialab.org/ko/news/2026-01-02-example/",
  )
})
