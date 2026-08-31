import { StarRating } from "./StarRating";
import type { Review } from "./ReviewCard";

/** Average rating, total count and a simple distribution across five stars. */
export function ReviewSummaryBar({ reviews }: { reviews: Review[] }) {
  const total = reviews.length;
  const average = total ? reviews.reduce((sum, r) => sum + r.rating, 0) / total : 0;
  const rounded = Math.round(average * 10) / 10;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="grid gap-10 bg-navy p-8 text-on-dark lg:grid-cols-12 lg:p-12">
      <div className="flex flex-col gap-3 lg:col-span-5">
        <p className="text-eyebrow font-semibold uppercase text-gold">Average rating</p>
        <p className="font-display text-display-md text-on-dark">{rounded.toFixed(1)}</p>
        <StarRating value={average} label={`Average ${rounded} out of 5 stars`} />
        <p className="text-on-dark-muted">
          Based on {total} verified client reviews for Fabluxora Interiors.
        </p>
      </div>

      <ul className="flex flex-col gap-3 lg:col-span-7">
        {distribution.map(({ star, count }) => (
          <li key={star} className="flex items-center gap-4">
            <span className="w-16 shrink-0 text-eyebrow font-semibold uppercase text-on-dark-muted">
              {star} star
            </span>
            <span className="h-2 flex-1 bg-on-dark-muted/25">
              <span
                className="block h-full bg-gold"
                style={{ width: total ? `${(count / total) * 100}%` : "0%" }}
              />
            </span>
            <span className="w-8 shrink-0 text-right text-sm text-on-dark-muted">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
