// @vitest-environment node
import { describe, it, expect } from "vitest"
import { extractQueryFromGoodreadsSlug, parseBookResults } from "../lib/books"
import fixture from "./fixtures/books-results.json"

describe("extractQueryFromGoodreadsSlug", () => {
  it("extracts title from dot format (strip numeric prefix)", () => {
    expect(extractQueryFromGoodreadsSlug("1536545.The_Likeness")).toBe("The Likeness")
  })

  it("extracts title from hyphen format", () => {
    expect(extractQueryFromGoodreadsSlug("58784475-tomorrow-and-tomorrow-and-tomorrow")).toBe(
      "tomorrow and tomorrow and tomorrow"
    )
  })

  it("replaces dots, underscores, hyphens with spaces after prefix strip", () => {
    expect(extractQueryFromGoodreadsSlug("123.Some_Book-Title")).toBe("Some Book Title")
  })

  it("throws for purely numeric slug", () => {
    expect(() => extractQueryFromGoodreadsSlug("12345")).toThrow(
      "Could not extract title from URL. Use a full Goodreads book URL."
    )
  })
})

describe("parseBookResults", () => {
  const item = fixture.items[0]

  it("extracts title", () => {
    const result = parseBookResults([item])
    expect(result[0].title).toBe("Tomorrow, and Tomorrow, and Tomorrow")
  })

  it("extracts creator from first author only", () => {
    const result = parseBookResults([item])
    expect(result[0].creator).toBe("Gabrielle Zevin")
  })

  it("extracts publishedYear from first 4 chars of publishedDate", () => {
    const result = parseBookResults([item])
    expect(result[0].publishedYear).toBe(2022)
  })

  it("replaces zoom=1 with zoom=3 in thumbnail URL", () => {
    const result = parseBookResults([item])
    expect(result[0].coverImage).toContain("zoom=3")
    expect(result[0].coverImage).not.toContain("zoom=1")
  })

  it("returns empty coverImage and warns when imageLinks is absent", () => {
    const warnings: string[] = []
    const noImage = { volumeInfo: { ...item.volumeInfo, imageLinks: null } }
    const result = parseBookResults([noImage], (m) => warnings.push(m))
    expect(result[0].coverImage).toBe("")
    expect(warnings[0]).toMatch(/cover/i)
  })

  it("formats select option label as 'Title by Author (Year)'", () => {
    const result = parseBookResults([item])
    expect(result[0].label).toBe("Tomorrow, and Tomorrow, and Tomorrow by Gabrielle Zevin (2022)")
  })

  it("does not include a url field", () => {
    const result = parseBookResults([item])
    expect("url" in result[0]).toBe(false)
  })
})
