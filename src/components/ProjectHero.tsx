"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronDown, ImageOff } from "lucide-react";

export default function ProjectHero({
  hero,
  heroVideo,
  projectName,
  description,
}: {
  hero: string | null;
  heroVideo?: string | null;
  projectName: string;
  description?: string;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Hero height roughly matches aspect-[2/1] on mobile or 50vw
      const vh = window.innerHeight;
      const heroHeight = Math.min(vh * 0.5, vh * 0.5); // matches aspect ratio
      const scrollY = window.scrollY;
      // Fade completes after scrolling ~60% of the hero height
      const progress = Math.min(scrollY / (heroHeight * 0.6), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[2/1] md:aspect-[2.5/1] overflow-hidden">
        {heroVideo ? (
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : hero ? (
          <Image
            src={hero}
            alt={`${projectName} hero`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="flex h-full w-full flex-col items-center justify-center gap-3 border-b"
            style={{ borderColor: "var(--border)" }}
          >
            <ImageOff size={32} style={{ color: "var(--muted)" }} />
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              Screenshots coming soon
            </span>
          </div>
        )}

        {/* ── Scroll-based fade-to-white gradient ── */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `linear-gradient(to top, var(--bg) 0%, transparent 50%)`,
            opacity: scrollProgress,
          }}
        />

        {/* ── Scroll indicator – centered bottom ── */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 p-4 md:p-6">
          <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 text-white/80 backdrop-blur-sm">
            <ChevronDown size={14} className="animate-bounce" />
            <span className="text-[10px] uppercase tracking-widest md:text-[11px]">
              Scroll
            </span>
          </div>
        </div>

        {/* ── Back button overlay on hero ── */}
        <Link
          href="/projects"
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:opacity-80 md:left-6 md:top-6 md:px-4 md:py-2 md:text-sm"
          style={{
            color: "var(--ink)",
            background: "var(--bg)",
            border: "1px solid var(--border)",
          }}
        >
          <ArrowLeft size={14} /> All Projects
        </Link>
      </div>
    </section>
  );
}

