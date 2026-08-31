import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ProjectCard, type Project } from "@/components/cards/ProjectCard";
import {
  ProjectFilterBar,
  projectFilters,
  type ProjectFilter,
} from "@/components/projects/ProjectFilterBar";
import projectsData from "@/data/projects.json";

const title = "Projects — Fabluxora Interiors";
const description =
  "Residential, workplace and hospitality projects delivered by Fabluxora Interiors across Mumbai, Pune, Bengaluru, Goa and Alibaug. Filter by type or status.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProjectsPage,
});

const projects = projectsData as Project[];

function matches(project: Project, filter: ProjectFilter) {
  if (filter === "All") return true;
  return project.type === filter || project.status === filter;
}

function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>("All");

  const counts = useMemo(
    () =>
      Object.fromEntries(
        projectFilters.map((f) => [f, projects.filter((p) => matches(p, f)).length]),
      ),
    [],
  );

  const visible = projects.filter((project) => matches(project, filter));

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work delivered by Fabluxora Interiors."
        intro="Homes, workplaces and hospitality across seven cities. Every project below was designed and built by the same team, from first measurement to final snag."
      />

      <Section tone="beige">
        <Reveal>
          <ProjectFilterBar active={filter} onChange={setFilter} counts={counts} />
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, i) => (
            <Reveal key={project.id} delay={Math.min(i * 60, 240)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        {visible.length === 0 ? (
          <p className="mt-14 text-teal">No projects match that filter yet.</p>
        ) : null}
      </Section>
    </>
  );
}
