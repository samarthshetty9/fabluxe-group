import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager, type ManagedRecord } from "@/components/admin/ContentManager";
import awards from "@/data/awards.json";

type Award = {
  id: string;
  title: string;
  awardingBody: string;
  category: string;
  company: string;
  year: string;
  note: string;
  image?: string;
};

export const Route = createFileRoute("/admin/awards")({
  head: () => ({
    meta: [
      { title: "Awards — Fabluxe Admin" },
      { name: "description", content: "Manage awards, awarding bodies and citation notes." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Awards — Fabluxe Admin" },
      { property: "og:description", content: "Manage awards, awarding bodies and citation notes." },
    ],
  }),
  component: AdminAwards,
});

const records: ManagedRecord[] = (awards as Award[]).map((a, i) => ({
  id: a.id,
  title: a.title,
  meta: a.category,
  secondary: a.awardingBody,
  status: i === 2 ? "Draft" : "Published",
  date: a.year,
  image: a.image,
  body: a.note,
}));

function AdminAwards() {
  return (
    <AdminShell
      title="Awards"
      breadcrumb={["Admin", "Content", "Awards"]}
      description="Grouped by year on the public page. Add the awarding body and a short citation note."
    >
      <ContentManager
        entity="award"
        records={records}
        statuses={["Published", "Draft", "Archived"]}
        labels={{ title: "Award", meta: "Category", secondary: "Awarding body", date: "Year" }}
        bodyLabel="Citation note"
      />
    </AdminShell>
  );
}
