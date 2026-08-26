import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GitFork } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const thumbnail = project.images?.[0] ?? null;

  return (
    <div
      className="group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-[var(--ink)] hover:shadow-lg"
      style={{
        borderColor: "var(--border)",
        background: "var(--bg-raised)",
      }}
    >
      {/* Thumbnail */}
      {thumbnail && (
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={`${project.name} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `linear-gradient(to top, var(--bg-raised) 0%, transparent 40%)`,
            }}
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={`/projects/${project.slug}`}
              className="font-display text-xl transition-colors hover:text-[var(--accent)]"
            >
              {project.name}
            </Link>
            {project.role && (
              <p className="mt-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
                {project.role}
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
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

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border px-3 py-1 text-xs transition-colors group-hover:border-[var(--border)]"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
