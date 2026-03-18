"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const ROUTES = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Top navigation"
      className="flex flex-col items-end gap-1"
    >
      {ROUTES.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`font-mono text-[11px] uppercase tracking-widest transition-colors py-1 ${
              isActive
                ? "text-foreground underline underline-offset-2"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {label}
          </Link>
        );
      })}
      <ThemeToggle />
    </nav>
  );
}
