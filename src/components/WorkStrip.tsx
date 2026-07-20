"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function WorkStrip({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [supportsViewTimeline, setSupportsViewTimeline] = useState(true);
  const [fallbackProgress, setFallbackProgress] = useState(0);

  useEffect(() => {
    // Feature detect the scroll-driven animation API.
    const hasViewTimeline =
      typeof window !== "undefined" && "ViewTimeline" in window;
    setSupportsViewTimeline(hasViewTimeline);

    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    if (hasViewTimeline) {
      // Native scroll-linked animation — silky, compositor-driven, no JS per frame.
      try {
        // @ts-expect-error -- ViewTimeline is not yet in TS DOM lib types
        const timeline = new ViewTimeline({ subject: section, axis: "block" });
        wrap.animate(
          { transform: ["", "translateX(calc(-100% + 100vw))"] },
          {
            timeline,
            fill: "forwards",
            rangeStart: "contain 0%",
            rangeEnd: "contain 100%",
          } as unknown as KeyframeAnimationOptions
        );
        return;
      } catch {
        setSupportsViewTimeline(false);
      }
    }

    // Fallback for Safari/Firefox: compute progress on scroll with rAF throttling.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        setFallbackProgress(total > 0 ? scrolled / total : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fallbackStyle = !supportsViewTimeline
    ? {
        transform: `translateX(calc(${-fallbackProgress * 100}% + ${
          fallbackProgress * 100
        }vw))`,
      }
    : undefined;

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
          <div className="flex h-full w-[70vw] shrink-0 flex-col justify-center px-8 md:w-[45vw] md:px-16">
            <p
              className="text-sm uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              Selected work
            </p>
            <h2 className="font-display mt-4 text-4xl leading-tight md:text-6xl">
              A few things
              <br />
              I&apos;ve built.
            </h2>
            <p
              className="mt-6 max-w-xs text-sm"
              style={{ color: "var(--muted)" }}
            >
              Keep scrolling — this section moves sideways.
            </p>
          </div>

          {/* Project panels */}
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="flex h-full w-[85vw] shrink-0 items-center px-6 md:w-[55vw] md:px-10"
            >
              <div
                className="flex h-[70vh] w-full flex-col justify-between rounded-2xl p-8 md:p-12"
                style={{ background: project.color }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-7xl text-white/25 md:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
                      aria-label={`Visit ${project.name}`}
                    >
                      <ArrowUpRight size={18} />
                    </a>
                  )}
                </div>

                <div>
                  <h3 className="font-display text-3xl text-white md:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-3 max-w-md text-white/80">
                    {project.oneLiner}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/25 px-3 py-1 text-xs text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-6 inline-block text-sm text-white underline underline-offset-4"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Outro spacer so the last panel doesn't stay stuck to the edge */}
          <div className="w-[10vw] shrink-0" />
        </div>
      </div>
    </section>
  );
}
