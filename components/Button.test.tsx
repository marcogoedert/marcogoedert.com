import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });

  it("applies secondary variant class by default", () => {
    const { container } = render(<Button>Test</Button>);
    expect(container.firstChild).toHaveClass(
      "hover:shadow-[0_2px_40px_rgba(255,255,255,0.5)]"
    );
  });

  it("passes through native button props", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);
  });
});
