import { select } from "@inquirer/prompts";

export interface TmdbTitleData {
  title: string;
  creator: string;
  coverImage: string;
  url: string;
}

interface MovieResult {
  id: number;
  title: string;
  poster_path: string | null;
}

interface TvResult {
  id: number;
  name: string;
  poster_path: string | null;
}

interface CreditsResponse {
  crew: Array<{ job: string; name: string }>;
}

interface TvDetailsResponse {
  id: number;
  name: string;
  created_by: Array<{ name: string }>;
}

export interface TmdbMultiSearchResult {
  id: number;
  media_type: "movie" | "tv" | "person";
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
}

export function formatTmdbSearchLabel(item: TmdbMultiSearchResult): string {
  const title = item.title ?? item.name ?? "Unknown";
  const type = item.media_type === "movie" ? "Movie" : "TV Series";
  const year =
    (item.release_date ?? item.first_air_date ?? "").slice(0, 4) || "?";
  return `${title} (${type}, ${year})`;
}

export function parseTmdbMovie(
  movie: MovieResult,
  credits: CreditsResponse,
  originalUrl: string,
  warn: (msg: string) => void = console.warn,
): TmdbTitleData {
  const director = credits.crew.find((c) => c.job === "Director");
  let creator = "";
  if (!director) {
    warn("Warning: no director found in credits");
  } else {
    creator = director.name;
  }

  let coverImage = "";
  if (!movie.poster_path) {
    warn("Warning: no poster image found");
  } else {
    coverImage = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  }

  return { title: movie.title, creator, coverImage, url: originalUrl };
}

export function parseTmdbTv(
  tv: TvResult,
  details: TvDetailsResponse,
  originalUrl: string,
  warn: (msg: string) => void = console.warn,
): TmdbTitleData {
  let creator = "";
  if (!details.created_by.length) {
    warn("Warning: no creator found in TV details");
  } else {
    creator = details.created_by[0].name;
  }

  let coverImage = "";
  if (!tv.poster_path) {
    warn("Warning: no poster image found");
  } else {
    coverImage = `https://image.tmdb.org/t/p/w500${tv.poster_path}`;
  }

  return { title: tv.name, creator, coverImage, url: originalUrl };
}

async function fetchMovieDetails(
  movie: MovieResult,
  originalUrl: string,
  apiKey: string,
): Promise<TmdbTitleData> {
  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/credits`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  if (!creditsRes.ok)
    throw new Error(
      `TMDB credits failed: ${creditsRes.status} ${creditsRes.url}`,
    );
  return parseTmdbMovie(
    movie,
    (await creditsRes.json()) as CreditsResponse,
    originalUrl,
  );
}

async function fetchTvDetails(
  tv: TvResult,
  originalUrl: string,
  apiKey: string,
): Promise<TmdbTitleData> {
  const detailsRes = await fetch(`https://api.themoviedb.org/3/tv/${tv.id}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!detailsRes.ok)
    throw new Error(
      `TMDB TV details failed: ${detailsRes.status} ${detailsRes.url}`,
    );
  return parseTmdbTv(
    tv,
    (await detailsRes.json()) as TvDetailsResponse,
    originalUrl,
  );
}

export async function fetchTmdbTitle(
  imdbId: string,
  originalUrl: string,
  apiKey: string,
): Promise<TmdbTitleData> {
  const findRes = await fetch(
    `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  if (!findRes.ok)
    throw new Error(`TMDB find failed: ${findRes.status} ${findRes.url}`);
  const findData = (await findRes.json()) as {
    movie_results: MovieResult[];
    tv_results: TvResult[];
  };

  if (findData.movie_results.length > 0)
    return fetchMovieDetails(findData.movie_results[0], originalUrl, apiKey);
  if (findData.tv_results.length > 0)
    return fetchTvDetails(findData.tv_results[0], originalUrl, apiKey);
  throw new Error(`No results found for ${imdbId}`);
}

export async function searchAndSelectTmdb(
  query: string,
  apiKey: string,
): Promise<TmdbTitleData> {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`,
    { headers: { Authorization: `Bearer ${apiKey}` } },
  );
  if (!res.ok) throw new Error(`TMDB search failed: ${res.status} ${res.url}`);
  const data = (await res.json()) as { results: TmdbMultiSearchResult[] };

  const items = data.results.filter(
    (r) => r.media_type === "movie" || r.media_type === "tv",
  );
  if (items.length === 0) throw new Error(`No results found for '${query}'`);

  const chosen =
    items.length === 1
      ? items[0]
      : await select({
          message: "Select:",
          choices: items.map((r) => ({
            name: formatTmdbSearchLabel(r),
            value: r,
          })),
        });

  const originalUrl =
    chosen.media_type === "movie"
      ? `https://www.themoviedb.org/movie/${chosen.id}`
      : `https://www.themoviedb.org/tv/${chosen.id}`;

  if (chosen.media_type === "movie") {
    return fetchMovieDetails(
      {
        id: chosen.id,
        title: chosen.title ?? "Unknown",
        poster_path: chosen.poster_path,
      },
      originalUrl,
      apiKey,
    );
  }
  return fetchTvDetails(
    {
      id: chosen.id,
      name: chosen.name ?? "Unknown",
      poster_path: chosen.poster_path,
    },
    originalUrl,
    apiKey,
  );
}
