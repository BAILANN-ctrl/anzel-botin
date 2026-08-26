import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-6 md:py-8">
      <p
        className="text-xs font-medium uppercase tracking-[0.2em]"
        style={{ color: "var(--accent)" }}
      >
        Work
      </p>
      <h1 className="font-display mt-4 text-3xl md:text-5xl">All projects</h1>
      <p
        className="mt-4 max-w-lg text-base leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        A selection of projects I&apos;ve built, from full-stack platforms to
        interactive tools.
      </p>
      <div className="mt-10 grid gap-5 md:mt-12 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
