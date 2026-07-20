"use client";

import { useEffect, useState } from "react";

interface UseTypedCycleOptions {
  words: string[];
  typingSpeed?: number;   // ms per character while typing
  deletingSpeed?: number; // ms per character while deleting
  pauseMs?: number;       // pause once fully typed
  startDelay?: number;    // delay before the whole thing starts
}

/**
 * Cycles through a list of words with a typewriter effect.
 * Usage:
 *   const word = useTypedCycle({ words: ["software", "interfaces", "systems"] });
 *   <span>{word}<Cursor /></span>
 */
export function useTypedCycle({
  words,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseMs = 1400,
  startDelay = 300,
}: UseTypedCycleOptions) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"waiting" | "typing" | "pausing" | "deleting">(
    "waiting"
  );

  // initial delay
  useEffect(() => {
    if (phase !== "waiting") return;
    const t = setTimeout(() => setPhase("typing"), startDelay);
    return () => clearTimeout(t);
  }, [phase, startDelay]);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];

    if (phase === "typing") {
      if (text.length < current.length) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          typingSpeed
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pausing"), pauseMs);
      return () => clearTimeout(t);
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseMs / 3);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          deletingSpeed
        );
        return () => clearTimeout(t);
      }
      setIndex((i) => (i + 1) % words.length);
      setPhase("typing");
    }
  }, [phase, text, index, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}
