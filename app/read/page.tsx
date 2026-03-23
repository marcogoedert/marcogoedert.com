import type { Metadata } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export const metadata: Metadata = {
  title: "WHAT I READ",
  description: "Books Marco has been reading lately.",
};
import { BookCard } from "@/components/ui/BookCard";
import { getReads } from "@/lib/content";

export default function ReadPage() {
  const items = getReads();

  return (
    <div className="flex flex-col gap-12 w-full">
      <AnimatedSection index={0} className="w-full">
        {items.length === 0 ? (
          <p className="font-mono text-sm text-muted">Nothing here yet.</p>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            {items.map((item) => (
              <BookCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
