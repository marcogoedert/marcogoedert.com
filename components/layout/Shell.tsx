import { TopNav } from "@/components/nav/TopNav";
import { CornerNav } from "@/components/nav/CornerNav";
import { SiteTitle } from "@/components/title/SiteTitle";
import { EDITORIAL_NOTE } from "@/constants/copy";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-dvh relative">
      {/* Top-left: year */}
      <div className="fixed top-6 left-6 z-10">
        <span className="font-mono text-[11px] text-foreground/50">
          {year}
        </span>
      </div>

      {/* Top-right: About · Contact · theme toggle */}
      <div className="fixed top-6 right-6 z-10">
        <TopNav />
      </div>

      {/* Bottom-left: editorial note (desktop only) */}
      <div className="hidden md:block fixed bottom-6 left-6 z-10">
        <span className="font-mono text-[11px] text-foreground/50">
          {EDITORIAL_NOTE}
        </span>
      </div>

      {/* Bottom-right / right-edge: section nav */}
      <div className="fixed bottom-6 right-6 z-10">
        <CornerNav />
      </div>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center w-full pt-24 md:pt-32 pb-16 gap-12 px-6 sm:px-8">
        {/* Title: full page width */}
        <SiteTitle />
        {/* Content: constrained */}
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto gap-12">
          {children}
        </div>
      </main>
    </div>
  );
}
