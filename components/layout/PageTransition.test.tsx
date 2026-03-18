import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { PageTransition } from "./PageTransition";

describe("PageTransition", () => {
  it("renders children", () => {
    render(<PageTransition>Hello</PageTransition>);
    expect(screen.getByText("Hello")).toBeDefined();
  });
});
