export type DetectResult =
  | { ok: true; type: "listens" | "watches" | "reads"; id: string; originalUrl: string }
  | { ok: false; error: string }

const UNSUPPORTED_ERROR =
  "Unsupported URL format. Supported: open.spotify.com/album/..., goodreads.com/book/show/..., imdb.com/title/tt..."

export function detectUrl(rawUrl: string): DetectResult {
  let url: URL
  try {
    url = new URL(rawUrl)
  } catch {
    return { ok: false, error: UNSUPPORTED_ERROR }
  }

  if (url.hostname === "open.spotify.com") {
    const parts = url.pathname.split("/").filter(Boolean)
    if (parts[0] !== "album") {
      return { ok: false, error: "Only Spotify album URLs are supported (open.spotify.com/album/...)" }
    }
    const id = parts[1]
    if (!id) return { ok: false, error: UNSUPPORTED_ERROR }
    return { ok: true, type: "listens", id, originalUrl: rawUrl }
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
