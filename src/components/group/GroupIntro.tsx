import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { StatFigure } from "@/components/primitives/StatFigure";
import group from "@/data/group.json";

export function GroupIntro() {
  return (
    <Section tone="beige">
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <EyebrowLabel>Who we are</EyebrowLabel>
        </Reveal>
        <div className="flex flex-col gap-6 lg:col-span-8">
          <Reveal>
            <p className="font-display text-display-sm text-navy">
              Fabluxe is a family of two companies that finish rooms — one designs and builds them,
              the other fills them with technology that keeps working.
            </p>
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-2xl text-teal">
              We began in 2009 as a small fit-out contractor in Bandra and grew the way our clients
              did: slowly, by referral, one floor at a time. Today the group employs 380 people
              across eleven cities and still measures itself the same way — by whether the last
              client calls us for the next project.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-2xl text-teal">
              We do not sell from this website. It exists to explain how the group is put together,
              who runs it, and how to reach the right company for the work you have in mind.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {group.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <StatFigure figure={stat.figure} label={stat.label} note={stat.note} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
