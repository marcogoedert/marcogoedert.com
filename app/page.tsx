import type { Metadata } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { ParticleCanvas } from "@/components/canvas/ParticleCanvas";

export const metadata: Metadata = {
  title: "Marco Goedert",
};

export default function Home() {
  return (
    <>
      <ParticleCanvas />

      <div className="flex flex-col items-center gap-8 text-center">
        <AnimatedSection index={0}>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-muted">
            Software Engineer
          </p>
        </AnimatedSection>
      </div>

      {/* Bottom-left play button */}
      <button
        className="fixed bottom-12 left-12 w-[52px] h-[52px] rounded-full border border-border flex items-center justify-center bg-transparent hover:bg-foreground transition-all duration-500 z-20 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        aria-label="Play"
      >
        <svg
          className="w-[14px] h-[14px] text-foreground group-hover:text-background transition-colors duration-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 20V4l14 16V4" />
        </svg>
      </button>
    </>
  );
}
