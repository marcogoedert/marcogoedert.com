import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
        404
      </p>
      <h1 className="font-fraunces italic text-4xl text-foreground">
        Page not found.
      </h1>
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
      >
        ← Back home
      </Link>
    </div>
  );
}
