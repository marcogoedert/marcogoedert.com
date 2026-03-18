import { AnimatedTitle } from "@/components/title/AnimatedTitle";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { WorkExperienceList } from "@/components/sections/WorkExperienceList";
import { getExperiences } from "@/lib/content";

export default function AboutPage() {
  const experiences = getExperiences();

  return (
    <div className="flex flex-col items-center gap-12 text-center w-full">
      <AnimatedSection index={0}>
        <AnimatedTitle target="Marco's work and projects." />
      </AnimatedSection>

      <AnimatedSection index={1}>
        <p className="text-muted leading-relaxed max-w-prose">
          Software engineer with experience designing, building, and evolving
          production systems across frontend, backend, and infrastructure layers.
          Currently at TELUS Digital, building the AQM platform with React,
          Next.js, and TypeScript.
        </p>
      </AnimatedSection>

      <AnimatedSection index={2}>
        <WorkExperienceList experiences={experiences} />
      </AnimatedSection>
    </div>
  );
}
