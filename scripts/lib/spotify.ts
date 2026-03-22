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

export interface SpotifyAlbumData {
  title: string
  creator: string
  coverImage: string
  url: string
}

export function parseSpotifyAlbum(
  album: SpotifyAlbumResponse,
  warn: (msg: string) => void = console.warn
): SpotifyAlbumData {
  const title = album.name
  const creator = album.artists[0]?.name ?? ""
  const url = `https://open.spotify.com/album/${album.id}`

  let coverImage = ""
  const images = album.images
  if (images.length === 0) {
    warn("Warning: no cover image found for this album")
  } else {
    const exact = images.find((img) => img.width === 640)
    if (exact) {
      coverImage = exact.url
    } else {
      const withWidth = images.filter((img) => img.width !== null)
      if (withWidth.length > 0) {
        coverImage = withWidth.reduce((a, b) => (b.width! > a.width! ? b : a)).url
      } else {
        coverImage = images[0].url
      }
    }
  }

  return { title, creator, coverImage, url }
}

export async function fetchSpotifyAlbum(
  albumId: string,
  clientId: string,
  clientSecret: string
): Promise<SpotifyAlbumData> {
  // Auth: client credentials flow
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  })
  if (!tokenRes.ok) {
    throw new Error(`Spotify auth failed: ${tokenRes.status} ${tokenRes.url}`)
  }
  const tokenData = (await tokenRes.json()) as { access_token: string }

  const albumRes = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  })
  if (!albumRes.ok) {
    throw new Error(`Spotify album fetch failed: ${albumRes.status} ${albumRes.url}`)
  }
  const album = (await albumRes.json()) as SpotifyAlbumResponse
  return parseSpotifyAlbum(album)
}
