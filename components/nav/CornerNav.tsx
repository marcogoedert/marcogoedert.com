"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  { href: "/hear", label: "hear" },
  { href: "/watch", label: "watch" },
  { href: "/read", label: "read" },
] as const;

export function CornerNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Section navigation">
      {/* Desktop: vertical column at bottom-right */}
      <div className="hidden md:flex flex-col items-end space-y-1 self-end ml-auto p-0 md:pt-4">
        {ROUTES.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`font-mono text-[11px] uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-foreground underline underline-offset-2"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Mobile: rotated strip on right edge, bottom-aligned */}
      <div
        className="flex md:hidden fixed right-0 bottom-6 flex-row gap-3 pr-1 z-10"
        style={{ writingMode: "vertical-rl" }}
      >
        {ROUTES.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`font-mono text-[9px] uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-foreground underline underline-offset-2"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
