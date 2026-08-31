import { cn } from "@/lib/utils";

/** Five-star display. Fractional values fill the last star partially. */
export function StarRating({
  value,
  className,
  label,
}: {
  value: number;
  className?: string;
  label?: string;
}) {
  const percent = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span aria-hidden="true" className="relative inline-block leading-none">
        <span className="text-lg tracking-[0.15em] text-border-strong">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden text-lg tracking-[0.15em] text-gold"
          style={{ width: `${percent}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span className="sr-only">{label ?? `${value} out of 5 stars`}</span>
    </span>
  );
}
