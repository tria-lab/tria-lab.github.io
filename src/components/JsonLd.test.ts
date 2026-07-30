import { postJsonLd, publicationJsonLd } from "@/components/JsonLd"
import { describe, expect, test } from "bun:test"

describe("postJsonLd", () => {
  const metadata = {
    slug: "2026-01-02-example",
    title: "Example",
    date: "2026-01-02",
    excerpt: "Example post",
    wordCount: 100,
    readingTime: 1,
    authors: [],
  }

  test("builds BlogPosting URLs from the canonical page and generated OG image", () => {
    const data = postJsonLd({
      lang: "en",
      section: "blog",
      slug: "2026-01-02-example",
      metadata,
    })

    expect(data["@type"]).toBe("BlogPosting")
    expect(data.mainEntityOfPage).toBe("https://trialab.org/en/blog/2026-01-02-example/")
    expect(data.image).toBe("https://trialab.org/en/blog/2026-01-02-example/opengraph-image")
  })

  test("builds Article URLs from the canonical page and generated OG image", () => {
    const data = postJsonLd({
      lang: "ko",
      section: "news",
      slug: "2026-01-02-example",
      metadata,
    })

    expect(data["@type"]).toBe("Article")
    expect(data.mainEntityOfPage).toBe("https://trialab.org/ko/news/2026-01-02-example/")
    expect(data.image).toBe("https://trialab.org/ko/news/2026-01-02-example/opengraph-image")
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
