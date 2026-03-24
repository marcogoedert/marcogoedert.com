import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useColorScheme } from "./useColorScheme";

const mockMatchMedia = (prefersDark: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query === "(prefers-color-scheme: dark)" ? prefersDark : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
};

beforeEach(() => {
  document.cookie = "color-scheme=; max-age=0";
  document.documentElement.removeAttribute("data-color-scheme");
  mockMatchMedia(false);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useColorScheme", () => {
  it("defaults to light when system prefers light and no cookie", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useColorScheme());
    expect(result.current.colorScheme).toBe("light");
  });

  it("defaults to dark when system prefers dark and no cookie", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useColorScheme());
    expect(result.current.colorScheme).toBe("dark");
  });

  it("reads color scheme from cookie, overriding system preference", () => {
    document.cookie = "color-scheme=dark";
    mockMatchMedia(false); // system prefers light, cookie says dark
    const { result } = renderHook(() => useColorScheme());
    expect(result.current.colorScheme).toBe("dark");
  });

  it("sets data-color-scheme attribute on html element", () => {
    mockMatchMedia(true);
    renderHook(() => useColorScheme());
    expect(document.documentElement.getAttribute("data-color-scheme")).toBe(
      "dark",
    );
  });

  it("toggleColorScheme flips from light to dark", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useColorScheme());
    expect(result.current.colorScheme).toBe("light");
    act(() => result.current.toggleColorScheme());
    expect(result.current.colorScheme).toBe("dark");
  });

  it("toggleColorScheme flips from dark to light", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useColorScheme());
    expect(result.current.colorScheme).toBe("dark");
    act(() => result.current.toggleColorScheme());
    expect(result.current.colorScheme).toBe("light");
  });

  it("toggleColorScheme updates data-color-scheme attribute", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useColorScheme());
    act(() => result.current.toggleColorScheme());
    expect(document.documentElement.getAttribute("data-color-scheme")).toBe(
      "dark",
    );
  });

  it("toggleColorScheme writes cookie", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useColorScheme());
    act(() => result.current.toggleColorScheme());
    expect(document.cookie).toContain("color-scheme=dark");
  });
});
