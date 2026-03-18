import { AnimatedTitle } from "@/components/title/AnimatedTitle";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { WorkExperienceList } from "@/components/sections/WorkExperienceList";
import { SocialLinks } from "@/components/sections/SocialLinks";
import { getExperiences } from "@/lib/content";

export default function AboutPage() {
  const experiences = getExperiences();

  return (
    <div className="flex flex-col gap-12">
      <AnimatedSection index={0}>
        <AnimatedTitle target="Marco's work and projects." />
      </AnimatedSection>

      <AnimatedSection index={1}>
        <p className="text-muted leading-relaxed max-w-prose">
          Software engineer focused on building fast, reliable web products.
          Passionate about clean architecture and great developer experience.
          Currently at TELUS Digital.
        </p>
      </AnimatedSection>

      <AnimatedSection index={2}>
        <SocialLinks />
      </AnimatedSection>

      <AnimatedSection index={3}>
        <WorkExperienceList experiences={experiences} />
      </AnimatedSection>
    </div>
  );
}
