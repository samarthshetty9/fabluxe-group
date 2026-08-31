import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { PersonPortrait } from "./PersonPortrait";
import type { Person } from "./PersonCard";

type DirectorsSectionProps = {
  directors: Person[];
  onOpen: (person: Person) => void;
};

export function DirectorsSection({ directors, onOpen }: DirectorsSectionProps) {
  return (
    <Section tone="beige">
      <Reveal>
        <SectionHeading
          eyebrow="Directors"
          title="The two people who answer for the group."
          intro="Preet and Raghu started Fabluxe in 2009 and still review work themselves."
        />
      </Reveal>

      <div className="mt-16 flex flex-col gap-16">
        {directors.map((director, i) => (
          <Reveal key={director.id} delay={i * 80}>
            <article
              className={
                i % 2 === 1
                  ? "group grid gap-10 lg:grid-cols-2 lg:items-center [&>*:first-child]:lg:order-2"
                  : "group grid gap-10 lg:grid-cols-2 lg:items-center"
              }
            >
              <PersonPortrait name={director.name} image={director.image} />
              <div className="flex flex-col gap-4">
                <h3 className="font-display text-display-sm text-navy">{director.name}</h3>
                <p className="text-eyebrow font-semibold uppercase text-teal">{director.role}</p>
                <p className="text-teal">{director.short}</p>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {director.bio}
                </p>
                <button
                  type="button"
                  onClick={() => onOpen(director)}
                  aria-haspopup="dialog"
                  className="self-start border-b border-gold pb-1 text-eyebrow font-semibold uppercase text-navy transition-colors duration-300 hover:text-gold"
                >
                  Open full profile
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
