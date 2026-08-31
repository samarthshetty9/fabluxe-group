import { cn } from "@/lib/utils";

export const projectFilters = [
  "All",
  "Residential",
  "Commercial",
  "Ongoing",
  "Completed",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];

type ProjectFilterBarProps = {
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
  counts: Record<string, number>;
};

export function ProjectFilterBar({ active, onChange, counts }: ProjectFilterBarProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects"
      className="hide-scrollbar flex gap-3 overflow-x-auto border-y border-border py-4"
    >
      {projectFilters.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={active === filter}
          onClick={() => onChange(filter)}
          className={cn(
            "shrink-0 border px-5 py-2.5 text-eyebrow font-semibold uppercase transition-colors duration-300",
            active === filter
              ? "border-navy bg-navy text-on-dark"
              : "border-border-strong text-teal hover:border-navy hover:text-navy",
          )}
        >
          {filter}
          <span className="ml-2 text-muted-foreground">{counts[filter] ?? 0}</span>
        </button>
      ))}
    </div>
  );
}
