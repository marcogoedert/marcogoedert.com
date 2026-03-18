import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CornerNav } from "./CornerNav";

describe("CornerNav", () => {
  it("renders hear, watch, and read links", () => {
    render(<CornerNav />);
    const links = screen.getAllByRole("link");
    const labels = links.map(l => l.textContent);
    expect(labels).toContain("hear");
    expect(labels).toContain("watch");
    expect(labels).toContain("read");
  });

  it("hear link points to /hear", () => {
    render(<CornerNav />);
    const links = screen.getAllByRole("link", { name: /hear/i });
    expect(links[0].href).toContain("/hear");
  });
});
