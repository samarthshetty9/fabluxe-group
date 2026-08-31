import { createFileRoute, Link } from "@tanstack/react-router";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusChip } from "@/components/admin/AdminStatusChip";
import { useAdmin, ROLE_SUMMARY } from "@/lib/admin/session";
import posts from "@/data/posts.json";
import csr from "@/data/csr.json";
import projects from "@/data/projects.json";
import awards from "@/data/awards.json";
import reviews from "@/data/reviews.json";
import sustainability from "@/data/sustainability.json";
import enquiries from "@/data/admin-enquiries.json";
import activity from "@/data/admin-activity.json";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin dashboard — Fabluxe Group" },
      { name: "description", content: "Content counts, recent enquiries and recent activity for the Fabluxe Group site." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin dashboard — Fabluxe Group" },
      { property: "og:description", content: "Content counts, recent enquiries and recent activity." },
    ],
  }),
  component: AdminDashboard,
});

const counts = [
  { label: "Blog posts", value: posts.length, to: "/admin/blog" as const },
  { label: "CSR updates", value: csr.length, to: "/admin/csr" as const },
  { label: "Initiatives", value: (sustainability as { initiatives: unknown[] }).initiatives.length, to: "/admin/sustainability" as const },
  { label: "Projects", value: projects.length, to: "/admin/projects" as const },
  { label: "Awards", value: awards.length, to: "/admin/awards" as const },
  { label: "Client reviews", value: reviews.length, to: "/admin/reviews" as const },
];

function AdminDashboard() {
  const { session, role } = useAdmin();
  const openEnquiries = enquiries.filter((e) => e.status !== "Closed").length;

  return (
    <AdminShell
      title={`Good morning, ${session?.name.split(" ")[0] ?? "there"}.`}
      breadcrumb={["Admin", "Dashboard"]}
      description={ROLE_SUMMARY[role]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {counts.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="rounded-sm border border-border bg-surface p-4 transition-colors hover:border-border-strong"
          >
            <p className="font-display text-3xl text-navy">{c.value}</p>
            <p className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {c.label}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <section className="rounded-sm border border-border bg-surface lg:col-span-3">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="font-display text-lg text-navy">Recent enquiries</h2>
              <p className="text-xs text-muted-foreground">{openEnquiries} still open</p>
            </div>
            <Link
              to="/admin/enquiries"
              className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-teal hover:text-navy"
            >
              View all
            </Link>
          </header>
          <ul className="divide-y divide-border">
            {enquiries.slice(0, 5).map((e) => (
              <li key={e.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy">
                    {e.name}
                    {e.company ? <span className="text-muted-foreground"> · {e.company}</span> : null}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{e.message}</p>
                  <p className="mt-1 text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {e.enquiryType} · {e.date} · {e.id}
                  </p>
                </div>
                <AdminStatusChip status={e.status} />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-sm border border-border bg-surface lg:col-span-2">
          <header className="border-b border-border px-4 py-3">
            <h2 className="font-display text-lg text-navy">Recent activity</h2>
            <p className="text-xs text-muted-foreground">Across all content managers</p>
          </header>
          <ol className="divide-y divide-border">
            {activity.map((a) => (
              <li key={a.id} className="px-4 py-3">
                <p className="text-sm text-foreground">
                  <span className="font-medium text-navy">{a.actor}</span> {a.action}{" "}
                  <span className="text-navy">{a.target}</span>
                </p>
                <p className="mt-0.5 text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {a.when}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </AdminShell>
  );
}
