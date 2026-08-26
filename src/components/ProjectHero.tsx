"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImageOff } from "lucide-react";

export default function ProjectHero({
  hero,
  heroVideo,
  projectName,
}: {
  hero: string | null;
  heroVideo?: string | null;
  projectName: string;
}) {
  return (
    <section className="relative w-full">
      <div className="relative w-full aspect-[4/3] md:aspect-[2.5/1] overflow-hidden">
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
            style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
          >
            <ImageOff size={32} style={{ color: "var(--muted)" }} />
            <span className="text-sm" style={{ color: "var(--muted)" }}>
              Screenshots coming soon
            </span>
          </div>
        )}

        {/* Bottom gradient fade */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to top, var(--bg) 0%, transparent 30%)`,
          }}
        />

        {/* Back button */}
        <Link
          href="/projects"
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:scale-[1.02] md:left-6 md:top-6 md:px-4 md:py-2 md:text-sm"
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
