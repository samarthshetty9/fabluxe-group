import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { ADMIN_ROLES, ROLE_SUMMARY, useAdmin, type AdminRole } from "@/lib/admin/session";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin sign in — Fabluxe Group" },
      { name: "description", content: "Prototype sign in for the Fabluxe Group content admin portal." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin sign in — Fabluxe Group" },
      { property: "og:description", content: "Prototype sign in for the Fabluxe Group content admin portal." },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { signIn } = useAdmin();
  const navigate = useNavigate();
  const [email, setEmail] = useState("preet@fabluxe.in");
  const [password, setPassword] = useState("prototype");
  const [role, setRole] = useState<AdminRole>("Director");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="grid min-h-screen bg-navy lg:grid-cols-2">
      <div className="hidden flex-col justify-between p-12 text-on-dark lg:flex">
        <p className="font-display text-2xl">
          Fabluxe <span className="text-gold">Admin</span>
        </p>
        <div>
          <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-gold">Content portal</p>
          <h1 className="mt-4 max-w-md font-display text-display-sm leading-tight">
            Everything the public site shows, managed in one place.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-on-dark-muted">
            Blog, CSR, sustainability, projects, awards, reviews, enquiries and access — all editable
            by the Fabluxe team.
          </p>
        </div>
        <p className="text-xs text-on-dark-muted">Fabluxe Group · Prototype build</p>
      </div>

      <div className="flex items-center justify-center bg-beige p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim() || !password.trim()) {
              setError("Enter an email and password — any values work in this prototype.");
              return;
            }
            // TODO: replace with the client's real authentication provider.
            signIn(email.trim(), role);
            navigate({ to: "/admin" });
          }}
          className="w-full max-w-md rounded-sm border border-border bg-surface p-7"
        >
          <h2 className="font-display text-2xl text-navy">Sign in</h2>
          <p className="mt-1 rounded-xs border border-gold bg-gold/15 px-3 py-2 text-xs text-navy">
            Prototype login — any email and password are accepted. No account is created and nothing
            is sent to a server.
          </p>

          <div className="mt-5 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-xs border border-border-strong bg-surface px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 rounded-xs border border-border-strong bg-surface px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
              />
            </label>

            <fieldset>
              <legend className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                View the demo as
              </legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {ADMIN_ROLES.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    aria-pressed={role === r}
                    className={cn(
                      "rounded-xs border px-2 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] transition-colors",
                      role === r
                        ? "border-navy bg-navy text-on-dark"
                        : "border-border-strong text-navy hover:bg-sky",
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{ROLE_SUMMARY[role]}</p>
            </fieldset>

            {error ? <p className="text-sm text-navy">{error}</p> : null}

            <button
              type="submit"
              className="h-10 rounded-xs bg-navy text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-on-dark transition-colors hover:bg-teal"
            >
              Enter the admin portal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
