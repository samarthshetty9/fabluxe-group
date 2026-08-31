import { cn } from "@/lib/utils";

type EyebrowLabelProps = {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

/** Signature device: wide-tracked uppercase label with a thin gold rule. */
export function EyebrowLabel({ children, tone = "dark", className }: EyebrowLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-eyebrow font-medium uppercase",
        tone === "dark" ? "text-teal" : "text-on-dark-muted",
        className,
      )}
    >
      <span className="gold-rule" aria-hidden="true" />
      {children}
    </p>
  );
}
