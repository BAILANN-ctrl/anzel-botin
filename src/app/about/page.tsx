import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const skills = {
  Frontend: ["React", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "REST API Development", "MySQL", "Database Design"],
};

const experience = [
  {
    role: "Web Developer",
    org: "Studio Kosmos IT",
    location: "Legazpi City, Albay",
    period: "March 2025 – Present",
    bullets: [
      "Collaborate on the company website (React, Next.js, Tailwind CSS, Node.js, MySQL).",
      "Independently built a photo selection system that digitized a manual queue workflow, cutting customer wait time by an estimated 30–40%.",
      "Designed and managed MySQL databases and built backend APIs with Node.js.",
    ],
  },
  {
    role: "Web Development Intern (OJT)",
    org: "Department of Economy, Planning and Development — Development Research Division",
    location: "Legazpi City, Albay",
    period: "February 2026 – June 2026",
    bullets: [
      "Focused on backend development for government information systems within the Development Research Division.",
      "Contributed to a Library Management Information System (LMIS) with an admin panel for digital archiving, enabling organized storage and public access to digitized library resources.",
      "Developed and supported a Bicol Socio-Economic and Physical Profile (SEPP) system managing regional development data across time periods, with structured public-facing data presentation.",
      "Designed and managed MySQL databases to support accurate data storage, retrieval, and organization.",
    ],
  },
];

const certifications = [
  {
    name: "SAP S/4HANA Fundamentals (Global Bike)",
    issuer: "SAP University Alliances",
    detail: "Modules: SD, MM, PP, FI, CO — February to June 2024",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm uppercase tracking-widest" style={{ color: "var(--muted)" }}>
        About
      </p>
      <h1 className="font-display mt-4 text-4xl md:text-5xl">
        Anzel Victor F. Botin
      </h1>

      <div
        className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6"
        style={{ color: "var(--muted)" }}
      >
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={15} /> Albay, Philippines
        </span>
        <a
          href="mailto:anzelbotin@gmail.com"
          className="inline-flex items-center gap-1.5 hover:text-(--ink)"
        >
          <Mail size={15} /> anzelbotin@gmail.com
        </a>
        <a
          href="tel:+639274910531"
          className="inline-flex items-center gap-1.5 hover:text-(--ink)"
        >
          <Phone size={15} /> +63 927 491 0531
        </a>
        <a
          href="https://linkedin.com/in/anzelbotin"
          className="inline-flex items-center gap-1.5 hover:text-(--ink)"
        >
          <ExternalLink size={15} /> LinkedIn
        </a>
      </div>

      <p className="mt-8 max-w-xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
        Full-stack developer with hands-on experience building production web
        applications using React, Next.js, Node.js, and MySQL. Proven ability
        to independently design and ship full features, from database
        architecture to deployment, with openness to growth across the
        stack.
      </p>

      {/* Experience */}
      <div className="mt-16">
        <h2 className="font-display text-2xl">Experience</h2>
        <div className="mt-6 space-y-10">
          {experience.map((job) => (
            <div key={job.role + job.org}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {job.role} · {job.org}
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
      </div>

      {/* Education */}
      <div className="mt-16">
        <h2 className="font-display text-2xl">Education</h2>
        <div className="mt-6">
          <h3 className="font-medium">BS in Information Technology</h3>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            STI College Legazpi · GWA 1.69
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            Former President&apos;s Lister · National Finalist, Essay Does It
            2024
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-16">
        <h2 className="font-display text-2xl">Skills</h2>
        <div className="mt-6 grid gap-8 grid-cols-1 sm:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <h3
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: "var(--muted)" }}
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
      </div>

      {/* Certifications */}
      <div className="mt-16">
        <h2 className="font-display text-2xl">Certifications</h2>
        <div className="mt-6 space-y-4">
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
      </div>

      <div className="mt-16">
        <a
          href="/resume.pdf"
          className="inline-block rounded-full px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--ink)" }}
        >
          Download resume →
        </a>
      </div>
    </div>
  );
}
