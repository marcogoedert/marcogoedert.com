import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

vi.mock("@/hooks/useColorScheme", () => ({
  useColorScheme: () => ({ colorScheme: "dark", toggleColorScheme: vi.fn() }),
}));

import { TopNav } from "./TopNav";

describe("TopNav", () => {
  it("renders About and Contact links", () => {
    render(<TopNav />);
    expect(screen.getByRole("link", { name: /about/i })).toBeDefined();
    expect(screen.getByRole("link", { name: /contact/i })).toBeDefined();
  });

  it("About link points to /about", () => {
    render(<TopNav />);
    const link = screen.getByRole("link", { name: /about/i }) as HTMLAnchorElement;
    expect(link.href).toContain("/about");
  });

  it("renders the theme toggle button", () => {
    render(<TopNav />);
    const toggle = screen.getByRole("button", { name: /switch to/i });
    expect(toggle).toBeDefined();
  });
});
