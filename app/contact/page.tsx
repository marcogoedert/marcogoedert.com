import { AnimatedTitle } from "@/components/title/AnimatedTitle";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { ContactRow } from "@/components/sections/ContactRow";
import { CONTACT_LINKS } from "@/constants/links";

export default function ContactPage() {
  return (
    <div className="flex flex-col gap-12">
      <AnimatedSection index={0}>
        <AnimatedTitle target="Marco's contact information." />
      </AnimatedSection>

      <AnimatedSection index={1}>
        <p className="font-mono text-sm text-muted">Feel free to reach out.</p>
      </AnimatedSection>

      <AnimatedSection index={2}>
        <div className="flex flex-col">
          <ContactRow
            label={CONTACT_LINKS.email.label}
            value={CONTACT_LINKS.email.value}
            href={CONTACT_LINKS.email.url}
          />
          <ContactRow
            label={CONTACT_LINKS.x.label}
            value={CONTACT_LINKS.x.handle}
            href={CONTACT_LINKS.x.url}
          />
          <ContactRow
            label={CONTACT_LINKS.bluesky.label}
            value={CONTACT_LINKS.bluesky.handle}
            href={CONTACT_LINKS.bluesky.url}
          />
          <ContactRow
            label={CONTACT_LINKS.linkedin.label}
            value={CONTACT_LINKS.linkedin.handle}
            href={CONTACT_LINKS.linkedin.url}
          />
          <ContactRow
            label={CONTACT_LINKS.github.label}
            value={CONTACT_LINKS.github.handle}
            href={CONTACT_LINKS.github.url}
          />
        </div>
      </AnimatedSection>
    </div>
  );
}
