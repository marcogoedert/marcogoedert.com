import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export const metadata: Metadata = {
  title: "Marco Goedert",
  description: "Software engineer. Personal site.",
};

const SECTIONS = [
  { href: "/about", label: "About" },
  { href: "/hear", label: "Hear" },
  { href: "/watch", label: "Watch" },
  { href: "/read", label: "Read" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <AnimatedSection index={0}>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
          Software Engineer
        </p>
      </AnimatedSection>

      <AnimatedSection index={1}>
        <p className="font-mono text-sm text-muted leading-relaxed max-w-sm">
          Building things for the web.{" "}
          <Link
            href="/about"
            className="text-foreground underline underline-offset-2 hover:text-foreground/70 transition-colors"
          >
            More about me →
          </Link>
        </p>
      </AnimatedSection>

      <AnimatedSection index={2}>
        <nav
          aria-label="Site sections"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-widest text-muted mt-2"
        >
          {SECTIONS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-foreground transition-colors py-1"
            >
              {label}
            </Link>
          ))}
        </nav>
      </AnimatedSection>
    </div>
  );
}
