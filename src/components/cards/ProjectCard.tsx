import { Link } from "@tanstack/react-router";
import { getImage } from "@/lib/images";
import { StatusChip } from "@/components/primitives/StatusChip";

export type Project = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: string;
  area: string;
  year: string;
  scope: string;
  image: string;
  gallery: string[];
  description: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col gap-5">
      <Link
        to="/projects/$projectId"
        params={{ projectId: project.id }}
        className="flex flex-col gap-5"
      >
        <div className="relative overflow-hidden bg-sky">
          <img
            src={getImage(project.image)}
            alt={`${project.title}, ${project.location}`}
            loading="lazy"
            width={1000}
            height={1200}
            className="media-zoom aspect-4/5 w-full object-cover"
          />
          <StatusChip status={project.status} className="absolute left-4 top-4" />
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-eyebrow font-semibold uppercase text-teal">
            {project.location} · {project.type} · {project.year}
          </p>
          <h3 className="font-display text-2xl text-navy transition-colors duration-300 group-hover:text-teal">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground">{project.scope}</p>
        </div>
      </Link>
    </article>
  );
}
