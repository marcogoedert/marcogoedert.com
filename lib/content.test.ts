import { describe, it, expect } from "vitest";
import { getExperiences, getListens } from "./content";

describe("getExperiences", () => {
  it("returns an array of valid experiences", () => {
    const experiences = getExperiences();
    expect(Array.isArray(experiences)).toBe(true);
    expect(experiences.length).toBeGreaterThan(0);
    const first = experiences[0];
    expect(typeof first.company).toBe("string");
    expect(typeof first.role).toBe("string");
    expect(typeof first.startDate).toBe("string");
    expect(first.endDate === null || typeof first.endDate === "string").toBe(true);
  });
});

describe("getListens", () => {
  it("returns an array of valid media items", () => {
    const items = getListens();
    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBeGreaterThan(0);
    const first = items[0];
    expect(typeof first.id).toBe("string");
    expect(typeof first.title).toBe("string");
    expect(typeof first.creator).toBe("string");
    expect(typeof first.coverImage).toBe("string");
  });

  it("throws if content has duplicate ids", async () => {
    const { MediaItemArraySchema } = await import("./schemas");
    const dupes = [
      { id: "dup", title: "A", creator: "X", coverImage: "/p.jpg", note: null },
      { id: "dup", title: "B", creator: "Y", coverImage: "/p.jpg", note: null },
    ];
    expect(() => MediaItemArraySchema.parse(dupes)).toThrow();
  });
});
