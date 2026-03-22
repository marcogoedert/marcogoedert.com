// @vitest-environment node
import { describe, it, expect } from "vitest"
import { detectUrl } from "../lib/detect"

const UNSUPPORTED = "Unsupported URL format. Supported: open.spotify.com/album/..., goodreads.com/book/show/..., imdb.com/title/tt..."

describe("detectUrl — Spotify", () => {
  it("detects album URL, sets id to album ID", () => {
    const result = detectUrl("https://open.spotify.com/album/2lIZef4lzdvZkiiCzvPKj7")
    expect(result).toEqual({
      ok: true,
      type: "listens",
      id: "2lIZef4lzdvZkiiCzvPKj7",
      originalUrl: "https://open.spotify.com/album/2lIZef4lzdvZkiiCzvPKj7",
    })
  })

  it("strips query params, preserves originalUrl as raw input", () => {
    const raw = "https://open.spotify.com/album/2lIZef4lzdvZkiiCzvPKj7?si=abc123&utm_source=foo"
    const result = detectUrl(raw)
    expect(result).toMatchObject({ ok: true, id: "2lIZef4lzdvZkiiCzvPKj7", originalUrl: raw })
  })

  it("rejects /track/ URL", () => {
    const result = detectUrl("https://open.spotify.com/track/abc")
    expect(result).toEqual({ ok: false, error: "Only Spotify album URLs are supported (open.spotify.com/album/...)" })
  })

  it("rejects /playlist/ URL", () => {
    const result = detectUrl("https://open.spotify.com/playlist/abc")
    expect(result).toEqual({ ok: false, error: "Only Spotify album URLs are supported (open.spotify.com/album/...)" })
  })

  it("rejects spotify.link short URLs", () => {
    const result = detectUrl("https://spotify.link/abc123")
    expect(result).toEqual({ ok: false, error: UNSUPPORTED })
  })
})

describe("detectUrl — Goodreads", () => {
  it("detects dot-format URL", () => {
    const result = detectUrl("https://www.goodreads.com/book/show/1536545.The_Likeness")
    expect(result).toEqual({
      ok: true,
      type: "reads",
      id: "1536545.The_Likeness",
      originalUrl: "https://www.goodreads.com/book/show/1536545.The_Likeness",
    })
  })

  it("detects hyphen-format URL", () => {
    const result = detectUrl("https://www.goodreads.com/book/show/58784475-tomorrow-and-tomorrow-and-tomorrow")
    expect(result).toEqual({
      ok: true,
      type: "reads",
      id: "58784475-tomorrow-and-tomorrow-and-tomorrow",
      originalUrl: "https://www.goodreads.com/book/show/58784475-tomorrow-and-tomorrow-and-tomorrow",
    })
  })

  it("rejects purely numeric path segment", () => {
    const result = detectUrl("https://www.goodreads.com/book/show/12345")
    expect(result).toEqual({
      ok: false,
      error: "Could not extract title from URL. Use a full Goodreads book URL.",
    })
  })
})

describe("detectUrl — IMDB", () => {
  it("detects IMDB title URL, sets id to tt ID", () => {
    const result = detectUrl("https://www.imdb.com/title/tt11280740/")
    expect(result).toEqual({
      ok: true,
      type: "watches",
      id: "tt11280740",
      originalUrl: "https://www.imdb.com/title/tt11280740/",
    })
  })
})

describe("detectUrl — unsupported", () => {
  it("rejects unknown domain", () => {
    const result = detectUrl("https://example.com/something")
    expect(result).toEqual({ ok: false, error: UNSUPPORTED })
  })

  it("rejects malformed URL", () => {
    const result = detectUrl("not-a-url")
    expect(result).toEqual({ ok: false, error: UNSUPPORTED })
  })
})
