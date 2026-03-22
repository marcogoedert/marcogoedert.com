import { configDotenv } from "dotenv"
configDotenv({ path: ".env.local" })

import { input, select, confirm } from "@inquirer/prompts"
import { detectUrl } from "./lib/detect"
import { fetchSpotifyAlbum, fetchSpotifyTrack, searchAndSelectSpotify } from "./lib/spotify"
import { fetchTmdbTitle, searchAndSelectTmdb } from "./lib/tmdb"
import { searchAndSelectBook, extractQueryFromGoodreadsSlug } from "./lib/books"
import {
  prependItem,
  findDuplicateId,
  findMatchingEntries,
  updateItem,
  removeItem,
  type ContentFile,
} from "./lib/content"
import { MediaItemSchema } from "../lib/schemas"
import type { IMediaItem } from "../lib/schemas"

function printUsage(): void {
  console.error(`
Usage:
  npm run media add [url]          # fetch metadata from URL, or interactive search if omitted
  npm run media edit <id|query>    # edit existing entry by exact id or fuzzy search
  npm run media remove <id|query>  # delete existing entry by exact id or fuzzy search
`.trim())
}

function checkEnvVars(names: string[]): void {
  const missing = names.filter((n) => !process.env[n])
  if (missing.length > 0) {
    console.error(`Missing environment variables: ${missing.join(", ")}`)
    console.error("Add them to .env.local")
    process.exit(1)
  }
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

function generateId(type: ContentFile, creator: string, title: string): string {
  if (type === "listens") return `${slugify(creator)}-${slugify(title)}`
  return slugify(title)
}

function isUrl(str: string): boolean {
  try { new URL(str); return true } catch { return false }
}

async function addCommand(urlOrQuery?: string): Promise<void> {
  type FetchedData = { title: string; creator: string; coverImage: string; url: string | null; publishedYear?: number }
  let contentType: ContentFile
  let fetched: FetchedData

  if (urlOrQuery && isUrl(urlOrQuery)) {
    const detected = detectUrl(urlOrQuery)
    if (!detected.ok) {
      console.error(detected.error)
      process.exit(1)
    }
    contentType = detected.type

    console.log("\nFetching metadata...\n")

    if (detected.type === "listens") {
      checkEnvVars(["SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET"])
      if (detected.spotifyType === "track") {
        fetched = await fetchSpotifyTrack(detected.id, process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!)
      } else {
        fetched = await fetchSpotifyAlbum(detected.id, process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!)
      }
    } else if (detected.type === "watches") {
      checkEnvVars(["TMDB_API_KEY"])
      fetched = await fetchTmdbTitle(detected.id, detected.originalUrl, process.env.TMDB_API_KEY!)
    } else {
      const defaultQuery = extractQueryFromGoodreadsSlug(detected.id)
      const bookQuery = await input({ message: "Search query (add author for better results)", default: defaultQuery })
      fetched = await searchAndSelectBook(bookQuery, detected.originalUrl)
    }
  } else {
    contentType = await select({
      message: "Type:",
      choices: [
        { name: "Book", value: "reads" as ContentFile },
        { name: "Movie / TV", value: "watches" as ContentFile },
        { name: "Music (album or track)", value: "listens" as ContentFile },
      ],
    })
    const queryMessage = contentType === "reads" ? "Search query (add author for better results)" : "Search query"
    const query = await input({ message: queryMessage, default: urlOrQuery ?? "" })

    console.log("\nFetching metadata...\n")

    if (contentType === "listens") {
      checkEnvVars(["SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET"])
      fetched = await searchAndSelectSpotify(query, process.env.SPOTIFY_CLIENT_ID!, process.env.SPOTIFY_CLIENT_SECRET!)
    } else if (contentType === "watches") {
      checkEnvVars(["TMDB_API_KEY"])
      fetched = await searchAndSelectTmdb(query, process.env.TMDB_API_KEY!)
    } else {
      fetched = await searchAndSelectBook(query, null)
    }
  }

  console.log(`\nFound: ${fetched.title} — ${fetched.creator}`)
  console.log(`Cover: ${fetched.coverImage || "(none)"}`)
  console.log()

  const defaultId = generateId(contentType, fetched.creator, fetched.title)
  const id = await input({ message: "Confirm ID", default: defaultId })

  const dup = findDuplicateId(id)
  if (dup) {
    console.error(`\nID "${id}" already exists in content/${dup.file}.json:`)
    console.error(JSON.stringify(dup.entry, null, 2))
    process.exit(1)
  }

  const title = await input({ message: "Title", default: fetched.title })
  const creator = await input({ message: "Creator", default: fetched.creator })
  const noteInput = await input({ message: "Add a note (optional)" })

  let readDate: string | undefined
  if (contentType === "reads") {
    const rd = await input({ message: 'Read date (e.g. "January 2026", leave blank to skip)' })
    if (rd) readDate = rd
  }

  const ratingInput = await input({ message: "Rating 1-5 (leave blank to skip)" })
  const rating = ratingInput ? parseInt(ratingInput, 10) : undefined

  const entry: IMediaItem = {
    id,
    title,
    creator,
    coverImage: fetched.coverImage,
    url: fetched.url || null,
    note: noteInput || null,
    ...(rating !== undefined && { rating }),
    ...(contentType === "reads" && fetched.publishedYear !== undefined && { publishedYear: fetched.publishedYear }),
    ...(contentType === "reads" && readDate !== undefined && { readDate }),
  }

  const validation = MediaItemSchema.safeParse(entry)
  if (!validation.success) {
    console.error("\nValidation failed:")
    console.error(validation.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n"))
    process.exit(1)
  }

  prependItem(contentType, validation.data)
  console.log(`\n✓ Added to content/${contentType}.json`)
}

async function editCommand(query: string): Promise<void> {
  const matches = findMatchingEntries(query)

  if (matches.length === 0) {
    console.error(`No entries found matching '${query}'`)
    process.exit(1)
  }

  let chosen: { entry: IMediaItem; file: ContentFile }
  if (matches.length === 1) {
    chosen = matches[0]
  } else {
    chosen = await select({
      message: "Select entry:",
      choices: matches.map((m) => ({
        name: `${m.entry.title} (${m.entry.id}) — ${m.file}`,
        value: m,
      })),
    })
  }

  const { entry, file } = chosen

  const title = await input({ message: "Title", default: entry.title })
  const creator = await input({ message: "Creator", default: entry.creator })
  const noteVal = await input({ message: "Note", default: entry.note ?? "" })
  const urlVal = await input({ message: "URL", default: entry.url ?? "" })
  const coverVal = await input({ message: "Cover image URL (freeform string)", default: entry.coverImage })

  let publishedYear = entry.publishedYear
  let readDate = entry.readDate
  if (file === "reads") {
    const pyInput = await input({ message: "Published year", default: entry.publishedYear?.toString() ?? "" })
    publishedYear = pyInput ? parseInt(pyInput, 10) : undefined
    const rdInput = await input({ message: "Read date", default: entry.readDate ?? "" })
    readDate = rdInput || undefined
  }

  const ratingInput = await input({ message: "Rating 1-5 (blank = keep existing)", default: "" })
  const rating = ratingInput ? parseInt(ratingInput, 10) : entry.rating

  const updated: IMediaItem = {
    ...entry,
    title,
    creator,
    note: noteVal || null,
    url: urlVal || null,
    coverImage: coverVal,
    ...(rating !== undefined ? { rating } : {}),
    ...(publishedYear !== undefined ? { publishedYear } : {}),
    ...(readDate !== undefined ? { readDate } : {}),
  }

  const validation = MediaItemSchema.safeParse(updated)
  if (!validation.success) {
    console.error("\nValidation failed:")
    console.error(validation.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n"))
    process.exit(1)
  }

  updateItem(file, entry.id, validation.data)
  console.log(`\n✓ Updated content/${file}.json`)
}

async function removeCommand(query: string): Promise<void> {
  const matches = findMatchingEntries(query)

  if (matches.length === 0) {
    console.error(`No entries found matching '${query}'`)
    process.exit(1)
  }

  let chosen: { entry: IMediaItem; file: ContentFile }
  if (matches.length === 1) {
    chosen = matches[0]
  } else {
    chosen = await select({
      message: "Select entry:",
      choices: matches.map((m) => ({
        name: `${m.entry.title} (${m.entry.id}) — ${m.file}`,
        value: m,
      })),
    })
  }

  const ok = await confirm({
    message: `Delete "${chosen.entry.title}"? This cannot be undone.`,
    default: false,
  })
  if (!ok) {
    console.log("Cancelled.")
    return
  }

  removeItem(chosen.file, chosen.entry.id)
  console.log(`\n✓ Removed from content/${chosen.file}.json`)
}

export async function run(args: string[]): Promise<void> {
  const [cmd, arg] = args

  if (cmd === "add") {
    await addCommand(arg)
  } else if (cmd === "edit") {
    if (!arg) { printUsage(); process.exit(1) }
    await editCommand(arg)
  } else if (cmd === "remove") {
    if (!arg) { printUsage(); process.exit(1) }
    await removeCommand(arg)
  } else {
    printUsage()
    process.exit(1)
  }
}

// File-level invocation — only runs when executed directly
if (process.argv[1]?.endsWith("media.ts") || process.argv[1]?.endsWith("media.js")) {
  run(process.argv.slice(2)).catch((err: Error) => {
    console.error(err.message ?? err)
    process.exit(1)
  })
}
