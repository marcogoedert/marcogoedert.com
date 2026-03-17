import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

// Mock useColorScheme — we're testing the component UI, not the hook
vi.mock("../hooks/useColorScheme", () => ({
  useColorScheme: vi.fn(),
}));

import { useColorScheme } from "../hooks/useColorScheme";

const mockUseColorScheme = vi.mocked(useColorScheme);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("ThemeToggle", () => {
  it("renders a button", () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: "light",
      toggleColorScheme: vi.fn(),
    });
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeDefined();
  });

  it("has accessible label indicating current scheme", () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: "light",
      toggleColorScheme: vi.fn(),
    });
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /switch to dark/i })
    ).toBeDefined();
  });

  it("shows switch to light label when in dark mode", () => {
    mockUseColorScheme.mockReturnValue({
      colorScheme: "dark",
      toggleColorScheme: vi.fn(),
    });
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /switch to light/i })
    ).toBeDefined();
  });

  it("calls toggleColorScheme when clicked", async () => {
    const toggle = vi.fn();
    mockUseColorScheme.mockReturnValue({
      colorScheme: "light",
      toggleColorScheme: toggle,
    });
    render(<ThemeToggle />);
    await userEvent.click(screen.getByRole("button"));
    expect(toggle).toHaveBeenCalledOnce();
  });
});
