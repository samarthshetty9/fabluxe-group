import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Placeholder logo block. The real client logo is gold lettering with a gold
 * triangle on blue marble and will be dropped in by the designer.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Fabluxe Group — home"
      className={cn("inline-flex items-center gap-3", className)}
    >
      <span className="flex size-11 items-center justify-center bg-navy">
        <span aria-hidden="true" className="font-display text-lg leading-none text-gold">
          ▲
        </span>
      </span>
      <span className="font-display text-lg tracking-[0.18em] text-gold uppercase">Fabluxe</span>
    </Link>
  );
}
