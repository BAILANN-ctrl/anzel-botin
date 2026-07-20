"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const LINES = [
  { prompt: "whoami", output: "Your Name — full-stack developer" },
  { prompt: "cat focus.txt", output: "React · Node.js · TypeScript · Postgres" },
  { prompt: "echo $STATUS", output: "Open to opportunities" },
];

export default function TerminalHero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;
    const currentPrompt = LINES[visibleLines].prompt;

    if (typedChars < currentPrompt.length) {
      const t = setTimeout(() => setTypedChars((c) => c + 1), 35);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setTypedChars(0);
    }, 400);
    return () => clearTimeout(t);
  }, [typedChars, visibleLines]);

  return (
    <div
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-lg border shadow-2xl"
      style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
    >
      <div
        className="flex items-center gap-2 border-b px-4 py-3"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span
          className="ml-2 font-mono-brand text-xs"
          style={{ color: "var(--text-dim)" }}
        >
          zsh — intro.sh
        </span>
      </div>

      <div className="space-y-3 p-6 font-mono-brand text-sm leading-relaxed">
        {LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i}>
            <div>
              <span style={{ color: "var(--green)" }}>❯</span>{" "}
              <span style={{ color: "var(--text)" }}>{line.prompt}</span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ color: "var(--blue)" }}
            >
              {line.output}
            </motion.div>
          </div>
        ))}

        {visibleLines < LINES.length && (
          <div>
            <span style={{ color: "var(--green)" }}>❯</span>{" "}
            <span>{LINES[visibleLines].prompt.slice(0, typedChars)}</span>
            <span className="animate-pulse" style={{ color: "var(--green)" }}>
              ▊
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
