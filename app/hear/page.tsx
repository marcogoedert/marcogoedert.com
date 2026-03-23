import type { Metadata } from "next";
import { AnimatedSection } from "@/components/layout/AnimatedSection";

export const metadata: Metadata = {
  title: "WHAT I HEAR",
  description: "Albums and songs Marco has been listening to lately.",
};
import { Card } from "@/components/ui/Card";
import { getListens } from "@/lib/content";

export default function HearPage() {
  const items = getListens();

  return (
    <div className="flex flex-col gap-12 w-full">
      <AnimatedSection index={0} className="w-full">
        {items.length === 0 ? (
          <p className="font-mono text-sm text-muted">Nothing here yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full [&>*]:min-w-0">
            {items.map((item) => (
              <Card key={item.id} item={item} aspectRatio="1/1" />
            ))}
          </div>
        )}
      </AnimatedSection>
    </div>
  );
}
