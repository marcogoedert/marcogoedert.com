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
      <div className="hidden md:flex flex-col items-end space-y-1">
        {ROUTES.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`font-mono text-[11px] uppercase tracking-widest transition-colors py-1 ${
                isActive
                  ? "text-foreground underline underline-offset-2"
                  : "text-foreground hover:text-foreground/70"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      {/* Mobile: vertical column at bottom-right, same pattern as desktop */}
      <div className="flex md:hidden fixed right-4 bottom-6 flex-col items-end gap-1 z-10">
        {ROUTES.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`font-mono text-[11px] uppercase tracking-widest transition-colors py-1 drop-shadow-md ${
                isActive
                  ? "text-foreground underline underline-offset-2"
                  : "text-foreground hover:text-foreground/70"
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
