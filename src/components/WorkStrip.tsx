"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

export default function WorkStrip({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fallbackProgress, setFallbackProgress] = useState(0);

  // Derived initial support — derived synchronously, no state cascade.
  const supportsNative =
    typeof window !== "undefined" &&
    "ViewTimeline" in window;

  useEffect(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    if (supportsNative) {
      // Native scroll-linked animation — silky, compositor-driven, no JS per frame.
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
        return;
      } catch {
        // Falls through to fallback below
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
  }, [supportsNative]);

  const fallbackStyle = !supportsNative
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
          <div className="flex h-full w-[80vw] shrink-0 flex-col justify-center px-6 md:w-[45vw] md:px-16">
            <p
              className="text-sm uppercase tracking-widest"
              style={{ color: "var(--muted)" }}
            >
              Selected work
            </p>
            <h2 className="font-display mt-4 text-3xl leading-tight md:text-6xl">
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
              className="flex h-full w-[85vw] shrink-0 items-center px-4 md:w-[55vw] md:px-10"
            >
              <div
                className="flex h-[65vh] w-full flex-col justify-between rounded-2xl p-6 md:h-[70vh] md:p-12"
                style={{ background: project.color }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl text-white/25 md:text-8xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 md:h-10 md:w-10"
                      aria-label={`Visit ${project.name}`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>

                <div>
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
                    className="mt-5 inline-block text-sm text-white underline underline-offset-4 md:mt-6"
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
