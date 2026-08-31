import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { StatFigure } from "@/components/primitives/StatFigure";
import group from "@/data/group.json";

export function StatsSection() {
  return (
    <Section tone="beige">
      <Reveal>
        <SectionHeading
          eyebrow="The Group at a glance"
          title="Built slowly, on repeat business."
          intro={group.description}
        />
      </Reveal>
      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {group.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <StatFigure figure={stat.figure} label={stat.label} note={stat.note} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
