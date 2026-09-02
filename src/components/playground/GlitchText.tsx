"use client";

import { useCallback, useRef, useState } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

const DOT_OACITIES = [0.38, 0.61, 0.44, 0.72, 0.55, 0.41, 0.68, 0.5];

export default function GlitchText() {
  const [text, setText] = useState("GLITCH");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const originalRef = useRef("GLITCH");

  const startGlitch = useCallback(
    (target: string) => {
      originalRef.current = target;
      let iteration = 0;
      const maxIterations = target.length * 3;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setText(
          target
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration / 3) return target[i];
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join(""),
        );

        iteration++;
        if (iteration > maxIterations) {
          setText(target);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 35);
    },
    [],
  );

  const stopGlitch = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    const target = originalRef.current;

    intervalRef.current = setInterval(() => {
      setText(
        target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 2) return target[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join(""),
      );

      iteration++;
      if (iteration > target.length * 4) {
        setText(target);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 30);
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div
        className="group cursor-default select-none"
        onMouseEnter={() => startGlitch("PLAYGROUND")}
        onMouseLeave={stopGlitch}
      >
        <span
          className="font-display text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight"
          style={{
            color: "var(--ink)",
            textShadow: "0 0 30px rgba(52,211,153,0.3)",
          }}
        >
          {text}
        </span>
      </div>
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--muted)" }}
        >
          Hover to scramble
        </span>
        <div className="flex gap-1">
          {DOT_OACITIES.map((o, i) => (
            <span
              key={i}
              className="inline-block h-1 w-1 rounded-full"
              style={{
                background: "var(--accent)",
                opacity: o,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
