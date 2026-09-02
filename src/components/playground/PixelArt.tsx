"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRID = 16;
const INITIAL = "#0b0b13";

type Tool = "brush" | "eraser" | "fill";

export default function PixelArt() {
  const [pixels, setPixels] = useState<string[][]>(() =>
    Array.from({ length: GRID }, () => Array(GRID).fill(INITIAL)),
  );
  const [brush, setBrush] = useState("var(--accent)");
  const [tool, setTool] = useState<Tool>("brush");
  const [drawing, setDrawing] = useState(false);
  const lastCell = useRef<{ r: number; c: number } | null>(null);
  const history = useRef<string[][][]>([]);
  const historyIndex = useRef(-1);

  const COLORS = [
    "var(--accent)",
    "#3b82f6",
    "#f43f5e",
    "#f59e0b",
    "#8b5cf6",
    "var(--ink)",
    INITIAL,
  ];

  const clone = (grid: string[][]) => grid.map((row) => [...row]);

  const commit = useCallback((next: string[][]) => {
    const idx = historyIndex.current + 1;
    history.current = history.current.slice(0, idx);
    history.current.push(clone(next));
    historyIndex.current = idx;
    setPixels(next);
  }, []);

  const undo = useCallback(() => {
    if (historyIndex.current <= 0) return;
    historyIndex.current -= 1;
    const prev = history.current[historyIndex.current - 1];
    if (!prev) return;
    setPixels(clone(prev));
  }, []);

  const redo = useCallback(() => {
    if (historyIndex.current >= history.current.length - 1) return;
    historyIndex.current += 1;
    setPixels(clone(history.current[historyIndex.current - 1]));
  }, []);

  const fill = useCallback(
    (r: number, c: number) => {
      const target = pixels[r][c];
      const replacement = tool === "eraser" ? INITIAL : brush;
      if (target === replacement) return;
      const next = clone(pixels);
      const stack = [[r, c]];
      while (stack.length) {
        const [cr, cc] = stack.pop()!;
        if (
          cr < 0 ||
          cr >= GRID ||
          cc < 0 ||
          cc >= GRID ||
          next[cr][cc] !== target
        )
          continue;
        next[cr][cc] = replacement;
        stack.push([cr + 1, cc], [cr - 1, cc], [cr, cc + 1], [cr, cc - 1]);
      }
      commit(next);
    },
    [pixels, brush, tool, commit],
  );

  const paint = useCallback(
    (r: number, c: number, erase: boolean) => {
      if (lastCell.current?.r === r && lastCell.current?.c === c) return;
      lastCell.current = { r, c };
      const next = clone(pixels);
      next[r][c] = erase ? INITIAL : brush;
      commit(next);
    },
    [pixels, brush, commit],
  );

  const onPointerDown = (r: number, c: number, erase = false) => {
    setDrawing(true);
    lastCell.current = null;
    if (tool === "fill" && !erase) {
      fill(r, c);
      return;
    }
    paint(r, c, tool === "eraser" || erase);
  };

  const onPointerMove = (r: number, c: number) => {
    if (drawing) paint(r, c, tool === "eraser");
  };

  const onPointerUp = () => {
    setDrawing(false);
    lastCell.current = null;
  };

  const clear = () => {
    const next = Array.from({ length: GRID }, () => Array(GRID).fill(INITIAL));
    commit(next);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (e.key === "e" || e.key === "E") {
        setTool("eraser");
      } else if (e.key === "b" || e.key === "B") {
        setTool("brush");
      } else if (e.key === "f" || e.key === "F") {
        setTool("fill");
      } else if (/^[1-7]$/.test(e.key)) {
        setBrush(COLORS[Number(e.key) - 1]);
        setTool("brush");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [undo, redo]);

  return (
    <div
      className="flex h-full flex-col items-center gap-3"
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div
        className="grid select-none"
        style={{
          gridTemplateColumns: `repeat(${GRID}, 1fr)`,
          gap: 1,
          width: "100%",
          maxWidth: 280,
          aspectRatio: "1",
        }}
      >
        {pixels.map((row, r) =>
          row.map((color, c) => (
            <div
              key={`${r}-${c}`}
              onPointerDown={(e) => {
                e.preventDefault();
                onPointerDown(r, c, e.button === 2);
              }}
              onContextMenu={(e) => e.preventDefault()}
              onPointerEnter={() => onPointerMove(r, c)}
              className="cursor-crosshair transition-colors duration-75"
              style={{
                background: color,
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: 1,
              }}
            />
          )),
        )}
      </div>
      <div className="flex items-center gap-2">
        <ToolButton
          active={tool === "brush"}
          onClick={() => setTool("brush")}
          title="Brush (B)"
          icon="●"
        />
        <ToolButton
          active={tool === "eraser"}
          onClick={() => setTool("eraser")}
          title="Eraser (E)"
          icon="▨"
        />
        <ToolButton
          active={tool === "fill"}
          onClick={() => setTool("fill")}
          title="Fill (F)"
          icon="▣"
        />
        <div className="mx-1 h-4 w-px bg-white/10" />
        {COLORS.map((c, i) => (
          <button
            key={c}
            onClick={() => {
              setBrush(c);
              setTool("brush");
            }}
            className="h-4 w-4 rounded-full transition-transform duration-200 hover:scale-125"
            style={{
              background: c,
              border:
                brush === c
                  ? "2px solid var(--ink)"
                  : "1px solid rgba(255,255,255,0.1)",
            }}
            aria-label={`Select color ${i + 1}`}
            title={`Color ${i + 1} (${i + 1})`}
          />
        ))}
        <div className="mx-1 h-4 w-px bg-white/10" />
        <button
          onClick={undo}
          className="font-mono text-[9px] uppercase tracking-[0.15em] transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          Undo
        </button>
        <button
          onClick={clear}
          className="font-mono text-[9px] uppercase tracking-[0.15em] transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

function ToolButton({
  active,
  onClick,
  title,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-5 w-5 items-center justify-center rounded text-[10px] transition-colors hover:text-[var(--accent)]"
      style={{
        color: active ? "var(--accent)" : "var(--muted)",
        boxShadow: active ? "inset 0 0 0 1px var(--accent)" : "none",
      }}
    >
      {icon}
    </button>
  );
}
