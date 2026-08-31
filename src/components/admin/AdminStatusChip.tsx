import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  positive: "bg-navy text-on-dark",
  active: "bg-teal text-on-dark",
  neutral: "bg-sky text-navy",
  quiet: "border border-border-strong text-muted-foreground",
  warn: "bg-gold/25 text-navy border border-gold",
};

const map: Record<string, keyof typeof tones> = {
  Published: "positive",
  Approved: "positive",
  Completed: "positive",
  Closed: "positive",
  Active: "positive",
  Draft: "quiet",
  Hidden: "quiet",
  Suspended: "quiet",
  Archived: "quiet",
  Ongoing: "active",
  "In progress": "active",
  Live: "active",
  New: "warn",
  Invited: "warn",
  Pending: "warn",
  Scheduled: "neutral",
};

/** Dense status pill used across every admin table. */
export function AdminStatusChip({ status, className }: { status: string; className?: string }) {
  const tone = tones[map[status] ?? "neutral"];
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-xs px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em]",
        tone,
        className,
      )}
    >
      {status}
    </span>
  );
}
