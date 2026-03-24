import { select } from "@inquirer/prompts";

export interface BookResult {
  title: string;
  creator: string;
  publishedYear: number;
  coverImage: string;
  label: string; // "Title by Author (Year)" for select prompt
}

export type BookResultWithUrl = BookResult & { url: string | null };

interface VolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  imageLinks?: { thumbnail?: string } | null;
}

export function extractQueryFromGoodreadsSlug(slug: string): string {
  if (/^\d+$/.test(slug)) {
    throw new Error(
      "Could not extract title from URL. Use a full Goodreads book URL.",
    );
  }
  // Strip leading numeric prefix and its separator (. or -)
  const withoutPrefix = slug.replace(/^\d+[.\-]/, "");
  // Replace remaining separators with spaces
  return withoutPrefix.replace(/[._-]/g, " ");
}

export function parseBookResults(
  items: Array<{ volumeInfo: VolumeInfo }>,
  warn: (msg: string) => void = console.warn,
): BookResult[] {
  return items.map((item) => {
    const info = item.volumeInfo;
    const title = info.title;
    const creator = info.authors?.[0] ?? "";
    const publishedYear = parseInt(info.publishedDate?.slice(0, 4) ?? "0", 10);

    let coverImage = "";
    if (!info.imageLinks?.thumbnail) {
      warn("Warning: no cover image found for this book");
    } else {
      coverImage = info.imageLinks.thumbnail.replace("zoom=1", "zoom=3");
    }

    const label = `${title} by ${creator} (${publishedYear})`;

    return { title, creator, publishedYear, coverImage, label };
  });
}

export async function searchAndSelectBook(
  query: string,
  originalUrl: string | null,
): Promise<BookResultWithUrl> {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`,
  );
  if (!res.ok)
    throw new Error(`Google Books fetch failed: ${res.status} ${res.url}`);
  const data = (await res.json()) as {
    items?: Array<{ volumeInfo: VolumeInfo }>;
  };

  if (!data.items || data.items.length === 0) {
    throw new Error(
      `No books found for '${query}'. Try a different search term.`,
    );
  }

  const results = parseBookResults(data.items);

  let chosenResult: BookResult;
  if (results.length === 1) {
    chosenResult = results[0];
  } else {
    chosenResult = await select({
      message: "Select a book:",
      choices: results.map((r) => ({ name: r.label, value: r })),
    });
  }

  // url is always the original Goodreads URL, not from Google Books
  return { ...chosenResult, url: originalUrl };
}
