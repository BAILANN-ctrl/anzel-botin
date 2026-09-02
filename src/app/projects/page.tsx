import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="px-6 pt-28 pb-8 md:px-14 md:pt-32 lg:px-20">
      <h1 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[1] tracking-[-0.03em]">
        All projects
      </h1>
      <p
        className="mt-6 max-w-lg text-lg leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        A selection of projects I&apos;ve built, from full-stack platforms to
        interactive tools.
      </p>
      <div className="mt-14 md:mt-16">
        {/* First project — full width */}
        <div className="mb-6">
          <ProjectCard project={projects[0]} fullWidth />
        </div>
        {/* Rest — 2-col asymmetric */}
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.slice(1).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
