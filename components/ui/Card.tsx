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

  const handleMouseEnter = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--img-scale", "1.05");
    card.style.transition = "transform 300ms ease";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--img-scale", "1");
    card.style.setProperty("--img-dx", "0px");
    card.style.setProperty("--img-dy", "0px");
    card.style.setProperty("--mouse-x", "50%");
    card.style.setProperty("--mouse-y", "50%");
    card.style.transition = "transform 300ms ease";
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      card.style.transition = "none";

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Spotlight position as %
      const pctX = ((x / rect.width) * 100).toFixed(0) + "%";
      const pctY = ((y / rect.height) * 100).toFixed(0) + "%";
      card.style.setProperty("--mouse-x", pctX);
      card.style.setProperty("--mouse-y", pctY);

      // Parallax offset ±6px
      const dx = ((x / rect.width - 0.5) * 12).toFixed(1) + "px";
      const dy = ((y / rect.height - 0.5) * 12).toFixed(1) + "px";
      card.style.setProperty("--img-dx", dx);
      card.style.setProperty("--img-dy", dy);
    },
    []
  );

  const paddingTop = aspectRatio === "1/1" ? "100%" : "150%";

  return (
    <div
      ref={cardRef}
      className="relative rounded-sm overflow-hidden bg-surface cursor-default spotlight-card"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--img-scale": "1",
          "--img-dx": "0px",
          "--img-dy": "0px",
        } as React.CSSProperties
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Cover image */}
      <div className="relative w-full overflow-hidden bg-surface" style={{ paddingTop }}>
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          className="object-cover"
          style={{
            transform:
              "scale(var(--img-scale)) translate(var(--img-dx), var(--img-dy))",
          }}
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
