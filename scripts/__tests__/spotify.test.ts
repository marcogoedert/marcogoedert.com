// @vitest-environment node
import { describe, it, expect } from "vitest"
import { parseSpotifyAlbum } from "../lib/spotify"
import fixture from "./fixtures/spotify-album.json"

describe("parseSpotifyAlbum", () => {
  it("extracts title from album name", () => {
    const result = parseSpotifyAlbum(fixture)
    expect(result.title).toBe("BRAT")
  })

  it("extracts creator from first artist only", () => {
    const result = parseSpotifyAlbum(fixture)
    expect(result.creator).toBe("Charli XCX")
  })

  it("reconstructs canonical URL from album id", () => {
    const result = parseSpotifyAlbum(fixture)
    expect(result.url).toBe("https://open.spotify.com/album/2lIZef4lzdvZkiiCzvPKj7")
  })

  it("selects 640px cover image when available", () => {
    const result = parseSpotifyAlbum(fixture)
    expect(result.coverImage).toBe("https://i.scdn.co/image/medium")
  })

  it("falls back to largest width when no 640px image", () => {
    const noExact = {
      ...fixture,
      images: [
        { url: "https://i.scdn.co/image/small", width: 300, height: 300 },
        { url: "https://i.scdn.co/image/large", width: 1000, height: 1000 },
      ],
    }
    const result = parseSpotifyAlbum(noExact)
    expect(result.coverImage).toBe("https://i.scdn.co/image/large")
  })

  it("falls back to first image when all widths are null", () => {
    const nullWidths = {
      ...fixture,
      images: [
        { url: "https://i.scdn.co/image/first", width: null, height: null },
        { url: "https://i.scdn.co/image/second", width: null, height: null },
      ],
    }
    const result = parseSpotifyAlbum(nullWidths)
    expect(result.coverImage).toBe("https://i.scdn.co/image/first")
  })

  it("returns empty string and logs warning when images array is empty", () => {
    const logs: string[] = []
    const warn = (msg: string) => logs.push(msg)
    const result = parseSpotifyAlbum({ ...fixture, images: [] }, warn)
    expect(result.coverImage).toBe("")
    expect(logs[0]).toMatch(/cover/i)
  })
})
