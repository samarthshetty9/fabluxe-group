import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager, type ManagedRecord } from "@/components/admin/ContentManager";
import csr from "@/data/csr.json";

type CsrUpdate = {
  id: string;
  title: string;
  location: string;
  partner: string;
  date: string;
  image: string;
  summary: string;
};

export const Route = createFileRoute("/admin/csr")({
  head: () => ({
    meta: [
      { title: "CSR updates — Fabluxe Admin" },
      { name: "description", content: "Manage the Fabluxe Group CSR update feed." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "CSR updates — Fabluxe Admin" },
      { property: "og:description", content: "Manage the Fabluxe Group CSR update feed." },
    ],
  }),
  component: AdminCsr,
});

const records: ManagedRecord[] = (csr as CsrUpdate[]).map((c, i) => ({
  id: c.id,
  title: c.title,
  meta: c.location,
  secondary: c.partner,
  status: i === 0 ? "Published" : i === 1 ? "Draft" : "Published",
  date: c.date,
  image: c.image,
  body: c.summary,
}));

function AdminCsr() {
  return (
    <AdminShell
      title="CSR updates"
      breadcrumb={["Admin", "Content", "CSR updates"]}
      description="Community programme updates shown on the public CSR feed, newest first."
    >
      <ContentManager
        entity="CSR update"
        records={records}
        statuses={["Published", "Draft", "Archived"]}
        labels={{ title: "Update title", meta: "Location", secondary: "Partner", date: "Published" }}
        bodyLabel="Update body"
      />
    </AdminShell>
  );
}
