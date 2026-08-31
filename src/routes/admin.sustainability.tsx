import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager, type ManagedRecord } from "@/components/admin/ContentManager";
import sustainability from "@/data/sustainability.json";

type Initiative = {
  id: string;
  title: string;
  image: string;
  description: string;
  figure?: string;
  figureLabel?: string;
};

export const Route = createFileRoute("/admin/sustainability")({
  head: () => ({
    meta: [
      { title: "Sustainability initiatives — Fabluxe Admin" },
      { name: "description", content: "Manage sustainability initiatives and impact figures." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Sustainability initiatives — Fabluxe Admin" },
      { property: "og:description", content: "Manage sustainability initiatives and impact figures." },
    ],
  }),
  component: AdminSustainability,
});

const initiatives = (sustainability as { initiatives: Initiative[] }).initiatives;

const records: ManagedRecord[] = initiatives.map((item, i) => ({
  id: item.id,
  title: item.title,
  meta: item.figure ?? "—",
  secondary: item.figureLabel ?? "Group programme",
  status: i === initiatives.length - 1 ? "Draft" : "Live",
  date: "2026",
  image: item.image,
  body: item.description,
}));

function AdminSustainability() {
  return (
    <AdminShell
      title="Sustainability initiatives"
      breadcrumb={["Admin", "Content", "Sustainability"]}
      description="Initiative cards and their impact figures, plus the commitments list on the public page."
    >
      <ContentManager
        entity="initiative"
        records={records}
        statuses={["Live", "Draft", "Archived"]}
        labels={{ title: "Initiative", meta: "Impact figure", secondary: "Figure label", date: "Reporting year" }}
        bodyLabel="Initiative description"
      />
    </AdminShell>
  );
}
