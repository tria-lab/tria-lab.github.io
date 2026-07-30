import { postJsonLd, publicationJsonLd } from "@/components/JsonLd"
import { describe, expect, test } from "bun:test"

describe("postJsonLd", () => {
  test("uses the same trailing-slash URL as Next.js canonical metadata", () => {
    const data = postJsonLd({
      lang: "en",
      section: "blog",
      slug: "2026-01-02-example",
      metadata: {
        slug: "2026-01-02-example",
        title: "Example",
        date: "2026-01-02",
        excerpt: "Example post",
        wordCount: 100,
        readingTime: 1,
        authors: [],
      },
    })

    expect(data.mainEntityOfPage).toBe("https://trialab.org/en/blog/2026-01-02-example/")
  })
})

describe("publicationJsonLd", () => {
  test("builds localized ScholarlyArticle structured data", () => {
    const data = publicationJsonLd({
      lang: "ko",
      publication: {
        titleEn: "Trustworthy Autonomous Systems",
        titleKo: "신뢰할 수 있는 자율 시스템",
        authorsEn: "Alice Kim, Bob Lee",
        authorsKo: "김앨리스, 이밥",
        date: "2026.01.02",
        link: "https://doi.org/10.1234/example",
      },
    })

    expect(data).toEqual({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      headline: "신뢰할 수 있는 자율 시스템",
      author: [
        { "@type": "Person", name: "김앨리스" },
        { "@type": "Person", name: "이밥" },
      ],
      datePublished: "2026-01-02",
      inLanguage: "ko",
      mainEntityOfPage: "https://doi.org/10.1234/example",
      publisher: { "@id": "https://trialab.org/#organization" },
    })
  })
})
