// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {
  setContentRoot,
  readItems,
  prependItem,
  updateItem,
  removeItem,
  findDuplicateId,
  writeItems,
  findMatchingEntries,
} from "../lib/content";
import type { IMediaItem } from "../../lib/schemas";

const ITEM_A: IMediaItem = {
  id: "item-a",
  title: "Item A",
  creator: "Author A",
  coverImage: "",
  note: null,
};
const ITEM_B: IMediaItem = {
  id: "item-b",
  title: "Item B",
  creator: "Author B",
  coverImage: "",
  note: null,
};
const ITEM_RATED: IMediaItem = {
  id: "item-rated",
  title: "Rated",
  creator: "Someone",
  coverImage: "",
  note: "great",
  rating: 4,
};

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "media-cli-test-"));
  fs.mkdirSync(path.join(tmpDir, "content"));
  for (const type of ["reads", "watches", "listens"]) {
    fs.writeFileSync(
      path.join(tmpDir, "content", `${type}.json`),
      "[]",
      "utf-8",
    );
  }
  setContentRoot(tmpDir);
});

afterEach(() => {
  setContentRoot(process.cwd());
  fs.rmSync(tmpDir, { recursive: true });
});

describe("readItems", () => {
  it("reads empty array", () => {
    expect(readItems("reads")).toEqual([]);
  });

  it("reads items from file", () => {
    fs.writeFileSync(
      path.join(tmpDir, "content", "reads.json"),
      JSON.stringify([ITEM_A]),
      "utf-8",
    );
    expect(readItems("reads")).toEqual([ITEM_A]);
  });
});

describe("prependItem", () => {
  it("prepends to empty file (most recent first)", () => {
    prependItem("reads", ITEM_A);
    expect(readItems("reads")).toEqual([ITEM_A]);
  });

  it("prepends before existing items", () => {
    prependItem("reads", ITEM_A);
    prependItem("reads", ITEM_B);
    expect(readItems("reads")[0]).toEqual(ITEM_B);
    expect(readItems("reads")[1]).toEqual(ITEM_A);
  });
});

describe("updateItem", () => {
  it("updates a matching item in place", () => {
    prependItem("reads", ITEM_A);
    const updated = { ...ITEM_A, title: "Updated" };
    updateItem("reads", ITEM_A.id, updated);
    expect(readItems("reads")[0].title).toBe("Updated");
  });

  it("throws if item not found", () => {
    expect(() => updateItem("reads", "nonexistent", ITEM_A)).toThrow(
      "Item not found: nonexistent",
    );
  });
});

describe("removeItem", () => {
  it("removes a matching item", () => {
    prependItem("reads", ITEM_A);
    prependItem("reads", ITEM_B);
    removeItem("reads", ITEM_A.id);
    expect(readItems("reads")).toEqual([ITEM_B]);
  });

  it("throws if item not found", () => {
    expect(() => removeItem("reads", "nonexistent")).toThrow(
      "Item not found: nonexistent",
    );
  });
});

describe("findDuplicateId", () => {
  it("returns null when no duplicates", () => {
    expect(findDuplicateId("item-a")).toBeNull();
  });

  it("finds duplicate in the same file", () => {
    prependItem("reads", ITEM_A);
    const result = findDuplicateId("item-a");
    expect(result).toMatchObject({ entry: ITEM_A, file: "reads" });
  });

  it("finds duplicate across different files", () => {
    prependItem("listens", ITEM_B);
    const result = findDuplicateId("item-b");
    expect(result).toMatchObject({ file: "listens" });
  });
});

describe("writeItems: atomic write", () => {
  it("writes JSON file successfully via rename", () => {
    writeItems("reads", [ITEM_RATED]);
    const raw = fs.readFileSync(
      path.join(tmpDir, "content", "reads.json"),
      "utf-8",
    );
    expect(JSON.parse(raw)).toEqual([ITEM_RATED]);
    // Windows copy fallback (renameSync throws EXDEV) is defensive code tested manually
  });
});

describe("findMatchingEntries", () => {
  it("returns empty array when no matches", () => {
    expect(findMatchingEntries("nonexistent")).toEqual([]);
  });

  it("finds exact id match", () => {
    prependItem("reads", ITEM_A);
    const results = findMatchingEntries("item-a");
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({ entry: ITEM_A, file: "reads" });
  });

  it("finds partial id match (case-insensitive)", () => {
    prependItem("reads", ITEM_A);
    const results = findMatchingEntries("ITEM");
    expect(results.some((r) => r.entry.id === "item-a")).toBe(true);
  });

  it("finds partial title match (case-insensitive)", () => {
    prependItem("watches", ITEM_B);
    const results = findMatchingEntries("item b");
    expect(results.some((r) => r.entry.id === "item-b")).toBe(true);
  });

  it("returns matches across multiple files", () => {
    prependItem("reads", ITEM_A);
    prependItem("listens", ITEM_B);
    const results = findMatchingEntries("item");
    expect(results.length).toBeGreaterThanOrEqual(2);
    const files = results.map((r) => r.file);
    expect(files).toContain("reads");
    expect(files).toContain("listens");
  });
});
