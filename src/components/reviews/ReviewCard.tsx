import { StarRating } from "./StarRating";

export type Review = {
  id: string;
  rating: number;
  quote: string;
  name: string;
  projectType: string;
  location: string;
  date: string;
  isoDate: string;
};

/** One client review: rating, quote and attribution. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col gap-5 bg-surface p-8">
      <StarRating value={review.rating} label={`${review.rating} out of 5 stars`} />
      <blockquote className="font-display text-xl leading-snug text-navy">
        “{review.quote}”
      </blockquote>
      <footer className="mt-auto flex flex-col gap-1 border-t border-border pt-5">
        <p className="font-semibold text-navy">{review.name}</p>
        <p className="text-sm text-teal">
          {review.projectType} · {review.location}
        </p>
        <time dateTime={review.isoDate} className="text-eyebrow font-semibold uppercase text-muted-foreground">
          {review.date}
        </time>
      </footer>
    </article>
  );
}
