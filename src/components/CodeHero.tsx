"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const LINES = [
  { text: 'import { skills } from "anzel";', delay: 0 },
  { text: "const developer = {", delay: 900 },
  { text: '  role: "full-stack",', delay: 1800 },
  { text: "  focus: [\"React\", \"Node.js\"],", delay: 2700 },
  { text: "};", delay: 3600 },
];

function TypingLine({
  text,
  startDelay,
  typingSpeed = 28,
  deletingSpeed = 14,
  pauseMs = 800,
}: {
  text: string;
  startDelay: number;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}) {
  const [visible, setVisible] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (!isDeleting) {
      if (visible < text.length) {
        const t = setTimeout(() => setVisible((v) => v + 1), typingSpeed);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (visible > 0) {
      const t = setTimeout(() => setVisible((v) => v - 1), deletingSpeed);
      return () => clearTimeout(t);
    }
    queueMicrotask(() => setIsDeleting(false));
  }, [visible, isDeleting, started, text, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className="whitespace-pre">
      {text.slice(0, visible)}
      {started && (
        <span
          className="ml-px inline-block h-[1.1em] w-[2px] align-text-bottom"
          style={{
            background: "var(--accent)",
            animation: "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
      )}
    </span>
  );
}

function SyntaxHighlight({ text }: { text: string }) {
  return (
    <span>
      {text.split(/(?<=\s)|(?=\s)|("(?:[^"\\]|\\.)*")/g).map((token, i) => {
        if (!token) return null;
        if (token === "import" || token === "from" || token === "const")
          return (
            <span key={i} style={{ color: "var(--accent)" }}>
              {token}
            </span>
          );
        if (token.startsWith('"'))
          return (
            <span key={i} style={{ color: "#7dd3fc" }}>
              {token}
            </span>
          );
        return <span key={i}>{token}</span>;
      })}
    </span>
  );
}

export default function CodeHero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
      }}
      className="relative h-[420px] w-[336px] cursor-default lg:h-[480px] lg:w-[384px]"
    >
      <div
        className="absolute -inset-4 rounded-[2rem] opacity-20 blur-2xl"
        style={{ background: "radial-gradient(circle at 30% 20%, var(--glow-1), transparent 70%)" }}
      />

      <div className="glass-panel relative flex h-full w-full flex-col overflow-hidden p-1.5">
        {/* Header bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
          <span
            className="ml-2 font-mono text-[11px]"
            style={{ color: "var(--muted)" }}
          >
            developer.ts
          </span>
        </div>

        <div className="flex-1 space-y-2 p-5 font-mono text-[13px] leading-relaxed">
          {LINES.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span
                className="select-none text-right text-[11px] leading-relaxed"
                style={{ color: "var(--muted)", width: "1.2em", opacity: 0.4 }}
              >
                {i + 1}
              </span>
              <span style={{ color: "var(--ink)" }}>
                <SyntaxHighlight text={line.text} />
                {i === LINES.length - 1 && (
                  <TypingLine text={line.text} startDelay={line.delay} />
                )}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span
                className="text-[11px] font-medium"
                style={{ color: "var(--muted)" }}
              >
                open to work
              </span>
            </div>
            <span
              className="text-[11px]"
              style={{ color: "var(--muted)", opacity: 0.5 }}
            >
              /
            </span>
            <span
              className="text-[11px]"
              style={{ color: "var(--muted)" }}
            >
              Manila, PH
            </span>
          </div>
          <span
            className="font-mono text-[10px]"
            style={{ color: "var(--muted)", opacity: 0.5 }}
          >
            v1.0.0
          </span>
        </div>
      </div>
    </motion.div>
  );
}
