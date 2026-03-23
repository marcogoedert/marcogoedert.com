import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContactRow } from "./ContactRow";

describe("ContactRow", () => {
  it("renders the label", () => {
    render(<ContactRow label="Email" value="hello@example.com" href="mailto:hello@example.com" />);
    expect(screen.getByText("Email")).toBeDefined();
  });

  it("renders the value as a link", () => {
    render(<ContactRow label="Email" value="hello@example.com" href="mailto:hello@example.com" />);
    const link = screen.getByRole("link");
    expect((link as HTMLAnchorElement).href).toContain("mailto:hello@example.com");
  });

  it("renders the display value", () => {
    render(<ContactRow label="GitHub" value="marcogoedert" href="https://github.com/marcogoedert" />);
    expect(screen.getByText("marcogoedert")).toBeDefined();
  });
});
