import Link from "next/link";

const ROUTES = [
  { href: "/hear", label: "hear" },
  { href: "/watch", label: "watch" },
  { href: "/read", label: "read" },
] as const;

export function CornerNav() {
  return (
    <nav aria-label="Section navigation" className="flex flex-col items-end gap-1">
      {ROUTES.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
