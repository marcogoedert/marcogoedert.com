// @vitest-environment node
import { describe, it, expect, vi, afterEach } from "vitest";
import {
  parseTmdbMovie,
  parseTmdbTv,
  formatTmdbSearchLabel,
  fetchExternalIds,
} from "../lib/tmdb";

afterEach(() => {
  vi.unstubAllGlobals();
});
import findMovie from "./fixtures/tmdb-find-movie.json";
import findTv from "./fixtures/tmdb-find-tv.json";
import creditsMovie from "./fixtures/tmdb-credits-movie.json";
import tvDetails from "./fixtures/tmdb-tv-details.json";

describe("formatTmdbSearchLabel", () => {
  it("formats a movie with release_date", () => {
    const item = {
      id: 1,
      media_type: "movie" as const,
      title: "Dune: Part Two",
      release_date: "2024-03-01",
      poster_path: null,
    };
    expect(formatTmdbSearchLabel(item)).toBe("Dune: Part Two (Movie, 2024)");
  });

  it("formats a TV show with first_air_date", () => {
    const item = {
      id: 2,
      media_type: "tv" as const,
      name: "Severance",
      first_air_date: "2022-02-18",
      poster_path: null,
    };
    expect(formatTmdbSearchLabel(item)).toBe("Severance (TV Series, 2022)");
  });

  it("falls back to ? when no date present", () => {
    const item = {
      id: 3,
      media_type: "movie" as const,
      title: "Some Film",
      poster_path: null,
    };
    expect(formatTmdbSearchLabel(item)).toBe("Some Film (Movie, ?)");
  });

  it("falls back to Unknown when no title or name", () => {
    const item = { id: 4, media_type: "tv" as const, poster_path: null };
    expect(formatTmdbSearchLabel(item)).toBe("Unknown (TV Series, ?)");
  });
});

describe("parseTmdbMovie", () => {
  const movieResult = findMovie.movie_results[0];

  it("extracts title from movie result", () => {
    const result = parseTmdbMovie(
      movieResult,
      creditsMovie,
      "https://www.imdb.com/title/tt15239678/",
    );
    expect(result.title).toBe("Dune: Part Two");
  });

  it("extracts director from crew", () => {
    const result = parseTmdbMovie(
      movieResult,
      creditsMovie,
      "https://www.imdb.com/title/tt15239678/",
    );
    expect(result.creator).toBe("Denis Villeneuve");
  });

  it("builds cover image URL from poster_path", () => {
    const result = parseTmdbMovie(
      movieResult,
      creditsMovie,
      "https://www.imdb.com/title/tt15239678/",
    );
    expect(result.coverImage).toBe(
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    );
  });

  it("preserves original IMDB URL", () => {
    const imdbUrl = "https://www.imdb.com/title/tt15239678/";
    const result = parseTmdbMovie(movieResult, creditsMovie, imdbUrl);
    expect(result.url).toBe(imdbUrl);
  });

  it("returns empty creator and warns when no director found", () => {
    const warnings: string[] = [];
    const noDirector = { crew: [{ job: "Producer", name: "X" }] };
    const result = parseTmdbMovie(
      movieResult,
      noDirector,
      "https://imdb.com/title/tt1/",
      (m) => warnings.push(m),
    );
    expect(result.creator).toBe("");
    expect(warnings[0]).toMatch(/director/i);
  });

  it("returns empty coverImage and warns when poster_path is null", () => {
    const warnings: string[] = [];
    const nullPoster = { ...movieResult, poster_path: null };
    const result = parseTmdbMovie(
      nullPoster,
      creditsMovie,
      "https://imdb.com/title/tt1/",
      (m) => warnings.push(m),
    );
    expect(result.coverImage).toBe("");
    expect(warnings[0]).toMatch(/poster/i);
  });
});

describe("parseTmdbTv", () => {
  const tvResult = findTv.tv_results[0];

  it("extracts title from TV result (name field)", () => {
    const result = parseTmdbTv(
      tvResult,
      tvDetails,
      "https://www.imdb.com/title/tt11280740/",
    );
    expect(result.title).toBe("Severance");
  });

  it("extracts creator from created_by first entry", () => {
    const result = parseTmdbTv(
      tvResult,
      tvDetails,
      "https://www.imdb.com/title/tt11280740/",
    );
    expect(result.creator).toBe("Dan Erickson");
  });

  it("returns empty creator and warns when created_by is empty", () => {
    const warnings: string[] = [];
    const noCreator = { ...tvDetails, created_by: [] };
    const result = parseTmdbTv(
      tvResult,
      noCreator,
      "https://imdb.com/title/tt1/",
      (m) => warnings.push(m),
    );
    expect(result.creator).toBe("");
    expect(warnings[0]).toMatch(/creator/i);
  });
});

describe("fetchExternalIds", () => {
  const apiKey = "fake-key";

  it("returns imdb_id for a movie", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ imdb_id: "tt15239678" }),
      }),
    );
    expect(await fetchExternalIds(693134, "movie", apiKey)).toBe("tt15239678");
  });

  it("returns imdb_id for a tv show", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ imdb_id: "tt11280740" }),
      }),
    );
    expect(await fetchExternalIds(95396, "tv", apiKey)).toBe("tt11280740");
  });

  it("returns null when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    expect(await fetchExternalIds(1, "movie", apiKey)).toBeNull();
  });

  it("returns null when imdb_id is null in response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ imdb_id: null }),
      }),
    );
    expect(await fetchExternalIds(1, "movie", apiKey)).toBeNull();
  });

  it("calls the correct endpoint for movie", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ imdb_id: "tt1" }),
    });
    vi.stubGlobal("fetch", mockFetch);
    await fetchExternalIds(42, "movie", apiKey);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/movie/42/external_ids",
      expect.objectContaining({ headers: expect.anything() }),
    );
  });

  it("calls the correct endpoint for tv", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ imdb_id: "tt1" }),
    });
    vi.stubGlobal("fetch", mockFetch);
    await fetchExternalIds(99, "tv", apiKey);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/tv/99/external_ids",
      expect.objectContaining({ headers: expect.anything() }),
    );
  });
});
