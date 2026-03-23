import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { axe } from "jest-axe";
import { BookCard } from "./BookCard";
import type { IMediaItem } from "@/lib/schemas";

const ITEM: IMediaItem = {
  id: "test-book",
  title: "The Pragmatic Programmer",
  creator: "David Thomas",
  coverImage: "/images/placeholder.jpg",
  note: "A must-read for engineers.",
  publishedYear: 1999,
  readDate: "Jan 2024",
  rating: 5,
};

describe("BookCard", () => {
  it("renders the title", () => {
    render(<BookCard item={ITEM} />);
    expect(screen.getByText("The Pragmatic Programmer")).toBeDefined();
  });

  it("renders the creator", () => {
    render(<BookCard item={ITEM} />);
    expect(screen.getByText(/David Thomas/)).toBeDefined();
  });

  it("renders the note when provided", () => {
    render(<BookCard item={ITEM} />);
    expect(screen.getByText("A must-read for engineers.")).toBeDefined();
  });

  it("does not render note when null", () => {
    render(<BookCard item={{ ...ITEM, note: null }} />);
    expect(screen.queryByText("A must-read for engineers.")).toBeNull();
  });

  it("renders published year", () => {
    render(<BookCard item={ITEM} />);
    expect(screen.getByText("1999")).toBeDefined();
  });

  it("renders read date", () => {
    render(<BookCard item={ITEM} />);
    expect(screen.getByText("Jan 2024")).toBeDefined();
  });

  it("renders rating", () => {
    render(<BookCard item={ITEM} />);
    expect(screen.getByText(/5\/5/)).toBeDefined();
  });

  it("wraps in a link when url is provided", () => {
    render(<BookCard item={{ ...ITEM, url: "https://example.com" }} />);
    const link = screen.getByRole("link");
    expect((link as HTMLAnchorElement).href).toContain("https://example.com");
  });

  it("shows placeholder on image error", () => {
    const { container } = render(<BookCard item={ITEM} />);
    const img = container.querySelector("img");
    if (img) fireEvent.error(img);
    expect(screen.getByText("No image")).toBeDefined();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BookCard item={ITEM} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
