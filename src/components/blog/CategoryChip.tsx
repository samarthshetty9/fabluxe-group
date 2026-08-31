import { cn } from "@/lib/utils";

/** Small category marker used on blog cards and the article masthead. */
export function CategoryChip({
  category,
  tone = "dark",
  className,
}: {
  category: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 text-eyebrow font-semibold uppercase",
        tone === "dark" ? "bg-sky text-navy" : "bg-gold text-accent-foreground",
        className,
      )}
    >
      {category}
    </span>
  );
}
