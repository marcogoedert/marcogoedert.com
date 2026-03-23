import * as fs from "fs"
import * as path from "path"
import { MediaItemArraySchema } from "../../lib/schemas"
import type { IMediaItem } from "../../lib/schemas"

export type ContentFile = "reads" | "watches" | "listens"

let contentRoot = process.cwd()

export function setContentRoot(root: string): void {
  contentRoot = root
}

function getFilePath(type: ContentFile): string {
  return path.resolve(contentRoot, "content", `${type}.json`)
}

export function readItems(type: ContentFile): IMediaItem[] {
  const raw = fs.readFileSync(getFilePath(type), "utf-8")
  return MediaItemArraySchema.parse(JSON.parse(raw))
}

export function writeItems(type: ContentFile, items: IMediaItem[]): void {
  const target = getFilePath(type)
  const tmp = target + ".tmp"
  fs.writeFileSync(tmp, JSON.stringify(items, null, 2) + "\n", "utf-8")
  try {
    fs.renameSync(tmp, target)
  } catch {
    fs.copyFileSync(tmp, target)
    try {
      fs.unlinkSync(tmp)
    } catch {
      // tmp cleanup failed; data is safe in target
    }
  }
}

export function prependItem(type: ContentFile, item: IMediaItem): void {
  const items = readItems(type)
  writeItems(type, [item, ...items])
}

export function updateItem(type: ContentFile, id: string, updated: IMediaItem): void {
  const items = readItems(type)
  const idx = items.findIndex((i) => i.id === id)
  if (idx === -1) throw new Error(`Item not found: ${id}`)
  items[idx] = updated
  writeItems(type, items)
}

export function removeItem(type: ContentFile, id: string): void {
  const items = readItems(type)
  const filtered = items.filter((i) => i.id !== id)
  if (filtered.length === items.length) throw new Error(`Item not found: ${id}`)
  writeItems(type, filtered)
}

export function findDuplicateId(id: string): { entry: IMediaItem; file: ContentFile } | null {
  for (const type of ["reads", "watches", "listens"] as ContentFile[]) {
    const items = readItems(type)
    const found = items.find((i) => i.id === id)
    if (found) return { entry: found, file: type }
  }
  return null
}

export function findMatchingEntries(query: string): Array<{ entry: IMediaItem; file: ContentFile }> {
  const results: Array<{ entry: IMediaItem; file: ContentFile }> = []
  const lower = query.toLowerCase()
  for (const type of ["reads", "watches", "listens"] as ContentFile[]) {
    for (const entry of readItems(type)) {
      if (
        entry.id === query ||
        entry.id.toLowerCase().includes(lower) ||
        entry.title.toLowerCase().includes(lower)
      ) {
        results.push({ entry, file: type })
      }
    }
  }
  return results
}
