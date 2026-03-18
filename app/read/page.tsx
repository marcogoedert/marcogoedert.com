import type { Metadata } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export const metadata: Metadata = {
  title: "Reads",
  description: "Books Marco has been reading lately.",
};
import { BookCard } from "@/components/ui/BookCard";
import { getReads } from "@/lib/content";

export default function ReadPage() {
  const items = getReads();

  return (
    <div className="flex flex-col items-center gap-12 text-center w-full">
      <AnimatedSection index={0}>
        <div className="flex flex-col gap-4 w-full">
          {items.map((item) => (
            <BookCard key={item.id} item={item} />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
