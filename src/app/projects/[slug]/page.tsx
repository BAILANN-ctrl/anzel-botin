import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, GitFork } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectHero from "@/components/ProjectHero";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const images = project.images ?? [];
  const [hero, ...remaining] = images;

  return (
    <>
      {/* ── Full-width hero under navbar ── */}
      <ProjectHero hero={hero ?? null} heroVideo={project.heroVideo} projectName={project.name} description={project.oneLiner} />

      {/* ── Project info ── */}
      <div className="mx-auto max-w-6xl pt-16 pb-8 md:pt-24 md:pb-12">
       <div className="max-w-3xl">
          <h1 className="font-display text-3xl leading-tight md:text-5xl">
            {project.name}
          </h1>

          <p
            className="mt-4 text-base font-medium md:text-lg md:leading-relaxed"
            style={{ color: "var(--ink)" }}
          >
            {project.oneLiner}
          </p>

          <p
            className="mt-4 text-base leading-relaxed md:text-lg"
            style={{ color: "var(--muted)" }}
          >
            {project.description}
          </p>

          {/* Stack tags */}
          <div className="mt-6 flex flex-wrap gap-2 md:mt-8">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border px-3 py-1 text-[11px] md:px-4 md:py-1.5 md:text-xs"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors hover:border-[var(--ink)]"
                style={{ borderColor: "var(--border)" }}
              >
                <GitFork size={16} /> Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--ink)" }}
              >
                <ArrowUpRight size={16} /> Live demo
              </a>
            )}
          </div>

          {/* ── Remaining screenshots ── */}
          {remaining.length > 0 && (
            <div className="mt-14 md:mt-20">
              <h2
                className="mb-6 text-xs font-medium uppercase tracking-widest md:mb-8"
                style={{ color: "var(--muted)" }}
              >
                More screenshots
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {remaining.map((src, i) => (
                  <div
                    key={src}
                    className="relative aspect-video overflow-hidden rounded-xl border"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <Image
                      src={src}
                      alt={`${project.name} screenshot ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
