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
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1 text-sm hover:underline"
        style={{ color: "var(--muted)" }}
      >
        <ArrowLeft size={14} /> Back to all work
      </Link>

      <h1 className="font-display mt-8 text-4xl md:text-5xl">
        {project.name}
      </h1>
      <p className="mt-4 max-w-xl text-lg" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border px-3 py-1 text-xs"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-10 flex gap-4">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors hover:border-[var(--ink)]"
            style={{ borderColor: "var(--border)" }}
          >
            <GitFork size={16} /> Source
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--ink)" }}
          >
            <ArrowUpRight size={16} /> Live demo
          </a>
        )}
      </div>
    </div>
  );
}
