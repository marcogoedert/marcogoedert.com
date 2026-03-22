export interface TmdbTitleData {
  title: string
  creator: string
  coverImage: string
  url: string
}

interface MovieResult {
  id: number
  title: string
  poster_path: string | null
}

interface TvResult {
  id: number
  name: string
  poster_path: string | null
}

interface CreditsResponse {
  crew: Array<{ job: string; name: string }>
}

interface TvDetailsResponse {
  id: number
  name: string
  created_by: Array<{ name: string }>
}

export function parseTmdbMovie(
  movie: MovieResult,
  credits: CreditsResponse,
  originalUrl: string,
  warn: (msg: string) => void = console.warn
): TmdbTitleData {
  const director = credits.crew.find((c) => c.job === "Director")
  let creator = ""
  if (!director) {
    warn("Warning: no director found in credits")
  } else {
    creator = director.name
  }

  let coverImage = ""
  if (!movie.poster_path) {
    warn("Warning: no poster image found")
  } else {
    coverImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  }

  return { title: movie.title, creator, coverImage, url: originalUrl }
}

export function parseTmdbTv(
  tv: TvResult,
  details: TvDetailsResponse,
  originalUrl: string,
  warn: (msg: string) => void = console.warn
): TmdbTitleData {
  let creator = ""
  if (!details.created_by.length) {
    warn("Warning: no creator found in TV details")
  } else {
    creator = details.created_by[0].name
  }

  let coverImage = ""
  if (!tv.poster_path) {
    warn("Warning: no poster image found")
  } else {
    coverImage = `https://image.tmdb.org/t/p/w500${tv.poster_path}`
  }

  return { title: tv.name, creator, coverImage, url: originalUrl }
}

export async function fetchTmdbTitle(
  imdbId: string,
  originalUrl: string,
  apiKey: string
): Promise<TmdbTitleData> {
  const authHeaders = { Authorization: `Bearer ${apiKey}` }

  const findRes = await fetch(
    `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`,
    { headers: authHeaders }
  )
  if (!findRes.ok) throw new Error(`TMDB find failed: ${findRes.status} ${findRes.url}`)
  const findData = (await findRes.json()) as { movie_results: MovieResult[]; tv_results: TvResult[] }

  if (findData.movie_results.length > 0) {
    const movie = findData.movie_results[0]
    const creditsRes = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
      { headers: authHeaders }
    )
    if (!creditsRes.ok) throw new Error(`TMDB credits failed: ${creditsRes.status} ${creditsRes.url}`)
    const credits = (await creditsRes.json()) as CreditsResponse
    return parseTmdbMovie(movie, credits, originalUrl)
  }

  if (findData.tv_results.length > 0) {
    const tv = findData.tv_results[0]
    const detailsRes = await fetch(
      `https://api.themoviedb.org/3/tv/${tv.id}`,
      { headers: authHeaders }
    )
    if (!detailsRes.ok) throw new Error(`TMDB TV details failed: ${detailsRes.status} ${detailsRes.url}`)
    const details = (await detailsRes.json()) as TvDetailsResponse
    return parseTmdbTv(tv, details, originalUrl)
  }

  throw new Error(`No results found for ${imdbId}`)
}
