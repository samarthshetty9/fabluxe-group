import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { useAdmin } from "@/lib/admin/session";
import { AdminStatusChip } from "@/components/admin/AdminStatusChip";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export type ManagedRecord = {
  id: string;
  title: string;
  meta?: string | undefined;
  secondary?: string | undefined;
  status: string;
  date?: string | undefined;
  image?: string | undefined;
  body?: string | undefined;
};

export type ContentManagerProps = {
  /** Singular noun, e.g. "blog post". */
  entity: string;
  records: ManagedRecord[];
  statuses: string[];
  labels?: { title?: string; meta?: string; secondary?: string; date?: string } | undefined;
  /** Adds Approve / Hide buttons (client reviews). */
  moderation?: boolean | undefined;
  /** Read-only rows for the enquiries table style listing. */
  bodyLabel?: string | undefined;
};

const emptyDraft: ManagedRecord = { id: "", title: "", meta: "", status: "", date: "", body: "" };

/**
 * Generic content manager: search + status filter + table + create/edit form.
 * All mutations are local component state — this is a front-end prototype.
 * // TODO: replace local state with the client's CMS API.
 */
export function ContentManager({
  entity,
  records,
  statuses,
  labels,
  moderation,
  bodyLabel = "Body",
}: ContentManagerProps) {
  const { can, role } = useAdmin();
  const [rows, setRows] = useState<ManagedRecord[]>(records);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [editing, setEditing] = useState<ManagedRecord | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesStatus = status === "All" || row.status === status;
      const haystack = `${row.title} ${row.meta ?? ""} ${row.secondary ?? ""}`.toLowerCase();
      return matchesStatus && (q === "" || haystack.includes(q));
    });
  }, [rows, query, status]);

  function saveDraft(draft: ManagedRecord) {
    setRows((prev) =>
      prev.some((r) => r.id === draft.id)
        ? prev.map((r) => (r.id === draft.id ? draft : r))
        : [{ ...draft, id: draft.id || `new-${Date.now()}` }, ...prev],
    );
    setNotice(`Saved “${draft.title || "Untitled"}” — prototype only, nothing was sent to a server.`);
    setEditing(null);
  }

  return (
    <div className="flex flex-col gap-4">
      {notice ? (
        <p className="rounded-xs border border-gold bg-gold/15 px-3 py-2 text-sm text-navy">
          {notice}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${entity}s…`}
          aria-label={`Search ${entity}s`}
          className="h-9 w-full max-w-xs rounded-xs border border-border-strong bg-surface px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="h-9 rounded-xs border border-border-strong bg-surface px-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        >
          {["All", ...statuses].map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : s}
            </option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground">
          {filtered.length} of {rows.length}
        </span>

        <div className="ml-auto">
          {can.create ? (
            <button
              type="button"
              onClick={() => setEditing({ ...emptyDraft, status: statuses[0] ?? "Draft" })}
              className="h-9 rounded-xs bg-navy px-4 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-on-dark transition-colors hover:bg-teal"
            >
              New {entity}
            </button>
          ) : (
            <span className="text-xs text-muted-foreground">
              {role} access is read only
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-sm border border-border bg-surface">
        <table className="w-full min-w-[52rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              <th className="px-4 py-2.5 font-semibold">{labels?.title ?? "Title"}</th>
              <th className="px-4 py-2.5 font-semibold">{labels?.meta ?? "Category"}</th>
              <th className="px-4 py-2.5 font-semibold">{labels?.secondary ?? "Owner"}</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 font-semibold">{labels?.date ?? "Date"}</th>
              <th className="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} className="border-b border-border/70 last:border-0 align-top">
                <td className="max-w-sm px-4 py-3 font-medium text-navy">{row.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.meta ?? "—"}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.secondary ?? "—"}</td>
                <td className="px-4 py-3">
                  <AdminStatusChip status={row.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{row.date ?? "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center justify-end gap-2">
                    {moderation ? (
                      <>
                        <RowButton
                          disabled={!can.edit}
                          onClick={() =>
                            setRows((prev) =>
                              prev.map((r) => (r.id === row.id ? { ...r, status: "Approved" } : r)),
                            )
                          }
                        >
                          Approve
                        </RowButton>
                        <RowButton
                          disabled={!can.edit}
                          onClick={() =>
                            setRows((prev) =>
                              prev.map((r) => (r.id === row.id ? { ...r, status: "Hidden" } : r)),
                            )
                          }
                        >
                          Hide
                        </RowButton>
                      </>
                    ) : null}
                    <RowButton disabled={!can.edit} onClick={() => setEditing(row)}>
                      Edit
                    </RowButton>
                    <RowButton
                      tone="danger"
                      disabled={!can.delete}
                      title={can.delete ? undefined : "Directors only"}
                      onClick={() => {
                        setRows((prev) => prev.filter((r) => r.id !== row.id));
                        setNotice(`Deleted “${row.title}” — prototype only.`);
                      }}
                    >
                      Delete
                    </RowButton>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No {entity}s match this search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      {!can.delete ? (
        <p className="text-xs text-muted-foreground">
          Delete is disabled for the {role} role. Only Directors can remove records.
        </p>
      ) : null}

      {editing ? (
        <RecordForm
          entity={entity}
          statuses={statuses}
          labels={labels}
          bodyLabel={bodyLabel}
          record={editing}
          onCancel={() => setEditing(null)}
          onSave={saveDraft}
        />
      ) : null}
    </div>
  );
}

function RowButton({
  children,
  onClick,
  disabled,
  tone = "default",
  title,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tone?: "default" | "danger";
  title?: string | undefined;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "rounded-xs border px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] transition-colors",
        tone === "danger"
          ? "border-border-strong text-navy hover:border-navy hover:bg-navy hover:text-on-dark"
          : "border-border-strong text-navy hover:bg-sky",
        "disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent disabled:hover:text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}

function RecordForm({
  entity,
  statuses,
  labels,
  bodyLabel,
  record,
  onCancel,
  onSave,
}: {
  entity: string;
  statuses: string[];
  labels?: ContentManagerProps["labels"];
  bodyLabel: string;
  record: ManagedRecord;
  onCancel: () => void;
  onSave: (record: ManagedRecord) => void;
}) {
  const [draft, setDraft] = useState<ManagedRecord>(record);
  const [error, setError] = useState<string | null>(null);
  const isNew = !record.id;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${isNew ? "Create" : "Edit"} ${entity}`}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy/60 p-4 py-10"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (draft.title.trim().length < 3) {
            setError("Title must be at least 3 characters.");
            return;
          }
          onSave(draft);
        }}
        className="w-full max-w-3xl rounded-sm border border-border bg-surface"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div>
            <p className="text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
              {isNew ? "Create" : "Edit"}
            </p>
            <h2 className="font-display text-xl text-navy">
              {isNew ? `New ${entity}` : record.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xs px-2 py-1 text-sm text-muted-foreground hover:text-navy"
          >
            Close
          </button>
        </header>

        <div className="grid gap-4 px-5 py-5 md:grid-cols-2">
          <Field
            id="rf-title"
            label={labels?.title ?? "Title"}
            value={draft.title}
            onChange={(v) => setDraft({ ...draft, title: v })}
            className="md:col-span-2"
          />
          <Field
            id="rf-meta"
            label={labels?.meta ?? "Category"}
            value={draft.meta ?? ""}
            onChange={(v) => setDraft({ ...draft, meta: v })}
          />
          <Field
            id="rf-secondary"
            label={labels?.secondary ?? "Owner"}
            value={draft.secondary ?? ""}
            onChange={(v) => setDraft({ ...draft, secondary: v })}
          />
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="rf-status"
              className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Status
            </label>
            <select
              id="rf-status"
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              className="h-9 rounded-xs border border-border-strong bg-surface px-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
            >
              {statuses.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <Field
            id="rf-date"
            label={labels?.date ?? "Date"}
            value={draft.date ?? ""}
            onChange={(v) => setDraft({ ...draft, date: v })}
          />

          <div className="md:col-span-2">
            <ImageUploadField imageKey={draft.image} />
          </div>

          <div className="md:col-span-2">
            <RichTextEditor
              id="rf-body"
              label={bodyLabel}
              value={draft.body ?? ""}
              onChange={(v) => setDraft({ ...draft, body: v })}
            />
          </div>

          {error ? <p className="text-sm text-navy md:col-span-2">{error}</p> : null}
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-border px-5 py-3.5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xs border border-border-strong px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-navy hover:bg-sky"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xs bg-navy px-5 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-on-dark transition-colors hover:bg-teal"
          >
            Save {entity}
          </button>
        </footer>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-xs border border-border-strong bg-surface px-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
