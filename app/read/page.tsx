import { AnimatedTitle } from "@/components/title/AnimatedTitle";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { BookCard } from "@/components/ui/BookCard";
import { getReads } from "@/lib/content";

export default function ReadPage() {
  const items = getReads();

  return (
    <div className="flex flex-col items-center gap-12 text-center w-full">
      <AnimatedSection index={0}>
        <AnimatedTitle target="Marco's recent reads." />
      </AnimatedSection>

      <AnimatedSection index={1}>
        <div className="flex flex-col gap-4 w-full">
          {items.map((item) => (
            <BookCard key={item.id} item={item} />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
