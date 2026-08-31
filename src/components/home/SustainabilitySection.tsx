import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import sustainability from "@/data/sustainability.json";
import image from "@/assets/sustainability.jpg";

export function SustainabilitySection() {
  return (
    <Section tone="beige">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="group overflow-hidden">
          <img
            src={image}
            alt="Sunlight across a reclaimed timber surface"
            loading="lazy"
            width={1200}
            height={900}
            className="media-zoom aspect-4/3 w-full object-cover"
          />
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading
            eyebrow="Sustainability"
            title="Specify less. Specify better."
            intro={sustainability.statement}
          />
          <ul className="mt-8 flex flex-col gap-3">
            {sustainability.points.map((point) => (
              <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                <span className="gold-rule mt-3 shrink-0" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <ActionLink href="/sustainability" variant="quiet" className="mt-8">
            How we measure it
          </ActionLink>
        </Reveal>
      </div>
    </Section>
  );
}
