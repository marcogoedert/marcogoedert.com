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
    <div className="min-h-dvh bg-background text-foreground p-6 sm:p-8 flex flex-col relative">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:border focus:border-border"
      >
        Skip to content
      </a>

      {/* Top-left: year */}
      <div className="fixed top-6 left-6 z-10">
        <span className="[writing-mode:vertical-rl] rotate-180 lg:transform-none lg:[writing-mode:horizontal-tb] font-mono text-[11px] text-foreground/50">
          {year}
        </span>
      </div>

      {/* Top-right: About · Contact · theme toggle */}
      <div className="fixed top-6 right-6 z-10">
        <TopNav />
      </div>

      {/* Main content */}
      <main
        id="main-content"
        className="flex-grow flex flex-col items-center w-full pt-24 md:pt-32 pb-16 gap-12 px-6 md:px-8"
      >
        {/* Title: full page width */}
        <SiteTitle />
        {/* Content: constrained */}
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto gap-12">
          {children}
        </div>
      </main>

      {/* Sticky footer: editorial note left, section nav right */}
      <footer className="flex justify-between sticky bottom-8 h-0 z-10 font-mono">
        <div className="hidden lg:block w-1/6 self-end">
          <p className="font-mono text-xs italic text-foreground/40">
            {EDITORIAL_NOTE}
          </p>
        </div>
        <div className="ml-auto self-end">
          <CornerNav />
        </div>
      </footer>
    </div>
  );
}
