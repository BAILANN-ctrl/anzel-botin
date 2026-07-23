"use client";

import WorkStrip from "@/components/WorkStrip";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import { projects } from "@/data/projects";
import { useTypedCycle } from "@/hooks/useTypedCycle";

const ROLES = ["software", "interfaces", "systems", "products"];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const typed = useTypedCycle({ words: ROLES });

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden px-6 pt-8 md:px-10">
        <div className="relative flex min-h-[calc(80vh-6rem)] flex-col justify-between">
          <div>
            <RevealText as="p" className="text-sm uppercase tracking-widest" style={{ color: "var(--muted)" }}>
              Full-stack developer
            </RevealText>

            <RevealText
              as="h1"
              delay={80}
              className="font-display mt-6 max-w-3xl text-4xl leading-[1.1] sm:text-5xl md:text-7xl"
            >
              I build clean, considered
              <br />
              <span className="relative inline-flex items-baseline">
                {typed}
                <span
                  aria-hidden
                  className="ml-1 inline-block h-[0.9em] w-[2px] animate-pulse"
                  style={{ background: "var(--ink)" }}
                />
              </span>
              , end to end.
            </RevealText>

            <RevealText as="div" delay={160}>
              <p className="mt-8 max-w-xl text-lg" style={{ color: "var(--muted)" }}>
                Building production web applications with React, Next.js,
                Node.js, and MySQL — from database architecture to deployment.
                Currently open to new opportunities.
              </p>
            </RevealText>

            <RevealText as="div" delay={240}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href="/projects"
                  className="rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--ink)" }}
                >
                  View my work
                </MagneticButton>
                <MagneticButton
                  href="/contact"
                  className="rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--ink)]"
                  style={{ borderColor: "var(--border)" }}
                >
                  Get in touch
                </MagneticButton>
              </div>
            </RevealText>
          </div>

          {/* Stat / stack row — fills hero, adds credibility density */}
          <RevealText as="div" delay={320}>
            <div
              className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t pt-6 text-xs uppercase tracking-widest"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              <span>React</span>
              <span>Next.js</span>
              <span>Node.js</span>
              <span>MySQL</span>
              <span>TypeScript</span>
            </div>
          </RevealText>
        </div>
      </section>

      {/* Signature scroll-pinned work strip */}
      <WorkStrip projects={featured} />

      {/* Closing CTA — the "standout" moment, gets its own tinted stage */}
      <section
        className="relative overflow-hidden px-6 py-20 text-center md:px-10 md:py-32"
        style={{ background: "var(--surface, #f7f7f5)" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
        </div>
        <div className="relative">
          <RevealText as="h2" className="font-display text-3xl md:text-4xl">
            Have a role or project in mind?
          </RevealText>
          <div className="mt-8 flex justify-center">
            <MagneticButton
              href="/contact"
              className="inline-block rounded-full px-8 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: "var(--ink)" }}
            >
              Let&apos;s talk →
            </MagneticButton>
          </div>
        </div>
      </section>
    </div>
  );
}