import Link from "next/link";

const ROUTES = [
  { href: "/hear", label: "hear" },
  { href: "/watch", label: "watch" },
  { href: "/read", label: "read" },
] as const;

export function CornerNav() {
  return (
    <nav aria-label="Section navigation">
      {/* Desktop: horizontal */}
      <div className="hidden md:flex gap-4">
        {ROUTES.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Mobile: vertical rotated, fixed to right edge */}
      <div
        className="flex md:hidden fixed right-0 top-1/2 -translate-y-1/2 flex-col gap-4 pr-2"
        style={{ writingMode: "vertical-rl" }}
      >
        {ROUTES.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="font-mono text-[9px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
