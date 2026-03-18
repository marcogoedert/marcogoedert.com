interface ContactRowProps {
  label: string;
  value: string;
  href: string;
}

export function ContactRow({ label, value, href }: ContactRowProps) {
  return (
    <div className="flex items-baseline gap-6 py-4 border-b border-border last:border-0">
      <span className="font-mono text-xs uppercase tracking-widest text-muted w-24 shrink-0">
        {label}
      </span>
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="text-foreground hover:text-muted transition-colors"
        style={{ transform: "translateX(0)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateX(2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateX(0)";
        }}
      >
        {value}
      </a>
    </div>
  );
}
