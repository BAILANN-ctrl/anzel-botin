import Link from "next/link";
import { ArrowUpRight, GitFork } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      className="group rounded-2xl border p-6 transition-colors hover:border-[var(--ink)]"
      style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <Link
            href={`/projects/${project.slug}`}
            className="font-display text-xl hover:underline"
          >
            {project.name}
          </Link>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {project.oneLiner}
          </p>
        </div>
        <div className="flex shrink-0 gap-3 pt-1">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              aria-label={`${project.name} repository`}
              style={{ color: "var(--muted)" }}
              className="transition-colors hover:text-[var(--ink)]"
            >
              <GitFork size={17} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              aria-label={`${project.name} live demo`}
              style={{ color: "var(--muted)" }}
              className="transition-colors hover:text-[var(--ink)]"
            >
              <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
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
    </div>
  );
}
