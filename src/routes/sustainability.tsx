import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { InitiativeCard, type Initiative } from "@/components/sustainability/InitiativeCard";
import sustainability from "@/data/sustainability.json";

const title = "Sustainability — Fabluxe Group";
const description =
  "Certified timber, low-VOC finishes, rooftop solar and measured site waste: how Fabluxe Group tracks the environmental impact of interiors and appliance work.";

export const Route = createFileRoute("/sustainability")({
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
  component: SustainabilityPage,
});

const initiatives = sustainability.initiatives as Initiative[];

function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Sustainability"
        title="Specify less. Specify better."
        intro={sustainability.statement}
      />

      <Section tone="beige">
        <Reveal>
          <SectionHeading
            eyebrow="Initiatives"
            title="Six things we actually measure."
            intro="Each initiative below carries a figure we can evidence from purchase orders, meter readings or weighbridge slips."
          />
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((initiative, i) => (
            <Reveal key={initiative.id} delay={Math.min(i * 70, 280)}>
              <InitiativeCard initiative={initiative} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <EyebrowLabel tone="light">Our commitments</EyebrowLabel>
            <h2 className="mt-5 font-display text-display-sm text-on-dark">
              What we have put in writing.
            </h2>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <ul className="flex flex-col divide-y divide-on-dark-muted/25">
              {sustainability.commitments.map((commitment) => (
                <li key={commitment} className="flex gap-5 py-6">
                  <span className="gold-rule mt-3 shrink-0" aria-hidden="true" />
                  <span className="text-on-dark-muted">{commitment}</span>
                </li>
              ))}
            </ul>
            <ActionLink href="/csr" variant="gold" tone="light" className="mt-10">
              See our CSR work
            </ActionLink>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
