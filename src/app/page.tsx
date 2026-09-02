"use client";

import CodeHero from "@/components/CodeHero";
import WorkStrip from "@/components/WorkStrip";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { projects } from "@/data/projects";
import { useTypedCycle } from "@/hooks/useTypedCycle";

const ROLES = ["software", "interfaces", "systems", "products"];

const TECH_STACK = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "MySQL", slug: "mysql" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Python", slug: "python" },
  { name: "Git", slug: "git" },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const typed = useTypedCycle({ words: ROLES });

  return (
    <div>
      {/* Hero — full-bleed, left-aligned, massive type */}
      <section className="relative overflow-hidden">
        <div className="relative grid min-h-[100dvh] items-center px-6 pt-28 md:px-14 lg:grid-cols-[1fr_480px] lg:px-20">
          {/* Left: Copy */}
          <div className="flex flex-col justify-center pb-20 lg:pb-0 mt-8 md:mt-0">
            <RevealText
              as="h1"
              delay={0}
              className="font-display text-[clamp(2.5rem,9vw,5rem)] leading-[0.95] tracking-[-0.04em] pb-1 md:text-[clamp(1.75rem,4.5vw,3.75rem)]"
            >
              I build clean,
              <br />
              considered
              <br />
              <span className="relative inline-flex items-baseline">
                <span
                  className="inline-block"
                  style={{
                    background:
                      "linear-gradient(120deg, var(--accent), #7dd3fc)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {typed}
                </span>
                <span
                  aria-hidden
                  className="ml-3 inline-block h-[0.8em] w-[0.03em] rounded-full"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 14px var(--accent)",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
              </span>
              ,<br />
              end to end.
            </RevealText>

            <RevealText as="div" delay={120}>
              <p
                className="mt-8 max-w-md text-lg leading-relaxed md:text-xl"
                style={{ color: "var(--muted)" }}
              >
                Building production web applications end-to-end with React,
                Next.js, Node.js, and MySQL.
              </p>
            </RevealText>

            <RevealText as="div" delay={200}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <MagneticButton
                  href="/projects"
                  data-cursor-hover
                  className="btn-primary group"
                >
                  View my work
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 group-hover:-translate-y-px group-hover:translate-x-0.5"
                    style={{ background: "rgba(5,5,10,0.15)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </MagneticButton>
                <MagneticButton
                  href="/contact"
                  data-cursor-hover
                  className="btn-secondary group"
                >
                  Get in touch
                  <span
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-500 group-hover:-translate-y-px group-hover:translate-x-0.5"
                    style={{ background: "rgba(255,255,255,0.1)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M7 17L17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </MagneticButton>
              </div>
            </RevealText>
          </div>

          {/* Right: Code Hero — offset for asymmetric tension */}
          <RevealText
            as="div"
            delay={140}
            className="hidden items-center justify-center lg:flex lg:translate-x-6 lg:pr-4"
          >
            <CodeHero />
          </RevealText>
        </div>

        {/* Full-bleed scroll cue */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em]"
          style={{ color: "var(--muted)" }}
          aria-hidden
        >
          <span>Scroll</span>
          <span className="h-px w-8" style={{ background: "var(--border-strong)" }} />
        </div>
      </section>

      {/* Tech Stack — infinite marquee, no panel */}
      <section className="marquee-wrap py-16 md:py-20">
        <div className="marquee-track">
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div
              key={`${tech.slug}-${i}`}
              className="flex items-center gap-3"
              style={{ color: "var(--muted)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/currentColor`}
                alt=""
                width={22}
                height={22}
                className="opacity-80"
              />
              <span className="font-display whitespace-nowrap text-2xl tracking-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Signature scroll-pinned work strip */}
      <WorkStrip projects={featured} />

      {/* Closing CTA — left-aligned, editorial */}
      <section className="relative overflow-hidden px-6 py-40 md:px-14 md:py-56 lg:px-20">
        <div className="max-w-6xl">
          <RevealText
            as="h2"
            delay={0}
            className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1] tracking-[-0.03em]"
          >
            Have a role or
            <br />
            project in mind?
          </RevealText>
          <RevealText as="div" delay={120}>
            <p
              className="mt-8 max-w-md text-lg leading-relaxed"
              style={{ color: "var(--muted)" }}
            >
              I&apos;m always interested in hearing about new projects and
              opportunities. Let&apos;s make something considered.
            </p>
          </RevealText>
          <RevealText as="div" delay={200}>
            <div className="mt-12">
              <MagneticButton href="/contact" data-cursor-hover className="btn-primary group px-8 py-4">
                Start a project
                <span
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 group-hover:-translate-y-px group-hover:translate-x-0.5"
                  style={{ background: "rgba(5,5,10,0.15)" }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </MagneticButton>
            </div>
          </RevealText>
        </div>
      </section>
    </div>
  );
}
