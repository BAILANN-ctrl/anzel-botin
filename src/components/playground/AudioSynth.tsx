"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const NOTES = [
  { label: "C4", freq: 261.63, key: "a" },
  { label: "D4", freq: 293.66, key: "s" },
  { label: "E4", freq: 329.63, key: "d" },
  { label: "F4", freq: 349.23, key: "f" },
  { label: "G4", freq: 392.0, key: "g" },
  { label: "A4", freq: 440.0, key: "h" },
  { label: "B4", freq: 493.88, key: "j" },
  { label: "C5", freq: 523.25, key: "k" },
];

export default function AudioSynth() {
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const activeOscRef = useRef<
    Map<string, { osc: OscillatorNode; gain: GainNode }>
  >(new Map());
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyser.connect(ctx.destination);
      ctxRef.current = ctx;
      analyserRef.current = analyser;
    }
    return ctxRef.current;
  }, []);

  const playNote = useCallback(
    (note: (typeof NOTES)[number]) => {
      if (activeOscRef.current.has(note.key)) return;
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(note.freq, ctx.currentTime);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(analyserRef.current!);
      osc.start();
      activeOscRef.current.set(note.key, { osc, gain });
      setActiveKeys((prev) => new Set(prev).add(note.key));
    },
    [getCtx],
  );

  const stopNote = useCallback((key: string) => {
    const entry = activeOscRef.current.get(key);
    if (!entry) return;
    const ctx = ctxRef.current;
    if (ctx) {
      entry.gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
      entry.osc.stop(ctx.currentTime + 0.16);
    }
    activeOscRef.current.delete(key);
    setActiveKeys((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  useEffect(() => {
    const activeOsc = activeOscRef.current;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const note = NOTES.find((n) => n.key === e.key);
      if (note) playNote(note);
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const note = NOTES.find((n) => n.key === e.key);
      if (note) stopNote(note.key);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      Array.from(activeOsc.keys()).forEach((key) => stopNote(key));
    };
  }, [playNote, stopNote]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      analyser.getByteFrequencyData(dataArray);

      const barCount = 32;
      const barWidth = rect.width / barCount - 2;
      const step = Math.floor(bufferLength / barCount);

      for (let i = 0; i < barCount; i++) {
        const val = dataArray[i * step] / 255;
        const h = val * rect.height * 0.85;
        const x = i * (barWidth + 2);

        ctx.fillStyle = `rgba(52, 211, 153, ${0.15 + val * 0.6})`;
        ctx.fillRect(x, rect.height - h, barWidth, h);

        ctx.fillStyle = `rgba(52, 211, 153, ${val * 0.15})`;
        ctx.fillRect(x, rect.height - h - 2, barWidth, 2);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="flex h-full flex-col gap-3">
      <canvas
        ref={canvasRef}
        className="h-20 w-full flex-shrink-0"
        style={{ borderRadius: 8 }}
      />
      <div className="flex flex-1 gap-1">
        {NOTES.map((note) => {
          const isActive = activeKeys.has(note.key);
          return (
            <button
              key={note.key}
              onMouseDown={() => playNote(note)}
              onMouseUp={() => stopNote(note.key)}
              onMouseLeave={() => {
                if (activeOscRef.current.has(note.key)) stopNote(note.key);
              }}
              className="relative flex flex-1 flex-col items-center justify-end rounded-lg pb-2 transition-all duration-150 select-none"
              style={{
                background: isActive
                  ? "rgba(52, 211, 153, 0.2)"
                  : "rgba(255, 255, 255, 0.03)",
                border: isActive
                  ? "1px solid rgba(52, 211, 153, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.06)",
                transform: isActive ? "scale(0.96)" : "scale(1)",
              }}
            >
              <span
                className="font-mono text-[9px] uppercase tracking-[0.15em]"
                style={{
                  color: isActive ? "var(--accent)" : "var(--muted)",
                }}
              >
                {note.key}
              </span>
            </button>
          );
        })}
      </div>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.2em]"
        style={{ color: "var(--muted)" }}
      >
        Keys [A-K] or click
      </span>
    </div>
  );
}
