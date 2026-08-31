import { useAdmin } from "@/lib/admin/session";

/** Explicit locked state — never a blank page. */
export function NoAccess({
  area,
  requiredRole = "Director",
}: {
  area: string;
  requiredRole?: string;
}) {
  const { role, setRole } = useAdmin();

  return (
    <div className="mx-auto max-w-xl rounded-sm border border-border bg-surface p-8 text-center">
      <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-sky text-navy">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-5 fill-none stroke-current" strokeWidth="1.3">
          <rect x="3.5" y="7" width="9" height="6.5" />
          <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
        </svg>
      </div>
      <h2 className="mt-4 font-display text-xl text-navy">You don't have access to this</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {area} is restricted to the <strong className="text-navy">{requiredRole}</strong> role. You
        are currently signed in as <strong className="text-navy">{role}</strong>.
      </p>
      <p className="mt-4 text-xs text-muted-foreground">
        Prototype note: switch the role above to explore this screen.
      </p>
      <button
        type="button"
        onClick={() => setRole("Director")}
        className="mt-4 rounded-xs border border-border-strong px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-navy transition-colors hover:bg-navy hover:text-on-dark"
      >
        Switch to Director
      </button>
    </div>
  );
}
