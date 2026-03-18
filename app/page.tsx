import { AnimatedTitle } from "@/components/title/AnimatedTitle";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <AnimatedSection index={0}>
        <AnimatedTitle target="Marco Goedert" />
      </AnimatedSection>
      <AnimatedSection index={1}>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
          Software Engineer
        </p>
      </AnimatedSection>
    </div>
  );
}
