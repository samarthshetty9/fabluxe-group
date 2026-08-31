import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ADMIN_ROLES, useAdmin, type AdminRole } from "@/lib/admin/session";

type NavItem = { label: string; to: string; requires?: "manageUsers" };

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview",
    items: [{ label: "Dashboard", to: "/admin" }],
  },
  {
    group: "Content",
    items: [
      { label: "Blog posts", to: "/admin/blog" },
      { label: "CSR updates", to: "/admin/csr" },
      { label: "Sustainability", to: "/admin/sustainability" },
      { label: "Projects", to: "/admin/projects" },
      { label: "Awards", to: "/admin/awards" },
      { label: "Client reviews", to: "/admin/reviews" },
    ],
  },
  {
    group: "Operations",
    items: [
      { label: "Enquiries", to: "/admin/enquiries" },
      { label: "Users and access", to: "/admin/users", requires: "manageUsers" },
    ],
  },
];

type AdminShellProps = {
  title: string;
  breadcrumb: string[];
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

/** Navy sidebar + light content area. Denser type than the public site. */
export function AdminShell({ title, breadcrumb, description, actions, children }: AdminShellProps) {
  const { ready, session, role, setRole, signOut, can } = useAdmin();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !session) navigate({ to: "/admin/login", replace: true });
  }, [ready, session, navigate]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige text-sm text-muted-foreground">
        Loading admin…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-beige lg:flex-row">
      <aside className="bg-navy text-on-dark lg:sticky lg:top-0 lg:h-screen lg:w-64 lg:shrink-0 lg:overflow-y-auto">
        <div className="flex items-center justify-between gap-3 border-b border-on-dark-muted/20 px-5 py-4">
          <Link to="/admin" className="font-display text-lg tracking-tight text-on-dark">
            Fabluxe <span className="text-gold">Admin</span>
          </Link>
          <Link
            to="/"
            className="text-[0.625rem] uppercase tracking-[0.18em] text-on-dark-muted hover:text-on-dark"
          >
            View site
          </Link>
        </div>

        <nav className="px-3 py-4">
          {NAV.map((group) => (
            <div key={group.group} className="mb-5">
              <p className="px-2 pb-2 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-on-dark-muted/70">
                {group.group}
              </p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const locked = item.requires === "manageUsers" && !can.manageUsers;
                  const active = pathname === item.to;
                  if (locked) {
                    return (
                      <li key={item.to}>
                        <span
                          aria-disabled="true"
                          title="Directors only"
                          className="flex cursor-not-allowed items-center justify-between rounded-xs px-2 py-1.5 text-sm text-on-dark-muted/40"
                        >
                          {item.label}
                          <LockIcon />
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={cn(
                          "block rounded-xs px-2 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-on-dark/10 text-on-dark"
                            : "text-on-dark-muted hover:bg-on-dark/5 hover:text-on-dark",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-on-dark-muted/20 px-5 py-4 text-sm">
          <p className="font-medium text-on-dark">{session.name}</p>
          <p className="truncate text-xs text-on-dark-muted">{session.email}</p>
          <button
            type="button"
            onClick={() => {
              signOut();
              navigate({ to: "/admin/login", replace: true });
            }}
            className="mt-3 text-[0.625rem] uppercase tracking-[0.18em] text-gold hover:text-on-dark"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="border-b border-border bg-surface px-5 py-4 lg:px-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {breadcrumb.map((crumb, i) => (
                    <li key={crumb} className="flex items-center gap-1.5">
                      {i > 0 ? <span aria-hidden="true">/</span> : null}
                      <span className={i === breadcrumb.length - 1 ? "text-navy" : undefined}>
                        {crumb}
                      </span>
                    </li>
                  ))}
                </ol>
              </nav>
              <h1 className="mt-2 font-display text-2xl leading-tight text-navy">{title}</h1>
              {description ? (
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              {actions}
              <RoleSwitcher role={role} onChange={setRole} />
            </div>
          </div>
        </header>

        <main className="px-5 py-6 lg:px-10 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export function RoleSwitcher({
  role,
  onChange,
  tone = "light",
}: {
  role: AdminRole;
  onChange: (role: AdminRole) => void;
  tone?: "light" | "dark";
}) {
  return (
    <label className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.18em]">
      <span className={tone === "dark" ? "text-on-dark-muted" : "text-muted-foreground"}>
        Viewing as
      </span>
      <select
        value={role}
        onChange={(e) => onChange(e.target.value as AdminRole)}
        className={cn(
          "rounded-xs border px-2 py-1.5 text-xs uppercase tracking-[0.12em] outline-none focus:ring-2 focus:ring-ring",
          tone === "dark"
            ? "border-on-dark-muted/40 bg-transparent text-on-dark"
            : "border-border-strong bg-surface text-navy",
        )}
      >
        {ADMIN_ROLES.map((r) => (
          <option key={r} value={r} className="text-navy">
            {r}
          </option>
        ))}
      </select>
    </label>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3 fill-none stroke-current" strokeWidth="1.2">
      <rect x="2.5" y="5" width="7" height="5.5" />
      <path d="M4 5V3.6a2 2 0 0 1 4 0V5" />
    </svg>
  );
}
