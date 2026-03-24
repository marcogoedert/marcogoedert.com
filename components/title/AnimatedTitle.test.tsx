import { render, screen } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

import { AnimatedTitle } from "./AnimatedTitle";

describe("AnimatedTitle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders with aria-live polite", () => {
    const { container } = render(<AnimatedTitle target="Marco Goedert" />);
    const h1 = container.querySelector("h1");
    expect(h1?.getAttribute("aria-live")).toBe("polite");
  });

  it("renders with aria-label equal to full target", () => {
    render(<AnimatedTitle target="Marco's work and projects." />);
    const h1 = screen.getByRole("heading");
    expect(h1.getAttribute("aria-label")).toBe("Marco's work and projects.");
  });

  it("renders a cursor span with aria-hidden", () => {
    const { container } = render(<AnimatedTitle target="Marco Goedert" />);
    const spans = container.querySelectorAll("span[aria-hidden='true']");
    // Three spans: link text, tail text, cursor
    expect(spans.length).toBe(3);
    // Last span is the cursor
    expect(spans[spans.length - 1].textContent).toBe("_");
  });

  it("shows full title immediately when disabled", () => {
    const { container } = render(
      <AnimatedTitle target="Marco Goedert" disabled />,
    );
    const link = container.querySelector("a");
    const tailSpan = container.querySelectorAll("span[aria-hidden='true']")[1];
    expect(link?.textContent).toBe("Marco");
    expect(tailSpan.textContent).toBe(" Goedert");
  });
});
