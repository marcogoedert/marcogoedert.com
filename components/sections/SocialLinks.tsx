import { SOCIAL_LINKS } from "@/constants/links";

export function SocialLinks() {
  return (
    <div className="flex gap-6">
      {Object.values(SOCIAL_LINKS).map(({ label, url }) => (
        <a
          key={label}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors"
        >
          {label}
        </a>
      ))}
    </div>
  );
}
