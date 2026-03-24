"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROUTES = [
  { href: "/hear", label: "what i hear." },
  { href: "/watch", label: "what i watch." },
  { href: "/read", label: "what i read." },
] as const;

export function CornerNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Section navigation">
      <ul className="p-0 flex flex-col space-y-1">
        {ROUTES.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`[writing-mode:vertical-rl] lg:[writing-mode:horizontal-tb] inline-block font-mono text-[11px] uppercase tracking-widest whitespace-nowrap transition-colors duration-200 py-1 ${
                  isActive
                    ? "text-foreground underline underline-offset-2 decoration-2"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
