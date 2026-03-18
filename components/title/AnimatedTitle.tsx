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
      className="font-fraunces italic text-foreground leading-none text-5xl md:text-7xl min-h-[3rem] md:min-h-[4.5rem]"
    >
      <Link href="/" className="hover:underline underline-offset-4" aria-hidden="true">
        {linkPart}
      </Link>
      <span aria-hidden="true">{tailPart}</span>
      <span aria-hidden="true" className="cursor-blink">
        _
      </span>
    </h1>
  );
}
