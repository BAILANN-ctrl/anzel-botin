import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GitFork } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project, fullWidth }: { project: Project; fullWidth?: boolean }) {
  const thumbnail = project.images?.[0] ?? null;

  return (
    <div
      className="group relative overflow-hidden p-1.5 transition-all duration-500"
      style={{
        borderRadius: "1.75rem",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), var(--shadow-card)",
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Thumbnail */}
      {thumbnail && (
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "calc(1.75rem - 0.375rem)",
            aspectRatio: fullWidth ? "21/9" : "16/10",
          }}
        >
          <Image
            src={thumbnail}
            alt={`${project.name} preview`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes={fullWidth ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
          />
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: "linear-gradient(to top, #0b0b13 0%, transparent 40%)",
            }}
          />
        </div>
      )}

      <div
        className="p-6 md:p-8"
        style={{
          borderRadius: "calc(1.75rem - 0.375rem)",
          background: "rgba(5,5,10,0.55)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link
              href={`/projects/${project.slug}`}
              className="font-display text-xl transition-colors hover:text-[var(--accent)] md:text-2xl"
            >
              {project.name}
            </Link>
            {project.role && (
              <p className="mt-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
                {project.role}
              </p>
            )}
            <p className="mt-2 max-w-lg text-sm leading-relaxed md:text-base" style={{ color: "var(--muted)" }}>
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
              className="rounded-full border px-3 py-1 text-xs transition-colors"
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
