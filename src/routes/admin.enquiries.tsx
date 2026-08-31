import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusChip } from "@/components/admin/AdminStatusChip";
import { useAdmin } from "@/lib/admin/session";
import enquiriesData from "@/data/admin-enquiries.json";

type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  enquiryType: string;
  message: string;
  date: string;
  status: string;
};

const STATUSES = ["New", "In progress", "Closed"];

export const Route = createFileRoute("/admin/enquiries")({
  head: () => ({
    meta: [
      { title: "B2B enquiries — Fabluxe Admin" },
      { name: "description", content: "Track and triage B2B enquiries submitted from the public contact page." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "B2B enquiries — Fabluxe Admin" },
      { property: "og:description", content: "Track and triage B2B enquiries from the contact page." },
    ],
  }),
  component: AdminEnquiries,
});

function AdminEnquiries() {
  const { can, role } = useAdmin();
  const [rows, setRows] = useState<Enquiry[]>(enquiriesData as Enquiry[]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (status === "All" || r.status === status) &&
        (q === "" ||
          `${r.name} ${r.email} ${r.company} ${r.message} ${r.id}`.toLowerCase().includes(q)),
    );
  }, [rows, query, status]);

  return (
    <AdminShell
      title="B2B enquiries"
      breadcrumb={["Admin", "Operations", "Enquiries"]}
      description="Submissions from the public contact form. // TODO: integrate with SixOrbit — client's existing enquiry system."
    >
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, company, message…"
          aria-label="Search enquiries"
          className="h-9 w-full max-w-xs rounded-xs border border-border-strong bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="h-9 rounded-xs border border-border-strong bg-surface px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          {["All", ...STATUSES].map((s) => (
            <option key={s}>{s === "All" ? "All statuses" : s}</option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground">
          {filtered.length} of {rows.length}
        </span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-sm border border-border bg-surface">
        <table className="w-full min-w-[60rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              <th className="px-4 py-2.5 font-semibold">Name</th>
              <th className="px-4 py-2.5 font-semibold">Email</th>
              <th className="px-4 py-2.5 font-semibold">Phone</th>
              <th className="px-4 py-2.5 font-semibold">Message</th>
              <th className="px-4 py-2.5 font-semibold">Date</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b border-border/70 align-top last:border-0">
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setOpen(open === r.id ? null : r.id)}
                    className="text-left font-medium text-navy underline-offset-2 hover:underline"
                  >
                    {r.name}
                  </button>
                  <p className="text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                    {r.company || "Individual"} · {r.enquiryType}
                  </p>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{r.email}</td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{r.phone}</td>
                <td className="max-w-md px-4 py-3 text-muted-foreground">
                  <span className={open === r.id ? "" : "line-clamp-2"}>{r.message}</span>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{r.date}</td>
                <td className="px-4 py-3">
                  {can.edit ? (
                    <select
                      value={r.status}
                      aria-label={`Status for ${r.name}`}
                      onChange={(e) =>
                        setRows((prev) =>
                          prev.map((x) => (x.id === r.id ? { ...x, status: e.target.value } : x)),
                        )
                      }
                      className="h-8 rounded-xs border border-border-strong bg-surface px-2 text-xs outline-none focus:ring-2 focus:ring-ring"
                    >
                      {STATUSES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  ) : (
                    <AdminStatusChip status={r.status} />
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No enquiries match this search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {!can.edit ? (
        <p className="mt-3 text-xs text-muted-foreground">
          {role} access is read only — enquiry status cannot be changed.
        </p>
      ) : null}
    </AdminShell>
  );
}
