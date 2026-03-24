// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { run } from "../media"

beforeEach(() => {
  vi.spyOn(process, "exit").mockImplementation((code) => {
    throw new Error(`process.exit(${code})`)
  })
  vi.spyOn(console, "error").mockImplementation(() => {})
  vi.spyOn(console, "log").mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("run: argument parsing", () => {
  it("prints usage and exits 1 on unknown subcommand", async () => {
    await expect(run(["unknowncmd"])).rejects.toThrow("process.exit(1)")
    expect(process.exit).toHaveBeenCalledWith(1)
  })

  it("prints usage and exits 1 when no subcommand given", async () => {
    await expect(run([])).rejects.toThrow("process.exit(1)")
    expect(process.exit).toHaveBeenCalledWith(1)
  })

  it("prints usage and exits 1 on 'edit' without query", async () => {
    await expect(run(["edit"])).rejects.toThrow("process.exit(1)")
    expect(process.exit).toHaveBeenCalledWith(1)
  })

  it("prints usage and exits 1 on 'remove' without query", async () => {
    await expect(run(["remove"])).rejects.toThrow("process.exit(1)")
    expect(process.exit).toHaveBeenCalledWith(1)
  })
})
