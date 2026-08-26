"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GitFork } from "lucide-react";
import type { Project } from "@/data/projects";

export default function WorkStrip({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fallbackProgress, setFallbackProgress] = useState(0);
  const [indicatorProgress, setIndicatorProgress] = useState(0);
  const isNativeRef = useRef(false);

  useEffect(() => {
    isNativeRef.current = "ViewTimeline" in window;

    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    const getRawProgress = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      return total > 0 ? scrolled / total : 0;
    };

    if (isNativeRef.current) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const timeline = new (window as any).ViewTimeline({
          subject: section,
          axis: "block",
        });
        wrap.animate(
          { transform: ["", "translateX(calc(-100% + 100vw))"] },
          {
            timeline,
            fill: "forwards",
            rangeStart: "contain 0%",
            rangeEnd: "contain 100%",
          } as unknown as KeyframeAnimationOptions
        );

        let ticking = false;
        const onScrollIndicator = () => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            setIndicatorProgress(getRawProgress());
            ticking = false;
          });
        };
        window.addEventListener("scroll", onScrollIndicator, { passive: true });
        onScrollIndicator();
        return () => window.removeEventListener("scroll", onScrollIndicator);
      } catch {
        // Falls through to fallback
      }
    }

    let ticking = false;
    let target = 0;
    let rendered = 0;
    let rafId: number;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        target = getRawProgress();
        ticking = false;
      });
    };

    const tick = () => {
      rendered += (target - rendered) * 0.12;
      if (Math.abs(target - rendered) < 0.0005) rendered = target;

      setFallbackProgress(rendered);
      setIndicatorProgress(rendered);
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const fallbackStyle = {
    transform: `translateX(calc(${-fallbackProgress * 100}% + ${
      fallbackProgress * 100
    }vw))`,
  };

  const showCue = indicatorProgress < 0.98;
  const cueOpacity = Math.min(indicatorProgress / 0.05, 1, (1 - indicatorProgress) / 0.05 + 0.4);

  return (
    <section
      ref={sectionRef}
      style={{ height: "500vh", overflow: "visible" }}
      aria-label="Selected work, horizontal scroll gallery"
    >
      <div
        className="sticky top-0 overflow-x-hidden"
        style={{ height: "100vh", width: "100vw" }}
      >
        <div
          ref={wrapRef}
          className="flex h-full items-center"
          style={{ width: "250vmax", ...fallbackStyle }}
        >
          {/* Intro panel */}
          <div className="flex h-full w-[80vw] shrink-0 flex-col justify-center px-6 md:w-[45vw] md:px-16">
            <p
              className="text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Portfolio
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight md:text-6xl">
              Selected
              <br />
              work.
            </h2>
          </div>

          {/* Project panels */}
          {projects.map((project) => {
            const thumbnail = project.images?.[0] ?? null;
            return (
              <div
                key={project.slug}
                className="flex h-full w-[85vw] shrink-0 items-center px-4 md:w-[55vw] md:px-10"
              >
                <div
                  className="relative flex h-[65vh] w-full flex-col justify-between overflow-hidden rounded-2xl p-6 md:h-[70vh] md:p-12"
                  style={{ background: project.color }}
                >
                  {/* Background thumbnail if available */}
                  {thumbnail && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={thumbnail}
                        alt=""
                        fill
                        className="object-cover opacity-20"
                        sizes="55vw"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}ee, ${project.color}cc)`,
                        }}
                      />
                    </div>
                  )}

                  <div className="relative z-10 flex items-start justify-between">
                    {project.role && (
                      <span className="rounded-full border border-white/30 px-3 py-1 text-[11px] uppercase tracking-wider text-white/80 md:text-xs">
                        {project.role}
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/25 hover:scale-110 md:h-10 md:w-10"
                          aria-label={`View ${project.name} repository`}
                        >
                          <GitFork size={16} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/25 hover:scale-110 md:h-10 md:w-10"
                          aria-label={`Visit ${project.name}`}
                        >
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display text-2xl text-white md:text-4xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-white/80 md:text-base">
                      {project.oneLiner}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/25 px-2.5 py-0.5 text-[11px] text-white/90 md:px-3 md:py-1 md:text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm text-white underline underline-offset-4 transition-colors hover:text-white/80 md:mt-6"
                    >
                      View project
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Outro spacer */}
          <div className="w-[10vw] shrink-0" />
        </div>

        {/* Scroll cue */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-3 transition-opacity duration-300 md:bottom-10"
          style={{ opacity: showCue ? cueOpacity : 0 }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            <span>Scroll</span>
            <ArrowUpRight size={10} className="rotate-45" />
          </div>
          <div className="h-0.5 w-32 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${Math.min(indicatorProgress, 1) * 100}%`,
                background: "var(--accent)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
