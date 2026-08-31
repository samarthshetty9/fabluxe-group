import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { ReviewCard, type Review } from "@/components/reviews/ReviewCard";
import { ReviewSummaryBar } from "@/components/reviews/ReviewSummaryBar";
import reviewsData from "@/data/reviews.json";

const title = "Client Reviews — Fabluxora Interiors";
const description =
  "Verified client reviews for Fabluxora Interiors: ratings, quotes and project details from homes, offices and hospitality fit-outs across India.";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewsPage,
});

const reviews = [...(reviewsData as Review[])].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Client reviews"
        title="What clients say once the site team has left."
        intro="Reviews collected after handover on Fabluxora Interiors projects. We publish the four-star ones too."
      />

      <Section tone="beige">
        <Reveal>
          <ReviewSummaryBar reviews={reviews} />
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={Math.min(i * 50, 240)} className="h-full">
              <ReviewCard review={review} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white" size="compact">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3">
            <EyebrowLabel>Start a conversation</EyebrowLabel>
            <h2 className="max-w-xl font-display text-display-sm text-navy">
              Want a reference you can call? We'll arrange one.
            </h2>
          </div>
          <ActionLink href="/contact">Enquire with Fabluxora</ActionLink>
        </div>
      </Section>
    </>
  );
}
