import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, GitFork, ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";

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

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm hover:underline"
        style={{ color: "var(--muted)" }}
      >
        <ArrowLeft size={14} /> Back to all work
      </Link>

      <h1 className="font-display mt-6 text-3xl md:mt-8 md:text-5xl">
        {project.name}
      </h1>
      <p className="mt-3 max-w-xl text-base md:mt-4 md:text-lg" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 md:mt-6">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border px-2.5 py-0.5 text-[11px] md:px-3 md:py-1 md:text-xs"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors hover:border-[var(--ink)]"
            style={{ borderColor: "var(--border)" }}
          >
            <GitFork size={16} /> Source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ink)" }}
          >
            <ArrowUpRight size={16} /> Live demo
          </a>
        )}
      </div>
    </div>
  );
}
