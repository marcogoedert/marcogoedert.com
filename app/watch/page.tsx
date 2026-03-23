import type { Metadata } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export const metadata: Metadata = {
  title: "Watches",
  description: "Movies and shows Marco has been watching lately.",
};
import { Card } from "@/components/ui/Card";
import { getWatches } from "@/lib/content";

export default function WatchPage() {
  const items = getWatches();

  return (
    <div className="flex flex-col gap-12 w-full">
      <AnimatedSection index={0} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 w-full">
          {items.map((item) => (
            <Card key={item.id} item={item} aspectRatio="2/3" />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
