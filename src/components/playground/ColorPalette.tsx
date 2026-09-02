"use client";

import { useCallback, useRef, useState } from "react";

function hslToHex(h: number, s: number, l: number): string {
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(baseHue: number) {
  return [
    { hex: hslToHex(baseHue, 0.75, 0.55), label: "Primary" },
    { hex: hslToHex((baseHue + 30) % 360, 0.65, 0.5), label: "Analogous" },
    { hex: hslToHex((baseHue + 180) % 360, 0.6, 0.45), label: "Complement" },
    { hex: hslToHex((baseHue + 60) % 360, 0.5, 0.6), label: "Triadic" },
    { hex: hslToHex(baseHue, 0.15, 0.15), label: "Dark" },
  ];
}

export default function ColorPalette() {
  const [hue, setHue] = useState(160);
  const [copied, setCopied] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const palette = generatePalette(hue);

  const copyHex = useCallback((hex: string) => {
    navigator.clipboard.writeText(hex).catch(() => {});
    setCopied(hex);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(null), 1200);
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <input
        type="range"
        min={0}
        max={360}
        value={hue}
        onChange={(e) => setHue(Number(e.target.value))}
        className="w-full accent-[var(--accent)]"
        style={{
          height: 4,
          background: `linear-gradient(to right, 
            hsl(0,75%,55%), hsl(60,75%,55%), hsl(120,75%,55%), 
            hsl(180,75%,55%), hsl(240,75%,55%), hsl(300,75%,55%), hsl(360,75%,55%))`,
          borderRadius: 2,
          outline: "none",
          WebkitAppearance: "none",
        }}
      />
      <div className="flex flex-1 gap-2">
        {palette.map((color) => (
          <button
            key={color.hex}
            onClick={() => copyHex(color.hex)}
            className="group relative flex flex-1 flex-col items-center justify-end rounded-xl pb-2 transition-all duration-300 hover:scale-105"
            style={{
              background: color.hex,
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <span
              className="font-mono text-[8px] uppercase tracking-[0.1em] opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                color: "#fff",
                textShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            >
              {copied === color.hex ? "Copied" : color.hex}
            </span>
          </button>
        ))}
      </div>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--muted)" }}
      >
        Drag slider / Click to copy
      </span>
    </div>
  );
}
