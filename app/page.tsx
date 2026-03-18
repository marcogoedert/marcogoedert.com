import { AnimatedSection } from "@/components/layout/AnimatedSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <AnimatedSection index={0}>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
          Software Engineer
        </p>
      </AnimatedSection>
    </div>
  );
}
