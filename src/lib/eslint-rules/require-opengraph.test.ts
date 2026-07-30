/// <reference types="bun" />
import { requireOpengraph } from "./require-opengraph"
import { describe, expect, test } from "bun:test"
import { Linter, type Linter as LinterTypes } from "eslint"

const linter = new Linter()
const config = {
  files: ["**/*.js"],
  languageOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: { "tria-lab": { rules: { "require-opengraph": requireOpengraph } } },
  rules: { "tria-lab/require-opengraph": "error" },
} as const satisfies LinterTypes.Config

function lint(code: string, filename: string) {
  return linter.verify(code, config, {
    filename: `${process.cwd()}/src/app/${filename}/page.js`,
  }) satisfies LinterTypes.LintMessage[]
}

describe("require-opengraph", () => {
  test("accepts generateMetadata using localizedMetadata", () => {
    expect(
      lint(
        `export function generateMetadata() {
          return localizedMetadata({ lang: "en", title: "About", path: "/about" })
        }`,
        "about",
      ),
    ).toEqual([])
  })

  test("requires alternates.languages in direct metadata", () => {
    const messages = lint(
      `export const metadata = {
        openGraph: { title: "About", description: "About the lab" },
        alternates: { canonical: "/about" },
      }`,
      "missing-alternates",
    )

    expect(messages.map((message) => message.messageId)).toEqual(["missingAlternates"])
  })

  test("accepts direct metadata returned from generateMetadata", () => {
    expect(
      lint(
        `export function generateMetadata() {
          return {
            openGraph: { title: "About", description: "Direct metadata description" },
            alternates: { languages: { en: "/en/about", ko: "/ko/about" } },
          }
        }`,
        "direct-generate-metadata",
      ),
    ).toEqual([])
  })

  test("requires page metadata", () => {
    const messages = lint("export default function Page() {}", "missing-metadata")
    expect(messages.map((message) => message.messageId)).toEqual(["missingMetadata"])
  })

  test("reports a shared static description in the second page", () => {
    const page = `export function generateMetadata() {
      return localizedMetadata({
        lang: "en",
        title: "Page",
        description: siteConfig.description,
      })
    }`

    expect(lint(page, "duplicate-one")).toEqual([])
    const messages = lint(page, "duplicate-two")
    expect(messages.map((message) => message.messageId)).toEqual(["duplicateDescription"])
  })

  test("allows per-record description expressions", () => {
    const page = `export function generateMetadata() {
      return localizedMetadata({ lang: "en", title: post.title, description: post.excerpt })
    }`

    expect(lint(page, "dynamic-one")).toEqual([])
    expect(lint(page, "dynamic-two")).toEqual([])
  })
})
