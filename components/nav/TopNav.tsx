import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export function TopNav() {
  return (
    <nav
      aria-label="Top navigation"
      className="flex flex-col items-end gap-1"
    >
      <Link
        href="/about"
        className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
      >
        About
      </Link>
      <Link
        href="/contact"
        className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-foreground transition-colors"
      >
        Contact
      </Link>
      <ThemeToggle />
    </nav>
  );
}
