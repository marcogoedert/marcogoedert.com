import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AboutPage from "./page";

vi.mock("@/lib/content", () => ({
  getExperiences: () => [],
}));

vi.mock("@/components/layout/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/sections/WorkExperienceList", () => ({
  WorkExperienceList: () => <div />,
}));

describe("AboutPage", () => {
  it("renders a CV link pointing to /cv.pdf", () => {
    render(<AboutPage />);
    const link = screen.getByRole("link", { name: /cv/i }) as HTMLAnchorElement;
    expect(link.href).toContain("/cv.pdf");
  });

  it("CV link opens in a new tab", () => {
    render(<AboutPage />);
    const link = screen.getByRole("link", { name: /cv/i }) as HTMLAnchorElement;
    expect(link.target).toBe("_blank");
  });
});
