import { cn } from "@/lib/utils";

type BlogFilterBarProps = {
  categories: string[];
  active: string;
  onCategoryChange: (category: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
  counts: Record<string, number>;
};

/** Category buttons plus a client-side search field over the mock post list. */
export function BlogFilterBar({
  categories,
  active,
  onCategoryChange,
  query,
  onQueryChange,
  counts,
}: BlogFilterBarProps) {
  return (
    <div className="flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
      <div role="group" aria-label="Filter posts by category" className="hide-scrollbar flex gap-3 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={active === category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "shrink-0 border px-5 py-2.5 text-eyebrow font-semibold uppercase transition-colors duration-300",
              active === category
                ? "border-navy bg-navy text-on-dark"
                : "border-border-strong text-teal hover:border-navy hover:text-navy",
            )}
          >
            {category}
            <span className="ml-2 text-muted-foreground">{counts[category] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="lg:w-72">
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search articles"
          className="w-full border border-border-strong bg-surface px-4 py-3 text-sm text-navy placeholder:text-muted-foreground focus-visible:border-navy focus-visible:outline-none"
        />
      </div>
    </div>
  );
}
