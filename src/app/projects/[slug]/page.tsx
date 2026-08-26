import { notFound } from "next/navigation";
import { ArrowUpRight, GitFork } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectHero from "@/components/ProjectHero";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import ScreenshotGallery from "@/components/ScreenshotGallery";

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
  const hasHeroVideo = !!project.heroVideo;
  const hero = hasHeroVideo ? null : images[0] ?? null;
  const remaining = hasHeroVideo ? images : images.slice(1);

  return (
    <>
      <ReadingProgressBar />

      <ProjectHero
        hero={hero ?? null}
        heroVideo={project.heroVideo}
        projectName={project.name}
      />

      <div className="mx-auto max-w-6xl px-5 pt-16 pb-8 sm:px-6 md:pt-24 md:pb-12">
        <div className="max-w-3xl">
          <p
            className="text-xs font-medium uppercase tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            {project.role ?? "Project"}
          </p>
          <h1 className="font-display mt-3 text-3xl leading-tight md:text-5xl">
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
                className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-all hover:border-[var(--ink)]"
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
                className="group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition-all hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 4px 24px -4px var(--accent)",
                }}
              >
                <ArrowUpRight size={16} /> Visit site
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </a>
            )}
          </div>
        </div>

        {remaining.length > 0 && (
          <ScreenshotGallery images={remaining} projectName={project.name} />
        )}
      </div>
    </>
  );
}
