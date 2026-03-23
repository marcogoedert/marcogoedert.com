"use client";

import Link from "next/link";
import { useTitleMorph } from "@/hooks/useTitleMorph";

interface AnimatedTitleProps {
  target: string;
  disabled?: boolean;
}

const LINK_LENGTH = "Marco".length;

export function AnimatedTitle({ target, disabled }: AnimatedTitleProps) {
  const displayed = useTitleMorph(target, { disabled });
  const linkPart = displayed.slice(0, LINK_LENGTH);
  const tailPart = displayed.slice(LINK_LENGTH);

  return (
    <h1
      aria-live="polite"
      aria-label={target}
      className="font-fraunces italic text-foreground leading-tight text-5xl md:text-7xl min-h-[11rem] sm:min-h-[7rem] md:min-h-[5rem]"
    >
      <Link href="/" aria-label="Home" className="hover:underline underline-offset-4">
        <span aria-hidden="true">{linkPart}</span>
      </Link>
      <span aria-hidden="true">{tailPart}</span>
      <span aria-hidden="true" className="cursor-blink">
        _
      </span>
    </h1>
  );
}
