"use client";

import Image from "next/image";
import { useRef, useCallback } from "react";
import type { IMediaItem } from "@/lib/schemas";

interface CardProps {
  item: IMediaItem;
  aspectRatio: "1/1" | "2/3";
}

export function Card({ item, aspectRatio }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", (((e.clientX - rect.left) / rect.width) * 100).toFixed(0) + "%");
    card.style.setProperty("--mouse-y", (((e.clientY - rect.top) / rect.height) * 100).toFixed(0) + "%");
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", (((e.clientX - rect.left) / rect.width) * 100).toFixed(0) + "%");
    card.style.setProperty("--mouse-y", (((e.clientY - rect.top) / rect.height) * 100).toFixed(0) + "%");
  }, []);

  const paddingTop = aspectRatio === "1/1" ? "100%" : "150%";

  return (
    <div
      ref={cardRef}
      className="relative rounded-sm overflow-hidden bg-surface cursor-default spotlight-card"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      {/* Cover image */}
      <div className="relative w-full overflow-hidden bg-surface" style={{ paddingTop }}>
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          className="object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </div>

      {/* Card body */}
      <div className="p-3">
        <p className="text-foreground text-sm font-medium truncate">
          {item.title}
        </p>
        <p className="font-mono text-xs text-muted uppercase tracking-wider truncate mt-1">
          {item.creator}
        </p>
        {item.note && (
          <p className="text-muted text-xs mt-2 line-clamp-2">{item.note}</p>
        )}
      </div>
    </div>
  );
}
