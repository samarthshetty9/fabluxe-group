import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager, type ManagedRecord } from "@/components/admin/ContentManager";
import projects from "@/data/projects.json";

type Project = {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  year: string;
  image: string;
  description: string;
};

export const Route = createFileRoute("/admin/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Fabluxe Admin" },
      { name: "description", content: "Manage ongoing and completed Fabluxora Interiors projects." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Projects — Fabluxe Admin" },
      { property: "og:description", content: "Manage ongoing and completed Fabluxora Interiors projects." },
    ],
  }),
  component: AdminProjects,
});

const records: ManagedRecord[] = (projects as Project[]).map((p) => ({
  id: p.id,
  title: p.title,
  meta: p.type,
  secondary: p.location,
  status: p.status,
  date: p.year,
  image: p.image,
  body: p.description,
}));

function AdminProjects() {
  return (
    <AdminShell
      title="Projects"
      breadcrumb={["Admin", "Content", "Projects"]}
      description="Fabluxora Interiors portfolio. Ongoing projects appear on the public grid with a teal chip."
    >
      <ContentManager
        entity="project"
        records={records}
        statuses={["Ongoing", "Completed", "Draft"]}
        labels={{ title: "Project", meta: "Type", secondary: "Location", date: "Year" }}
        bodyLabel="Project description"
      />
    </AdminShell>
  );
}
