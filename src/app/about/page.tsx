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

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="border-t py-12 md:grid md:grid-cols-[180px_1fr] md:gap-10"
      style={{ borderColor: "var(--border)" }}
    >
      <h2 className="font-display text-2xl md:sticky md:top-8 md:self-start">
        {label}
      </h2>
      <div className="mt-6 md:mt-0">{children}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      {/* Intro */}
      <div className="grid gap-6 pb-10 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <RevealText
            as="p"
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            About
          </RevealText>
          <RevealText as="h1" delay={80} className="font-display mt-4 text-4xl leading-tight md:text-5xl">
            Full-stack developer, three years in production.
          </RevealText>
          <RevealText as="p" delay={160} className="mt-6 text-lg leading-relaxed md:max-w-xl" style={{ color: "var(--muted)" }}>
            Shipped features end-to-end across React, Next.js, Node.js, and
            MySQL - from database design to deployment - for a commercial
            studio and a regional government office. Comfortable owning a
            feature independently and communicating progress clearly.
          </RevealText>
        </div>

        <RevealText as="div" delay={240}>
          <div
            className="flex flex-wrap gap-x-5 gap-y-3 text-sm md:flex-col md:items-end md:text-right"
            style={{ color: "var(--muted)" }}
          >
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <MapPin size={15} /> Albay, Philippines
            </span>
            <a
              href="mailto:anzelbotin@gmail.com"
              className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[var(--accent)]"
            >
              <Mail size={15} /> anzelbotin@gmail.com
            </a>
            <a
              href="tel:+639274910531"
              className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[var(--accent)]"
            >
              <Phone size={15} /> +63 927 491 0531
            </a>
            <a
              href="https://linkedin.com/in/anzelbotin"
              className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[var(--accent)]"
            >
              <ExternalLink size={15} /> LinkedIn
            </a>
            <a
              href="https://github.com/BAILANN-ctrl"
              className="inline-flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[var(--accent)]"
            >
              <GitHubGlyph size={15} /> GitHub
            </a>
          </div>
        </RevealText>
      </div>

      {/* Experience */}
      <Section label="Experience">
        <div className="space-y-10">
          {experience.map((job) => (
            <div key={job.role + job.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {job.role} <span style={{ color: "var(--accent)" }}>/</span> {job.org}
                </h3>
                <span className="text-sm" style={{ color: "var(--muted)" }}>
                  {job.period}
                </span>
              </div>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {job.location}
              </p>
              <ul
                className="mt-3 list-disc space-y-1.5 pl-5 text-sm"
                style={{ color: "var(--muted)" }}
              >
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section label="Education">
        <h3 className="font-medium">BS in Information Technology</h3>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          STI College Legazpi
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
          Former President&apos;s Lister <span style={{ color: "var(--accent)" }}>/</span> National Finalist, Essay Does It
          2024
        </p>
      </Section>

      {/* Skills */}
      <Section label="Skills">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3
                className="text-xs font-medium uppercase tracking-[0.15em]"
                style={{ color: "var(--accent)" }}
              >
                {category}
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm">
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section label="Certifications">
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.name}>
              <h3 className="font-medium">{cert.name}</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {cert.issuer}
              </p>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {cert.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <div className="mt-12 border-t pt-10" style={{ borderColor: "var(--border)" }}>
        <a
          href="/Resume - Botin, Anzel Victor F.pdf"
          className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.02] hover:shadow-lg"
          style={{
            background: "var(--accent)",
            boxShadow: "0 4px 24px -4px var(--accent)",
          }}
        >
          Download resume
          <span className="inline-block transition-transform group-hover:translate-x-0.5">
            &rarr;
          </span>
        </a>
      </div>
    </div>
  );
}
