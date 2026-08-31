import { createFileRoute, notFound, Link } from "@tanstack/react-router";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { ActionLink } from "@/components/primitives/ActionLink";
import { StatusChip } from "@/components/primitives/StatusChip";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { getImage } from "@/lib/images";
import projectsData from "@/data/projects.json";
import type { Project } from "@/components/cards/ProjectCard";

const projects = projectsData as Project[];

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = projects.find((item) => item.id === params.projectId);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found — Fabluxora Interiors" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Fabluxora Interiors`;
    const description = `${project.type} project in ${project.location}, ${project.area}, ${project.status.toLowerCase()} ${project.year}. ${project.scope}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
  component: ProjectDetailPage,
});

function ProjectNotFound() {
  return (
    <Section tone="beige" size="large">
      <div className="flex flex-col items-start gap-6 pt-20">
        <EyebrowLabel>Projects</EyebrowLabel>
        <h1 className="font-display text-display-sm text-navy">We can't find that project.</h1>
        <p className="max-w-md text-teal">
          It may have been renamed. The full list of Fabluxora Interiors work is one click away.
        </p>
        <ActionLink href="/projects" variant="outline">
          Back to all projects
        </ActionLink>
      </div>
    </Section>
  );
}

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  const meta = [
    { label: "Location", value: project.location },
    { label: "Type", value: project.type },
    { label: "Area", value: project.area },
    { label: "Year", value: project.year },
    { label: "Status", value: project.status },
  ];

  return (
    <>
      <section className="relative">
        <img
          src={getImage(project.image)}
          alt={`${project.title}, ${project.location}`}
          width={1600}
          height={900}
          className="h-[70vh] min-h-96 w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="shell flex flex-col gap-5 pb-16">
            <EyebrowLabel tone="light">{project.company}</EyebrowLabel>
            <h1 className="max-w-3xl font-display text-display-md text-on-dark">
              {project.title}
            </h1>
            <StatusChip status={project.status} className="self-start" />
          </div>
        </div>
      </section>

      <Section tone="beige">
        <dl className="grid gap-8 border-y border-border py-10 sm:grid-cols-3 lg:grid-cols-5">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="text-eyebrow font-semibold uppercase text-teal">{item.label}</dt>
              <dd className="font-display text-xl text-navy">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <EyebrowLabel>The brief</EyebrowLabel>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <p className="max-w-2xl text-lg text-teal">{project.description}</p>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <Reveal>
          <EyebrowLabel>Gallery</EyebrowLabel>
        </Reveal>
        <div className="mt-8">
          <Reveal delay={60}>
            <ProjectGallery images={project.gallery} title={project.title} />
          </Reveal>
        </div>
      </Section>

      <Section tone="navy">
        <div className="flex flex-col items-start gap-6">
          <EyebrowLabel tone="light">Enquiries</EyebrowLabel>
          <h2 className="max-w-2xl font-display text-display-sm text-on-dark">
            Start a project like this.
          </h2>
          <p className="max-w-xl text-on-dark-muted">
            Tell us the address, the rough size and when you would like to move in. A designer will
            call you back within two working days.
          </p>
          <div className="flex flex-wrap gap-4">
            <ActionLink href="/contact" variant="gold" tone="light">
              Enquire about this project
            </ActionLink>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 border-b border-on-dark-muted/50 pb-1 text-eyebrow font-semibold uppercase text-on-dark-muted transition-colors duration-300 hover:text-gold"
            >
              All projects
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
