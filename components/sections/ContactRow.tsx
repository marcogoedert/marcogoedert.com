interface ContactRowProps {
  label: string;
  value: string;
  href: string;
}

export function ContactRow({ label, value, href }: ContactRowProps) {
  const isExternal = !href.startsWith("mailto:");
  return (
    <div className="flex items-baseline gap-6 py-4 border-b border-border last:border-0">
      <span className="font-mono text-xs uppercase tracking-widest text-muted w-24 shrink-0">
        {label}
      </span>
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label={isExternal ? `${value} (opens in new tab)` : undefined}
        className="text-foreground hover:text-muted hover:translate-x-0.5 focus-visible:translate-x-0.5 transition-all"
      >
        {value}
      </a>
    </div>
  );
}
