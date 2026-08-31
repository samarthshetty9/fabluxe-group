import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusChip } from "@/components/admin/AdminStatusChip";
import { NoAccess } from "@/components/admin/NoAccess";
import { ADMIN_ROLES, ROLE_SUMMARY, useAdmin, type AdminRole } from "@/lib/admin/session";
import usersData from "@/data/admin-users.json";

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  lastActive: string;
  status: string;
};

export const Route = createFileRoute("/admin/users")({
  head: () => ({
    meta: [
      { title: "Users and access — Fabluxe Admin" },
      { name: "description", content: "Manage admin users and assign Director, Editor or Viewer roles." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Users and access — Fabluxe Admin" },
      { property: "og:description", content: "Manage admin users and assign roles." },
    ],
  }),
  component: AdminUsers,
});

function AdminUsers() {
  const { can } = useAdmin();
  const [rows, setRows] = useState<AdminUser[]>(usersData as AdminUser[]);
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (roleFilter === "All" || r.role === roleFilter) &&
        (q === "" || `${r.name} ${r.email} ${r.company}`.toLowerCase().includes(q)),
    );
  }, [rows, query, roleFilter]);

  return (
    <AdminShell
      title="Users and access"
      breadcrumb={["Admin", "Operations", "Users and access"]}
      description="Directors only. Roles decide who can publish content and who can manage people."
    >
      {!can.manageUsers ? (
        <NoAccess area="Users and access" />
      ) : (
        <div className="flex flex-col gap-4">
          {notice ? (
            <p className="rounded-xs border border-gold bg-gold/15 px-3 py-2 text-sm text-navy">
              {notice}
            </p>
          ) : null}

          <div className="grid gap-3 sm:grid-cols-3">
            {ADMIN_ROLES.map((r) => (
              <div key={r} className="rounded-sm border border-border bg-surface p-4">
                <p className="font-display text-lg text-navy">{r}</p>
                <p className="mt-1 text-xs text-muted-foreground">{ROLE_SUMMARY[r]}</p>
                <p className="mt-2 text-[0.625rem] uppercase tracking-[0.16em] text-teal">
                  {rows.filter((u) => u.role === r).length} users
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users…"
              aria-label="Search users"
              className="h-9 w-full max-w-xs rounded-xs border border-border-strong bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              aria-label="Filter by role"
              className="h-9 rounded-xs border border-border-strong bg-surface px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {["All", ...ADMIN_ROLES].map((r) => (
                <option key={r}>{r === "All" ? "All roles" : r}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="ml-auto h-9 rounded-xs bg-navy px-4 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-on-dark transition-colors hover:bg-teal"
            >
              Create user
            </button>
          </div>

          <div className="overflow-x-auto rounded-sm border border-border bg-surface">
            <table className="w-full min-w-[48rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  <th className="px-4 py-2.5 font-semibold">Name</th>
                  <th className="px-4 py-2.5 font-semibold">Email</th>
                  <th className="px-4 py-2.5 font-semibold">Role</th>
                  <th className="px-4 py-2.5 font-semibold">Last active</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-navy">{u.name}</p>
                      <p className="text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {u.company}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                    <td className="px-4 py-3">
                      <select
                        value={u.role}
                        aria-label={`Role for ${u.name}`}
                        onChange={(e) =>
                          setRows((prev) =>
                            prev.map((x) => (x.id === u.id ? { ...x, role: e.target.value } : x)),
                          )
                        }
                        className="h-8 rounded-xs border border-border-strong bg-surface px-2 text-xs outline-none focus:ring-2 focus:ring-ring"
                      >
                        {ADMIN_ROLES.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{u.lastActive}</td>
                    <td className="px-4 py-3">
                      <AdminStatusChip status={u.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          setRows((prev) => prev.filter((x) => x.id !== u.id));
                          setNotice(`Removed ${u.name} — prototype only.`);
                        }}
                        className="rounded-xs border border-border-strong px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy transition-colors hover:bg-navy hover:text-on-dark"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {creating ? (
            <CreateUserForm
              onCancel={() => setCreating(false)}
              onCreate={(user) => {
                setRows((prev) => [user, ...prev]);
                setCreating(false);
                setNotice(`Invited ${user.name} as ${user.role} — prototype only.`);
              }}
            />
          ) : null}
        </div>
      )}
    </AdminShell>
  );
}

function CreateUserForm({
  onCancel,
  onCreate,
}: {
  onCancel: () => void;
  onCreate: (user: AdminUser) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("Fabluxe Group");
  const [role, setRole] = useState<AdminRole>("Editor");
  const [error, setError] = useState<string | null>(null);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Create user"
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/60 p-4 py-16"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim().length < 2) return setError("Enter a full name.");
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError("Enter a valid email address.");
          onCreate({
            id: `u-${Date.now()}`,
            name: name.trim(),
            email: email.trim(),
            role,
            company,
            lastActive: "Never",
            status: "Invited",
          });
        }}
        className="w-full max-w-lg rounded-sm border border-border bg-surface"
      >
        <header className="border-b border-border px-5 py-3.5">
          <p className="text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">Directors only</p>
          <h2 className="font-display text-xl text-navy">Create user</h2>
        </header>

        <div className="flex flex-col gap-4 px-5 py-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Full name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 rounded-xs border border-border-strong bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9 rounded-xs border border-border-strong bg-surface px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Entity
            </span>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="h-9 rounded-xs border border-border-strong bg-surface px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option>Fabluxe Group</option>
              <option>Fabluxora Interiors</option>
              <option>Fabluxe Home Solutions</option>
            </select>
          </label>
          <fieldset>
            <legend className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Assign role
            </legend>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {ADMIN_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  aria-pressed={role === r}
                  className={
                    role === r
                      ? "rounded-xs border border-navy bg-navy px-2 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-on-dark"
                      : "rounded-xs border border-border-strong px-2 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-navy hover:bg-sky"
                  }
                >
                  {r}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{ROLE_SUMMARY[role]}</p>
          </fieldset>

          {error ? <p className="text-sm text-navy">{error}</p> : null}
        </div>

        <footer className="flex justify-end gap-3 border-t border-border px-5 py-3.5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xs border border-border-strong px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-navy hover:bg-sky"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xs bg-navy px-5 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-on-dark hover:bg-teal"
          >
            Send invite
          </button>
        </footer>
      </form>
    </div>
  );
}
