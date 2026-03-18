"use client";

import Image from "next/image";
import { useRef, useCallback } from "react";
import type { IMediaItem } from "@/lib/schemas";

interface BookCardProps {
  item: IMediaItem;
}

export function BookCard({ item }: BookCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    cardRef.current?.style.setProperty("--img-scale", "1.03");
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--img-scale", "1");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const pctX = (((e.clientX - rect.left) / rect.width) * 100).toFixed(0) + "%";
    const pctY = (((e.clientY - rect.top) / rect.height) * 100).toFixed(0) + "%";
    card.style.setProperty("--mouse-x", pctX);
    card.style.setProperty("--mouse-y", pctY);
  }, []);

  return (
    <div
      ref={cardRef}
      className="flex flex-col sm:flex-row border border-border overflow-hidden bg-surface spotlight-card cursor-default"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--img-scale": "1",
        } as React.CSSProperties
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Cover image — mobile: centered on top; desktop: fixed width on left */}
      <div className="flex justify-center sm:block sm:flex-shrink-0 sm:w-48 pt-4 sm:pt-0">
        <div className="relative w-40 sm:w-full" style={{ aspectRatio: "2/3" }}>
          <Image
            src={item.coverImage}
            alt={item.title}
            fill
            className="object-cover"
            style={{ transform: "scale(var(--img-scale))", transition: "transform 300ms ease" }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center items-center text-center p-6 gap-3 flex-1">
        <div>
          <h2 className="font-fraunces italic text-foreground text-xl sm:text-2xl leading-snug">
            {item.title}
          </h2>
          <p className="font-mono text-xs text-muted mt-1">
            by {item.creator}
          </p>
        </div>

        {item.note && (
          <p className="font-mono text-xs text-muted leading-relaxed max-w-sm line-clamp-4">
            {item.note}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
          {item.publishedYear && (
            <span>Published <span className="text-foreground">{item.publishedYear}</span></span>
          )}
          {item.readDate && (
            <span>Read <span className="text-foreground">{item.readDate}</span></span>
          )}
          {item.rating && (
            <span>Rating <span className="text-foreground">★ {item.rating}/5</span></span>
          )}
        </div>
      </div>
    </div>
  );
}
