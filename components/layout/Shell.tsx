import { TopNav } from "@/components/nav/TopNav";
import { CornerNav } from "@/components/nav/CornerNav";
import { EDITORIAL_NOTE } from "@/constants/copy";

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen relative">
      {/* Top-left: year */}
      <div className="fixed top-6 left-6 z-10">
        <span className="font-mono text-[11px] text-muted">
          {year}
        </span>
      </div>

      {/* Top-right: About · Contact · theme toggle */}
      <div className="fixed top-6 right-6 z-10">
        <TopNav />
      </div>

      {/* Bottom-left: editorial note (desktop only) */}
      <div className="hidden md:block fixed bottom-6 left-6 z-10">
        <span className="font-mono text-[11px] text-muted">
          {EDITORIAL_NOTE}
        </span>
      </div>

      {/* Bottom-right / right-edge: section nav */}
      <div className="fixed bottom-6 right-6 z-10 md:bottom-6 md:right-6">
        <CornerNav />
      </div>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-6 md:px-0 py-32 pl-6 pr-8 md:pr-0">
        {children}
      </main>
    </div>
  );
}
