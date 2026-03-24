import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { WorkExperienceList } from "./WorkExperienceList";
import type { IExperience } from "@/lib/schemas";

const EXPERIENCES: IExperience[] = [
  {
    company: "TELUS Digital",
    role: "Software Engineer",
    startDate: "2022-01",
    endDate: null,
  },
  {
    company: "Acme Corp",
    role: "Junior Developer",
    startDate: "2020-03",
    endDate: "2021-12",
  },
];

describe("WorkExperienceList", () => {
  it("renders each company name", () => {
    render(<WorkExperienceList experiences={EXPERIENCES} />);
    expect(screen.getByText("TELUS Digital")).toBeDefined();
    expect(screen.getByText("Acme Corp")).toBeDefined();
  });

  it("renders each role", () => {
    render(<WorkExperienceList experiences={EXPERIENCES} />);
    expect(screen.getByText("Software Engineer")).toBeDefined();
    expect(screen.getByText("Junior Developer")).toBeDefined();
  });

  it("renders null endDate as 'Present'", () => {
    render(<WorkExperienceList experiences={EXPERIENCES} />);
    expect(screen.getByText(/present/i)).toBeDefined();
  });

  it("formats dates as MMM YYYY", () => {
    render(<WorkExperienceList experiences={EXPERIENCES} />);
    expect(screen.getByText(/jan 2022/i)).toBeDefined();
  });
});
