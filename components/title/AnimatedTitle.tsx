"use client";

import { useTitleMorph } from "@/hooks/useTitleMorph";

interface AnimatedTitleProps {
  target: string;
  disabled?: boolean;
}

export function AnimatedTitle({ target, disabled }: AnimatedTitleProps) {
  const displayed = useTitleMorph(target, { disabled });

  return (
    <h1
      aria-live="polite"
      aria-label={target}
      className="font-fraunces italic text-foreground leading-none text-[clamp(3rem,8vw,6rem)]"
    >
      <span aria-hidden="true">{displayed}</span>
      <span aria-hidden="true" className="cursor-blink">
        _
      </span>
    </h1>
  );
}
