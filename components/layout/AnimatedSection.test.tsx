import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AnimatedSection } from "./AnimatedSection";

describe("AnimatedSection", () => {
  it("renders children", () => {
    render(<AnimatedSection index={0}>Hello</AnimatedSection>);
    expect(screen.getByText("Hello")).toBeDefined();
  });

  it("accepts an index prop without error", () => {
    const { container } = render(
      <AnimatedSection index={3}>Content</AnimatedSection>
    );
    expect(container.firstChild).toBeDefined();
  });
});
