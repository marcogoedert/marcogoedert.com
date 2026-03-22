interface SpotifyImage {
  url: string
  width: number | null
  height: number | null
}

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
  album: { images: SpotifyImage[] }
}

export interface SpotifyAlbumData {
  title: string
  creator: string
  coverImage: string
  url: string
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
