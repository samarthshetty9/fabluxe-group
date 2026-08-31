import { cn } from "@/lib/utils";

type StatusChipProps = {
  status: string;
  className?: string | undefined;
};

/** Ongoing reads teal, Completed reads navy. */
export function StatusChip({ status, className }: StatusChipProps) {
  const ongoing = status.toLowerCase() === "ongoing";
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 text-eyebrow font-semibold uppercase text-on-dark",
        ongoing ? "bg-teal" : "bg-navy",
        className,
      )}
    >
      {status}
    </span>
  );
}
