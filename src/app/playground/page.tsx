"use client";

import { useState } from "react";
import ParticleField from "@/components/playground/ParticleField";
import AudioSynth from "@/components/playground/AudioSynth";
import GlitchText from "@/components/playground/GlitchText";
import WaveGenerator from "@/components/playground/WaveGenerator";
import ColorPalette from "@/components/playground/ColorPalette";
import PixelArt from "@/components/playground/PixelArt";

const EXPS = [
  { id: "particles", label: "Particle Field", tag: "CANVAS" },
  { id: "synth", label: "Audio Synth", tag: "WEB AUDIO" },
  { id: "glitch", label: "Glitch Text", tag: "DOM" },
  { id: "wave", label: "Wave Generator", tag: "SIGNAL" },
  { id: "color", label: "Color Palette", tag: "HSL" },
  { id: "pixel", label: "Pixel Art", tag: "GRID" },
] as const;

export default function PlaygroundPage() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="px-6 pt-28 pb-32 md:px-14 lg:px-20">
      {/* Hero */}
      <section className="relative mb-20 md:mb-32">
        <div className="flex items-center gap-3 mb-6">
          <span className="eyebrow">EXP // LAB</span>
        </div>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] tracking-[-0.04em]">
          PLAY
          <span style={{ color: "var(--accent)" }}>GROUND</span>
        </h1>
        <p
          className="mt-6 max-w-lg text-lg leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          A collection of interactive experiments, visual effects, and small
          technical builds. Each one is something you can play with — not just
          look at.
        </p>
        <div
          className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]"
          style={{ color: "var(--muted)" }}
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Interactive
          </span>
          <span
            className="h-px w-6"
            style={{ background: "var(--border-strong)" }}
          />
          <span>{EXPS.length} experiments</span>
          <span
            className="h-px w-6"
            style={{ background: "var(--border-strong)" }}
          />
          <span>No frameworks</span>
        </div>
      </section>

      {/* Experiment Grid */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Particle Field — wide */}
        <ExperimentCard
          exp={EXPS[0]}
          className="md:col-span-2 lg:col-span-2"
          style={{ minHeight: 340 }}
          isActive={active === "particles"}
          onToggle={() => setActive(active === "particles" ? null : "particles")}
        >
          <ParticleField />
        </ExperimentCard>

        {/* Glitch Text */}
        <ExperimentCard
          exp={EXPS[2]}
          className="row-span-1"
          style={{ minHeight: 340 }}
          isActive={active === "glitch"}
          onToggle={() => setActive(active === "glitch" ? null : "glitch")}
        >
          <GlitchText />
        </ExperimentCard>

        {/* Wave Generator — wide */}
        <ExperimentCard
          exp={EXPS[3]}
          className="md:col-span-2 lg:col-span-2"
          style={{ minHeight: 280 }}
          isActive={active === "wave"}
          onToggle={() => setActive(active === "wave" ? null : "wave")}
        >
          <WaveGenerator />
        </ExperimentCard>

        {/* Audio Synth */}
        <ExperimentCard
          exp={EXPS[1]}
          className="row-span-1"
          style={{ minHeight: 280 }}
          isActive={active === "synth"}
          onToggle={() => setActive(active === "synth" ? null : "synth")}
        >
          <AudioSynth />
        </ExperimentCard>

        {/* Pixel Art */}
        <ExperimentCard
          exp={EXPS[5]}
          className="md:col-span-2 lg:col-span-2"
          style={{ minHeight: 360 }}
          isActive={active === "pixel"}
          onToggle={() => setActive(active === "pixel" ? null : "pixel")}
        >
          <PixelArt />
        </ExperimentCard>

        {/* Color Palette */}
        <ExperimentCard
          exp={EXPS[4]}
          className="row-span-1"
          style={{ minHeight: 360 }}
          isActive={active === "color"}
          onToggle={() => setActive(active === "color" ? null : "color")}
        >
          <ColorPalette />
        </ExperimentCard>
      </section>

      {/* Footer note */}
      <section className="mt-24 md:mt-32">
        <div
          className="flex flex-col items-start gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p
              className="font-display text-sm tracking-tight"
              style={{ color: "var(--ink)" }}
            >
              Built with Canvas, Web Audio, and vanilla React.
            </p>
            <p
              className="font-mono mt-1 text-[10px] uppercase tracking-[0.15em]"
              style={{ color: "var(--muted)" }}
            >
              Zero external dependencies for experiments
            </p>
          </div>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--muted)" }}
          >
            REV 1.0 / ANZEL BOTIN
          </span>
        </div>
      </section>
    </div>
  );
}

function ExperimentCard({
  exp,
  children,
  className = "",
  style,
  isActive,
  onToggle,
}: {
  exp: { id: string; label: string; tag: string };
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isActive: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`glass-panel group relative flex flex-col overflow-hidden transition-all duration-500 ${className}`}
      style={style}
    >
      {/* Header bar */}
      <div
        className="relative z-10 flex items-center justify-between border-b px-4 py-2.5"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <span
            className="font-mono text-[9px] uppercase tracking-[0.18em]"
            style={{ color: "var(--accent)" }}
          >
            [{exp.tag}]
          </span>
          <span
            className="font-display text-xs tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            {exp.label}
          </span>
        </div>
        <button
          onClick={onToggle}
          className="font-mono text-[9px] uppercase tracking-[0.15em] transition-colors hover:text-[var(--accent)]"
          style={{ color: "var(--muted)" }}
        >
          {isActive ? "[CLOSE]" : "[OPEN]"}
        </button>
      </div>

      {/* Content */}
      <div className="relative flex-1 p-4">{children}</div>
    </div>
  );
}
