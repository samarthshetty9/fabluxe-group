import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { AwardCard, type AwardEntry } from "@/components/cards/AwardCard";
import awardsData from "@/data/awards.json";

const title = "Awards & Recognition — Fabluxe Group";
const description =
  "Awards, certifications and shortlistings earned by Fabluxe Home Solutions and Fabluxora Interiors, grouped by year.";

export const Route = createFileRoute("/awards")({
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
  component: AwardsPage,
});

const awards = awardsData as AwardEntry[];

const years = [...new Set(awards.map((award) => award.year))].sort((a, b) => Number(b) - Number(a));

function AwardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Recognition"
        title="Awards, certifications and the odd shortlisting."
        intro="We enter a small number of programmes each year, and only ones that audit delivered work rather than renderings. Everything below is listed with the body that gave it."
      />

      {years.map((year, index) => (
        <Section key={year} tone={index % 2 === 0 ? "beige" : "white"}>
          <Reveal>
            <div className="flex items-baseline gap-6 border-b border-border pb-6">
              <h2 className="font-display text-display-sm text-navy">{year}</h2>
              <span className="text-eyebrow font-semibold uppercase text-teal">
                {awards.filter((a) => a.year === year).length} recognitions
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {awards
              .filter((award) => award.year === year)
              .map((award, i) => (
                <Reveal key={award.id} delay={Math.min(i * 80, 240)}>
                  <AwardCard award={award} />
                </Reveal>
              ))}
          </div>
        </Section>
      ))}
    </>
  );
}
