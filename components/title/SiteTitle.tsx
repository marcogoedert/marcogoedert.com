"use client";

import { usePathname } from "next/navigation";
import { AnimatedTitle } from "@/components/title/AnimatedTitle";

const ROUTE_TITLES: Record<string, string> = {
  "/": "Marco Goedert",
  "/about": "Marco's work and projects.",
  "/read": "Marco's recent reads.",
  "/watch": "Marco's recent watches.",
  "/hear": "Marco's current songs on repeat.",
  "/contact": "Marco's contact information.",
};

export function SiteTitle() {
  const pathname = usePathname();
  const title = ROUTE_TITLES[pathname] ?? "Marco Goedert";
  return <AnimatedTitle target={title} />;
}
