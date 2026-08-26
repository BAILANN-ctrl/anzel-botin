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
      {/* Hero - Asymmetric Split */}
      <section className="relative overflow-hidden px-6 pt-8 md:px-10 md:pt-8">
        <div className="mx-auto grid min-h-[calc(85vh-6rem)] max-w-7xl items-center gap-10 md:grid-cols-[1fr_420px] md:gap-16 lg:grid-cols-[1fr_480px]">
          {/* Left: Copy */}
          <div className="flex flex-col justify-center">
            <RevealText
              as="p"
              className="text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              Full-stack developer
            </RevealText>

            <RevealText
              as="h1"
              delay={80}
              className="font-display mt-6 max-w-2xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl"
            >
              I build clean, considered
              <br />
              <span className="relative inline-flex items-baseline">
                {typed}
                <span
                  aria-hidden
                  className="ml-1 inline-block h-[0.9em] w-[2px]"
                  style={{
                    background: "var(--accent)",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                />
              </span>
              , end to end.
            </RevealText>

            <RevealText as="div" delay={160}>
              <p
                className="mt-8 max-w-lg text-lg leading-relaxed"
                style={{ color: "var(--muted)" }}
              >
                Building production web applications end-to-end with React,
                Next.js, Node.js, and MySQL.
              </p>
            </RevealText>

            <RevealText as="div" delay={240}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 4px 24px -4px var(--accent)",
                  }}
                >
                  View my work
                  <span className="inline-block transition-transform group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </MagneticButton>
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all hover:border-[var(--ink)]"
                  style={{ borderColor: "var(--border)" }}
                >
                  Get in touch
                </MagneticButton>
              </div>
            </RevealText>
          </div>

          {/* Right: Code Hero */}
          <RevealText as="div" delay={120} className="hidden justify-center md:flex">
            <CodeHero />
          </RevealText>
        </div>
      </section>

      {/* Tech Stack Strip */}
      <section className="border-y px-6 py-8 md:px-10 md:py-10" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl">
          <RevealText as="p" className="text-center text-xs font-medium uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>
            Tools I work with
          </RevealText>
          <RevealText as="div" delay={80}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech.slug}
                  className="flex items-center gap-2.5 transition-colors hover:text-[var(--accent)]"
                  style={{ color: "var(--muted)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}/currentColor`}
                    alt=""
                    width={20}
                    height={20}
                    className="opacity-70 transition-opacity hover:opacity-100"
                  />
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </RevealText>
        </div>
      </section>

      {/* Signature scroll-pinned work strip */}
      <WorkStrip projects={featured} />

      {/* Closing CTA */}
      <section
        className="relative overflow-hidden px-6 py-20 text-center md:px-10 md:py-32"
        style={{ background: "var(--surface-tint)" }}
      >
        <div className="relative">
          <RevealText as="h2" className="font-display text-3xl md:text-4xl">
            Have a role or project in mind?
          </RevealText>
          <RevealText as="div" delay={80}>
            <p
              className="mx-auto mt-4 max-w-md text-base"
              style={{ color: "var(--muted)" }}
            >
              I&apos;m always interested in hearing about new projects and
              opportunities.
            </p>
          </RevealText>
          <RevealText as="div" delay={160}>
            <div className="mt-8 flex justify-center">
              <MagneticButton
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 4px 24px -4px var(--accent)",
                }}
              >
                Start a project
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </MagneticButton>
            </div>
          </RevealText>
        </div>
      </section>
    </div>
  );
}
