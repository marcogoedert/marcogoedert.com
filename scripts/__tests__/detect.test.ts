// @vitest-environment node
import { describe, it, expect } from "vitest";
import { detectUrl } from "../lib/detect";

const UNSUPPORTED =
  "Unsupported URL format. Supported: open.spotify.com/album/..., open.spotify.com/track/..., goodreads.com/book/show/..., imdb.com/title/tt...";
const SPOTIFY_ONLY =
  "Only Spotify album and track URLs are supported (open.spotify.com/album/..., open.spotify.com/track/...)";

describe("detectUrl: Spotify", () => {
  it("detects album URL, sets id to album ID and spotifyType to album", () => {
    const result = detectUrl(
      "https://open.spotify.com/album/2lIZef4lzdvZkiiCzvPKj7",
    );
    expect(result).toEqual({
      ok: true,
      type: "listens",
      id: "2lIZef4lzdvZkiiCzvPKj7",
      originalUrl: "https://open.spotify.com/album/2lIZef4lzdvZkiiCzvPKj7",
      spotifyType: "album",
    });
  });

  it("detects track URL, sets id to track ID and spotifyType to track", () => {
    const result = detectUrl(
      "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
    );
    expect(result).toEqual({
      ok: true,
      type: "listens",
      id: "4cOdK2wGLETKBW3PvgPWqT",
      originalUrl: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT",
      spotifyType: "track",
    });
  });

  it("detects locale-prefixed album URL (e.g. /intl-pt/album/...)", () => {
    const url =
      "https://open.spotify.com/intl-pt/album/5JjnPCfpp6redrkKpXZAs8?si=abc";
    const result = detectUrl(url);
    expect(result).toEqual({
      ok: true,
      type: "listens",
      id: "5JjnPCfpp6redrkKpXZAs8",
      originalUrl: url,
      spotifyType: "album",
    });
  });

  it("detects locale-prefixed track URL (e.g. /intl-pt/track/...)", () => {
    const url = "https://open.spotify.com/intl-pt/track/4cOdK2wGLETKBW3PvgPWqT";
    const result = detectUrl(url);
    expect(result).toEqual({
      ok: true,
      type: "listens",
      id: "4cOdK2wGLETKBW3PvgPWqT",
      originalUrl: url,
      spotifyType: "track",
    });
  });

  it("strips query params, preserves originalUrl as raw input", () => {
    const raw =
      "https://open.spotify.com/album/2lIZef4lzdvZkiiCzvPKj7?si=abc123&utm_source=foo";
    const result = detectUrl(raw);
    expect(result).toMatchObject({
      ok: true,
      id: "2lIZef4lzdvZkiiCzvPKj7",
      originalUrl: raw,
      spotifyType: "album",
    });
  });

  it("rejects /playlist/ URL", () => {
    const result = detectUrl("https://open.spotify.com/playlist/abc");
    expect(result).toEqual({ ok: false, error: SPOTIFY_ONLY });
  });

  it("rejects spotify.link short URLs", () => {
    const result = detectUrl("https://spotify.link/abc123");
    expect(result).toEqual({ ok: false, error: UNSUPPORTED });
  });

  it("rejects /album/ URL with no album ID", () => {
    const result = detectUrl("https://open.spotify.com/album/");
    expect(result).toEqual({ ok: false, error: UNSUPPORTED });
  });
});

describe("detectUrl: Goodreads", () => {
  it("detects dot-format URL", () => {
    const result = detectUrl(
      "https://www.goodreads.com/book/show/1536545.The_Likeness",
    );
    expect(result).toEqual({
      ok: true,
      type: "reads",
      id: "1536545.The_Likeness",
      originalUrl: "https://www.goodreads.com/book/show/1536545.The_Likeness",
    });
  });

  it("detects hyphen-format URL", () => {
    const result = detectUrl(
      "https://www.goodreads.com/book/show/58784475-tomorrow-and-tomorrow-and-tomorrow",
    );
    expect(result).toEqual({
      ok: true,
      type: "reads",
      id: "58784475-tomorrow-and-tomorrow-and-tomorrow",
      originalUrl:
        "https://www.goodreads.com/book/show/58784475-tomorrow-and-tomorrow-and-tomorrow",
    });
  });

  it("rejects purely numeric path segment", () => {
    const result = detectUrl("https://www.goodreads.com/book/show/12345");
    expect(result).toEqual({
      ok: false,
      error: "Could not extract title from URL. Use a full Goodreads book URL.",
    });
  });

  it("detects bare goodreads.com domain (no www)", () => {
    const result = detectUrl(
      "https://goodreads.com/book/show/58784475-tomorrow-and-tomorrow-and-tomorrow",
    );
    expect(result).toEqual({
      ok: true,
      type: "reads",
      id: "58784475-tomorrow-and-tomorrow-and-tomorrow",
      originalUrl:
        "https://goodreads.com/book/show/58784475-tomorrow-and-tomorrow-and-tomorrow",
    });
  });
});

describe("detectUrl: IMDB", () => {
  it("detects IMDB title URL, sets id to tt ID", () => {
    const result = detectUrl("https://www.imdb.com/title/tt11280740/");
    expect(result).toEqual({
      ok: true,
      type: "watches",
      id: "tt11280740",
      originalUrl: "https://www.imdb.com/title/tt11280740/",
    });
  });

  it("detects IMDB title URL without trailing slash", () => {
    const result = detectUrl("https://www.imdb.com/title/tt11280740");
    expect(result).toEqual({
      ok: true,
      type: "watches",
      id: "tt11280740",
      originalUrl: "https://www.imdb.com/title/tt11280740",
    });
  });

  it("detects bare imdb.com domain (no www)", () => {
    const result = detectUrl("https://imdb.com/title/tt11280740/");
    expect(result).toEqual({
      ok: true,
      type: "watches",
      id: "tt11280740",
      originalUrl: "https://imdb.com/title/tt11280740/",
    });
  });
});

describe("detectUrl: unsupported", () => {
  it("rejects unknown domain", () => {
    const result = detectUrl("https://example.com/something");
    expect(result).toEqual({ ok: false, error: UNSUPPORTED });
  });

  it("rejects malformed URL", () => {
    const result = detectUrl("not-a-url");
    expect(result).toEqual({ ok: false, error: UNSUPPORTED });
  });
});
