interface SpotifyImage {
  url: string
  width: number | null
  height: number | null
}

import { select } from "@inquirer/prompts"

interface SpotifyAlbumResponse {
  id: string
  name: string
  artists: Array<{ name: string }>
  images: SpotifyImage[]
}

interface SpotifyTrackResponse {
  id: string
  name: string
  artists: Array<{ name: string }>
  duration_ms: number
  album: { name: string; images: SpotifyImage[] }
}

export interface SpotifyAlbumData {
  title: string
  creator: string
  coverImage: string
  url: string
  albumName?: string
  duration?: string
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

function selectCoverImage(images: SpotifyImage[], warn: (msg: string) => void): string {
  if (images.length === 0) {
    warn("Warning: no cover image found")
    return ""
  }
  const exact = images.find((img) => img.width === 640)
  if (exact) return exact.url
  const withWidth = images.filter((img) => img.width !== null)
  if (withWidth.length > 0) return withWidth.reduce((a, b) => (b.width! > a.width! ? b : a)).url
  return images[0].url
}

export function parseSpotifyAlbum(
  album: SpotifyAlbumResponse,
  warn: (msg: string) => void = console.warn
): SpotifyAlbumData {
  return {
    title: album.name,
    creator: album.artists[0]?.name ?? "",
    coverImage: selectCoverImage(album.images, warn),
    url: `https://open.spotify.com/album/${album.id}`,
  }
}

export function parseSpotifyTrack(
  track: SpotifyTrackResponse,
  warn: (msg: string) => void = console.warn
): SpotifyAlbumData {
  return {
    title: track.name,
    creator: track.artists[0]?.name ?? "",
    coverImage: selectCoverImage(track.album.images, warn),
    url: `https://open.spotify.com/track/${track.id}`,
    albumName: track.album.name,
    duration: formatDuration(track.duration_ms),
  }
}

async function getSpotifyToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  })
  if (!res.ok) throw new Error(`Spotify auth failed: ${res.status} ${res.url}`)
  const data = (await res.json()) as { access_token: string }
  return data.access_token
}

export async function fetchSpotifyAlbum(
  albumId: string,
  clientId: string,
  clientSecret: string
): Promise<SpotifyAlbumData> {
  const token = await getSpotifyToken(clientId, clientSecret)
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Spotify album fetch failed: ${res.status} ${res.url}`)
  return parseSpotifyAlbum((await res.json()) as SpotifyAlbumResponse)
}

export async function searchAndSelectSpotify(
  query: string,
  clientId: string,
  clientSecret: string
): Promise<SpotifyAlbumData> {
  const token = await getSpotifyToken(clientId, clientSecret)
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album,track&limit=5`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  if (!res.ok) throw new Error(`Spotify search failed: ${res.status} ${res.url}`)
  const data = (await res.json()) as {
    albums?: { items: SpotifyAlbumResponse[] }
    tracks?: { items: SpotifyTrackResponse[] }
  }

  const albumItems = (data.albums?.items ?? []).map((a) => {
    const parsed = parseSpotifyAlbum(a)
    return { ...parsed, label: `${parsed.title} — ${parsed.creator} (album)` }
  })
  const trackItems = (data.tracks?.items ?? []).map((t) => {
    const parsed = parseSpotifyTrack(t)
    return { ...parsed, label: `${parsed.title} — ${parsed.creator} (track)` }
  })
  const allItems = [...albumItems, ...trackItems]

  if (allItems.length === 0) throw new Error(`No Spotify results for '${query}'`)
  if (allItems.length === 1) return allItems[0]

  return select({
    message: "Select:",
    choices: allItems.map((r) => ({ name: r.label, value: r as SpotifyAlbumData })),
  })
}

export async function fetchSpotifyTrack(
  trackId: string,
  clientId: string,
  clientSecret: string
): Promise<SpotifyAlbumData> {
  const token = await getSpotifyToken(clientId, clientSecret)
  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`Spotify track fetch failed: ${res.status} ${res.url}`)
  return parseSpotifyTrack((await res.json()) as SpotifyTrackResponse)
}
