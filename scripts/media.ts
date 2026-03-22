import { configDotenv } from "dotenv"
configDotenv({ path: ".env.local" })

import { input, select, confirm } from "@inquirer/prompts"
import { detectUrl } from "./lib/detect"
import { fetchSpotifyAlbum, fetchSpotifyTrack } from "./lib/spotify"
import { fetchTmdbTitle } from "./lib/tmdb"
import { searchAndSelectBook } from "./lib/books"
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
  npm run media add <url>          # fetch metadata, prompt for fields, append
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

async function addCommand(url: string): Promise<void> {
  const detected = detectUrl(url)
  if (!detected.ok) {
    console.error(detected.error)
    process.exit(1)
  }

  console.log("\nFetching metadata...\n")

  type FetchedData = { title: string; creator: string; coverImage: string; url: string; publishedYear?: number }
  let fetched: FetchedData

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
    // searchAndSelectBook returns BookResultWithUrl (has url field = originalUrl)
    fetched = await searchAndSelectBook(detected.id, detected.originalUrl)
  }

  console.log(`\nFound: ${fetched.title} — ${fetched.creator}`)
  console.log(`Cover: ${fetched.coverImage || "(none)"}`)
  console.log()

  const defaultId = generateId(detected.type, fetched.creator, fetched.title)
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
  if (detected.type === "reads") {
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
    ...(detected.type === "reads" && fetched.publishedYear !== undefined && { publishedYear: fetched.publishedYear }),
    ...(detected.type === "reads" && readDate !== undefined && { readDate }),
  }

  const validation = MediaItemSchema.safeParse(entry)
  if (!validation.success) {
    console.error("\nValidation failed:")
    console.error(validation.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n"))
    process.exit(1)
  }

  prependItem(detected.type, validation.data)
  console.log(`\n✓ Added to content/${detected.type}.json`)
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
    if (!arg) { printUsage(); process.exit(1) }
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
