import type { Metadata } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { WorkExperienceList } from "@/components/sections/WorkExperienceList";
import { getExperiences } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer obsessed with the gap between 'it works' and 'it's good.' Full stack, based in Porto Alegre, Brazil.",
};

export default function AboutPage() {
  const experiences = getExperiences();

  return (
    <div className="flex flex-col items-center gap-12 text-center w-full">
      <AnimatedSection index={0}>
        <p className="text-muted leading-relaxed max-w-prose font-mono">
          Software engineer obsessed with the gap between &ldquo;it works&rdquo; and &ldquo;it&apos;s good.&rdquo;
          I design, build, and evolve production systems across the full stack.
          Based in Porto Alegre, Brazil.
        </p>
      </AnimatedSection>

      <AnimatedSection index={1} className="w-full">
        <WorkExperienceList experiences={experiences} />
      </AnimatedSection>
    </div>
  );
}
