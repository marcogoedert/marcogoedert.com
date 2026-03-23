"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSpotlight } from "@/hooks/useSpotlight";
import type { IMediaItem } from "@/lib/schemas";

interface CardProps {
  item: IMediaItem;
  aspectRatio: "1/1" | "2/3";
}

export function Card({ item, aspectRatio }: CardProps) {
  const spotlight = useSpotlight();
  const [imgError, setImgError] = useState(false);
  const imgHeight = aspectRatio === "2/3" ? 750 : 500;

  const inner = (
    <div
      {...spotlight}
      className="relative rounded-sm overflow-hidden bg-surface cursor-default spotlight-card w-full"
      style={{ "--mouse-x": "50%", "--mouse-y": "50%" } as React.CSSProperties}
    >
      {/* Cover image */}
      <div className="overflow-hidden w-full bg-surface" style={{ aspectRatio }}>
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-[10px] text-muted uppercase tracking-widest">No image</span>
          </div>
        ) : (
          <Image
            src={item.coverImage}
            alt={item.title}
            width={500}
            height={imgHeight}
            className="object-cover w-full h-full"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Card body */}
      <div className="p-3">
        {item.albumName ? (
          <>
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-foreground text-sm font-semibold truncate">{item.title}</p>
              {item.duration && (
                <p className="font-mono text-xs text-muted shrink-0">{item.duration}</p>
              )}
            </div>
            <p className="text-foreground text-xs text-center truncate mt-1">{item.creator}</p>
            {item.albumName !== item.title && (
              <p className="text-muted text-xs text-center truncate">{item.albumName}</p>
            )}
          </>
        ) : (
          <>
            <p className="text-foreground text-sm font-medium truncate">{item.title}</p>
            <p className="font-mono text-xs text-muted uppercase tracking-wider truncate mt-1">{item.creator}</p>
          </>
        )}
        {item.note && (
          <p className="text-muted text-xs mt-2 line-clamp-2">{item.note}</p>
        )}
      </div>
    </div>
  );

  return item.url ? (
    <Link href={item.url} target="_blank" rel="noopener noreferrer" className="block">
      {inner}
    </Link>
  ) : inner;
}
