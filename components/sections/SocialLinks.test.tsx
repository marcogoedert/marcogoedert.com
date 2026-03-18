import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SocialLinks } from "./SocialLinks";

describe("SocialLinks", () => {
  it("renders GitHub link", () => {
    render(<SocialLinks />);
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toBeDefined();
  });

  it("renders LinkedIn link", () => {
    render(<SocialLinks />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeDefined();
  });

  it("all links open in a new tab", () => {
    render(<SocialLinks />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect((link as HTMLAnchorElement).target).toBe("_blank");
    });
  });
});
