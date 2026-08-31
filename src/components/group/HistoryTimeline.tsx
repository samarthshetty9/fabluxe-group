import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import timeline from "@/data/timeline.json";

/** Genuine chronology, so the list is numbered (ordered) markup. */
export function HistoryTimeline() {
  return (
    <Section tone="white">
      <Reveal>
        <SectionHeading
          eyebrow="History"
          title="Sixteen years, in order."
          intro="Every step below came from a client asking us to take on one more part of the job."
        />
      </Reveal>

      <ol className="mt-14 border-t border-border">
        {timeline.map((entry, i) => (
          <li key={entry.year}>
            <Reveal delay={Math.min(i * 60, 240)}>
              <article className="grid gap-4 border-b border-border py-10 sm:grid-cols-[8rem_1fr] sm:gap-10 lg:grid-cols-[12rem_1fr]">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl text-gold">{entry.year}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-2xl text-navy">{entry.title}</h3>
                  <p className="max-w-2xl text-teal">{entry.body}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
