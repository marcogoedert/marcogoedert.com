export type DetectResult =
  | { ok: true; type: "listens"; id: string; originalUrl: string; spotifyType: "album" | "track" }
  | { ok: true; type: "watches" | "reads"; id: string; originalUrl: string }
  | { ok: false; error: string }

const UNSUPPORTED_ERROR =
  "Unsupported URL format. Supported: open.spotify.com/album/..., open.spotify.com/track/..., goodreads.com/book/show/..., imdb.com/title/tt..."

const SPOTIFY_ONLY_ERROR =
  "Only Spotify album and track URLs are supported (open.spotify.com/album/..., open.spotify.com/track/...)"

export function detectUrl(rawUrl: string): DetectResult {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return { ok: false, error: UNSUPPORTED_ERROR }
  }

  if (url.hostname === "open.spotify.com") {
    const parts = url.pathname.split("/").filter(Boolean)
    // Find album/track/playlist segment: handles locale prefix (e.g. /intl-pt/album/...)
    const typeIdx = parts.findIndex((p) => p === "album" || p === "track" || p === "playlist")
    if (typeIdx === -1) return { ok: false, error: UNSUPPORTED_ERROR }
    const resourceType = parts[typeIdx]
    if (resourceType === "playlist") return { ok: false, error: SPOTIFY_ONLY_ERROR }
    const id = parts[typeIdx + 1]
    if (!id) return { ok: false, error: UNSUPPORTED_ERROR }
    return { ok: true, type: "listens", id, originalUrl: rawUrl, spotifyType: resourceType as "album" | "track" }
  }

  if (url.hostname === "www.goodreads.com" || url.hostname === "goodreads.com") {
    const parts = url.pathname.split("/").filter(Boolean)
    if (parts[0] === "book" && parts[1] === "show" && parts[2]) {
      const slug = parts[2]
      if (/^\d+$/.test(slug)) {
        return { ok: false, error: "Could not extract title from URL. Use a full Goodreads book URL." }
      }
      return { ok: true, type: "reads", id: slug, originalUrl: rawUrl }
    }
    return { ok: false, error: UNSUPPORTED_ERROR }
  }

  if (url.hostname === "www.imdb.com" || url.hostname === "imdb.com") {
    const parts = url.pathname.split("/").filter(Boolean)
    if (parts[0] === "title" && parts[1]?.startsWith("tt")) {
      return { ok: true, type: "watches", id: parts[1], originalUrl: rawUrl }
    }
    return { ok: false, error: UNSUPPORTED_ERROR }
  }

  return { ok: false, error: UNSUPPORTED_ERROR }
}
