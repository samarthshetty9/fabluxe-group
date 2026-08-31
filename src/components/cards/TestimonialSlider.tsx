import { useState } from "react";
import { cn } from "@/lib/utils";

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
};

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const active = items[index];
  if (!active) return null;

  return (
    <div className="flex flex-col gap-10">
      <blockquote className="max-w-3xl">
        <p className="font-display text-display-sm text-navy">“{active.quote}”</p>
        <footer className="mt-8 text-sm text-teal">
          <span className="font-semibold text-navy">{active.name}</span> — {active.role},{" "}
          {active.location}
        </footer>
      </blockquote>

      <div className="flex items-center gap-3" role="tablist" aria-label="Client reviews">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Review from ${item.name}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-px w-12 transition-colors duration-300",
              i === index ? "bg-gold" : "bg-border-strong hover:bg-teal",
            )}
          />
        ))}
      </div>
    </div>
  );
}
