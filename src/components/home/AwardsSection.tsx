import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { AwardTile, type Award } from "@/components/cards/AwardTile";
import awards from "@/data/awards.json";

export function AwardsSection() {
  return (
    <Section tone="white" size="compact">
      <Reveal>
        <SectionHeading eyebrow="Recognition" title="Awards and certifications." />
      </Reveal>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {(awards as Award[]).map((award, i) => (
          <Reveal key={award.title} delay={i * 80}>
            <AwardTile award={award} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
