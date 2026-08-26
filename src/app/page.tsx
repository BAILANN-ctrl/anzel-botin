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
      <section className="relative min-h-[85vh] overflow-hidden px-6 pt-20 md:px-10 md:pt-24">
        <div className="relative flex min-h-[calc(85vh-6rem)] flex-col justify-between">
          <div>
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
              className="font-display mt-6 max-w-3xl text-4xl leading-[1.05] sm:text-5xl md:text-6xl"
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
