"use client";

import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import RevealText from "@/components/RevealText";

function GitHubGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.82 1.18 3.08 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.5 11.5 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  );
}

const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
  Backend: ["Node.js", "REST API Development", "MySQL", "Database Design"],
  Other: ["Python", ".NET"],
};

const experience = [
  {
    role: "IT Web Developer",
    org: "Studio Kosmos",
    location: "Legazpi City, Albay",
    period: "March 2025 - Present",
    bullets: [
      "Independently designed and shipped a photo-selection system that digitized a manual queue workflow, cutting customer wait time by an estimated 30-40%.",
      "Built and maintain REST APIs in Node.js backing the company website (React, Next.js, Tailwind CSS), handling both feature work and bug fixes.",
      "Designed and manage the MySQL schema powering the site, including data integrity and query performance for growing traffic.",
    ],
  },
  {
    role: "Web Development Intern (OJT)",
    org: "Department of Economy, Planning and Development - Development Research Division",
    location: "Legazpi City, Albay",
    period: "February 2026 - June 2026",
    bullets: [
      "Developed the Library Management Information System (LMIS) admin panel, built to support digital archiving of 5,000+ books and publications, including handling large file sizes (80MB+) for high-resolution scanned materials.",
      "Developed the Bicol Socio-Economic and Physical Profile (SEPP) system, presenting regional data from 2015-present across population, GDP/GRDP, labor force, employment, and income/expenditure statistics for public access.",
      "Designed and managed MySQL databases supporting both systems, focused on accurate storage, retrieval, and organization of structured government data.",
    ],
  },
];

const certifications = [
  {
    name: "SAP S/4HANA Fundamentals (Global Bike)",
    issuer: "SAP University Alliances",
    detail: "Modules: SD, MM, PP, FI, CO - February to June 2024",
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 pt-24 pb-6 sm:px-6 md:px-14 md:pt-32 lg:px-20">
      {/* Intro — full-bleed, asymmetric split */}
      <div className="pb-10 sm:pb-16 md:pb-28">
        <RevealText
          as="h1"
          delay={0}
          className="font-display max-w-4xl text-[clamp(2.5rem,5.5vw,5rem)] leading-[1] tracking-[-0.03em]"
        >
          Full-stack developer,
          <br />
          three years in production.
        </RevealText>
        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[2fr_1fr] md:gap-10">
          <RevealText as="p" delay={120} className="text-lg leading-relaxed md:text-xl" style={{ color: "var(--muted)" }}>
            Shipped features end-to-end across React, Next.js, Node.js, and
            MySQL - from database design to deployment - for a commercial
            studio and a regional government office. Comfortable owning a
            feature independently and communicating progress clearly.
          </RevealText>
          <RevealText as="div" delay={200}>
            <div
              className="flex flex-col gap-3 text-sm md:items-end md:text-right"
              style={{ color: "var(--muted)" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="shrink-0" /> Albay, Philippines
              </span>
              <a
                href="mailto:anzelbotin@gmail.com"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
              >
                <Mail size={15} className="shrink-0" /> anzelbotin@gmail.com
              </a>
              <a
                href="tel:+639274910531"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
              >
                <Phone size={15} className="shrink-0" /> +63 927 491 0531
              </a>
              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end">
                <a
                  href="https://linkedin.com/in/anzelbotin"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                >
                  <ExternalLink size={15} className="shrink-0" /> LinkedIn
                </a>
                <a
                  href="https://github.com/BAILANN-ctrl"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                >
                  <GitHubGlyph size={15} /> GitHub
                </a>
              </div>
            </div>
          </RevealText>
        </div>
      </div>

      {/* Section — experience timeline */}
      <div
        className="border-t py-10 md:py-24"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <h2 className="font-display text-2xl tracking-tight md:sticky md:top-8 md:self-start">
            Experience
          </h2>
          <div className="space-y-10 md:space-y-16">
            {experience.map((job) => (
              <div key={job.role + job.org}>
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4">
                  <h3 className="text-base font-medium leading-snug sm:text-xl md:text-2xl">
                    {job.role} <span style={{ color: "var(--accent)" }}>/</span> {job.org}
                  </h3>
                  <span className="text-sm whitespace-nowrap" style={{ color: "var(--muted)" }}>
                    {job.period}
                  </span>
                </div>
                <p className="mt-1.5 text-sm" style={{ color: "var(--muted)" }}>
                  {job.location}
                </p>
                <ul
                  className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed sm:mt-4 sm:pl-5 sm:text-base"
                  style={{ color: "var(--muted)" }}
                >
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education + Certifications */}
      <div
        className="border-t py-10 md:py-24"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <h2 className="font-display text-2xl tracking-tight md:sticky md:top-8 md:self-start">
            Education <span style={{ color: "var(--accent)" }}>&amp;</span> Certifications
          </h2>
          <div>
            <h3 className="text-lg font-medium sm:text-xl">BS in Information Technology</h3>
            <p className="mt-1 text-base" style={{ color: "var(--muted)" }}>
              STI College Legazpi
            </p>
            <p className="mt-2 text-base" style={{ color: "var(--muted)" }}>
              Former President&apos;s Lister <span style={{ color: "var(--accent)" }}>/</span> National Finalist, Essay Does It
              2024
            </p>
            <div className="mt-8 space-y-4 sm:mt-10">
              {certifications.map((cert) => (
                <div key={cert.name}>
                  <h3 className="text-base font-medium sm:text-lg">{cert.name}</h3>
                  <p className="mt-1 text-base" style={{ color: "var(--muted)" }}>
                    {cert.issuer}
                  </p>
                  <p className="text-base" style={{ color: "var(--muted)" }}>
                    {cert.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills — asymmetric bento */}
      <div
        className="border-t py-10 md:py-24"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="grid gap-6 md:grid-cols-[200px_1fr] md:gap-12">
          <h2 className="font-display text-2xl tracking-tight md:sticky md:top-8 md:self-start">
            Skills
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Object.entries(skills).map(([category, items], i) => (
              <div
                key={category}
                className="p-5 sm:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  borderRadius: i === 0 ? "1.75rem" : "1.25rem",
                }}
              >
                <h3
                  className="text-xs font-medium uppercase tracking-[0.15em]"
                  style={{ color: "var(--accent)" }}
                >
                  {category}
                </h3>
                <ul className="mt-4 space-y-2 text-base">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-8 md:mt-12 md:pt-10" style={{ borderColor: "var(--border)" }}>
        <a
          href="/Resume - Botin, Anzel Victor F.pdf"
          className="group btn-primary w-full justify-center md:w-auto"
        >
          Download resume
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-0.5"
            style={{ background: "rgba(5,5,10,0.15)" }}
          >
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
