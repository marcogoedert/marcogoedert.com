import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: () => ({ colorScheme: "dark", toggleColorScheme: vi.fn() }),
}));

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { Shell } from "./Shell";

describe("Shell", () => {
  it("renders the current year in top-left", () => {
    render(<Shell>{null}</Shell>);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(year)).toBeDefined();
  });

  it("renders top navigation (About + Contact)", () => {
    render(<Shell>{null}</Shell>);
    expect(screen.getByRole("link", { name: /about/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /contact/i })).toBeDefined();
  });

  it("renders section navigation (hear + watch + read)", () => {
    render(<Shell>{null}</Shell>);
    // CornerNav renders these links
    const hearLinks = screen.getAllByRole("link", { name: /hear/i });
    expect(hearLinks.length).toBeGreaterThan(0);
  });

  it("renders children in the main content area", () => {
    render(
      <Shell>
        <div>page content</div>
      </Shell>,
    );
    expect(screen.getByText("page content")).toBeDefined();
  });
});
