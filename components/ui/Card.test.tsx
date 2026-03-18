import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card } from "./Card";
import type { IMediaItem } from "@/lib/schemas";

const ITEM: IMediaItem = {
  id: "test-item",
  title: "Test Album",
  creator: "Test Artist",
  coverImage: "/images/placeholder.jpg",
  note: "A great album",
};

describe("Card", () => {
  it("renders the title", () => {
    render(<Card item={ITEM} aspectRatio="1/1" />);
    expect(screen.getByText("Test Album")).toBeDefined();
  });

  it("renders the creator", () => {
    render(<Card item={ITEM} aspectRatio="1/1" />);
    expect(screen.getByText("Test Artist")).toBeDefined();
  });

  it("renders the note when provided", () => {
    render(<Card item={ITEM} aspectRatio="1/1" />);
    expect(screen.getByText("A great album")).toBeDefined();
  });

  it("does not render note section when note is null", () => {
    render(<Card item={{ ...ITEM, note: null }} aspectRatio="1/1" />);
    expect(screen.queryByText("A great album")).toBeNull();
  });

  it("updates --mouse-x and --mouse-y on mousemove", () => {
    const { container } = render(<Card item={ITEM} aspectRatio="1/1" />);
    const card = container.firstChild as HTMLElement;

    // Mock getBoundingClientRect
    card.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {},
    });

    fireEvent.mouseMove(card, { clientX: 100, clientY: 50 });

    expect(card.style.getPropertyValue("--mouse-x")).toBe("50%");
    expect(card.style.getPropertyValue("--mouse-y")).toBe("25%");
  });

  it("updates --mouse-x and --mouse-y on mouseenter", () => {
    const { container } = render(<Card item={ITEM} aspectRatio="1/1" />);
    const card = container.firstChild as HTMLElement;
    card.getBoundingClientRect = () => ({
      left: 0, top: 0, width: 200, height: 200,
      right: 200, bottom: 200, x: 0, y: 0, toJSON: () => {},
    });
    fireEvent.mouseEnter(card, { clientX: 50, clientY: 100 });
    expect(card.style.getPropertyValue("--mouse-x")).toBe("25%");
    expect(card.style.getPropertyValue("--mouse-y")).toBe("50%");
  });
});
