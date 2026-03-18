import { useEffect, useRef, useState } from "react";

const PIVOT = "Marco";
const DELETE_MS = 40;
const TYPE_MS = 60;
const INITIAL_DELAY_MS = 300;

interface Options {
  disabled?: boolean;
}

export function useTitleMorph(target: string, options: Options = {}): string {
  const [text, setText] = useState(options.disabled ? target : "");
  const textRef = useRef(options.disabled ? target : "");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirst = useRef(!options.disabled);

  useEffect(() => {
    if (options.disabled) {
      setText(target);
      textRef.current = target;
      return;
    }

    function cancel() {
      if (timerRef.current != null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    function deleteTo(pivot: string, then: () => void): void {
      if (textRef.current === pivot) {
        timerRef.current = setTimeout(then, TYPE_MS);
        return;
      }
      timerRef.current = setTimeout(() => {
        const next = textRef.current.slice(0, -1);
        textRef.current = next;
        setText(next);
        deleteTo(pivot, then);
      }, DELETE_MS);
    }

    function typeTo(full: string): void {
      if (textRef.current === full) return;
      const next = full.slice(0, textRef.current.length + 1);
      textRef.current = next;
      setText(next);
      timerRef.current = setTimeout(() => typeTo(full), TYPE_MS);
    }

    cancel();

    if (isFirst.current) {
      isFirst.current = false;
      timerRef.current = setTimeout(() => typeTo(target), INITIAL_DELAY_MS);
    } else {
      deleteTo(PIVOT, () => typeTo(target));
    }

    return cancel;
  }, [target, options.disabled]);

  return text;
}
