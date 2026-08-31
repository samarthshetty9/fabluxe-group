import { createFileRoute } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { ContentManager, type ManagedRecord } from "@/components/admin/ContentManager";
import reviews from "@/data/reviews.json";

type Review = {
  id: string;
  rating: number;
  quote: string;
  name: string;
  projectType: string;
  location: string;
  date: string;
};

export const Route = createFileRoute("/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Client reviews — Fabluxe Admin" },
      { name: "description", content: "Approve or hide client reviews for Fabluxora Interiors." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Client reviews — Fabluxe Admin" },
      { property: "og:description", content: "Approve or hide client reviews for Fabluxora Interiors." },
    ],
  }),
  component: AdminReviews,
});

const records: ManagedRecord[] = (reviews as Review[]).map((r, i) => ({
  id: r.id,
  title: `${"★".repeat(r.rating)} — ${r.name}`,
  meta: r.projectType,
  secondary: r.location,
  status: i === 1 ? "Pending" : i === 4 ? "Hidden" : "Approved",
  date: r.date,
  body: r.quote,
}));

function AdminReviews() {
  return (
    <AdminShell
      title="Client reviews"
      breadcrumb={["Admin", "Content", "Client reviews"]}
      description="Reviews collected after handover. Only approved reviews appear on the public page."
    >
      <ContentManager
        entity="review"
        records={records}
        statuses={["Approved", "Pending", "Hidden"]}
        labels={{ title: "Rating and client", meta: "Project type", secondary: "Location", date: "Received" }}
        bodyLabel="Review quote"
        moderation
      />
    </AdminShell>
  );
}
