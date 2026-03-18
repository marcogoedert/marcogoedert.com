import type { Metadata } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export const metadata: Metadata = {
  title: "Hears",
  description: "Albums and songs Marco has been listening to lately.",
};
import { Card } from "@/components/ui/Card";
import { getListens } from "@/lib/content";

export default function HearPage() {
  const items = getListens();

  return (
    <div className="flex flex-col gap-12 w-full">
      <AnimatedSection index={0}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <Card key={item.id} item={item} aspectRatio="1/1" />
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}
