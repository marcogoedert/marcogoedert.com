import { AnimatedTitle } from "@/components/title/AnimatedTitle";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import { Card } from "@/components/ui/Card";
import { getListens } from "@/lib/content";

export default function HearPage() {
  const items = getListens();

  return (
    <div className="flex flex-col gap-12">
      <AnimatedSection index={0}>
        <AnimatedTitle target="Marco's current songs on repeat." />
      </AnimatedSection>

      <AnimatedSection index={1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item) => (
            <Card key={item.id} item={item} aspectRatio="1/1" />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
