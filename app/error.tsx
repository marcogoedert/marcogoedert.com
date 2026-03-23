"use client";

export default function Error({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 py-32">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">500</p>
      <h1 className="font-fraunces italic text-4xl text-foreground">
        Something went wrong.
      </h1>
      <button
        onClick={reset}
        className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors w-fit"
      >
        Try again
      </button>
    </div>
  );
}
