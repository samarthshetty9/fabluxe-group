import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";

export function EnquiryBand() {
  return (
    <Section tone="navy" size="compact">
      <Reveal>
        <div className="flex flex-col items-center gap-8 text-center">
          <SectionHeading
            eyebrow="Work with the group"
            tone="light"
            align="center"
            title="Tell us what you are building."
            intro="Developers, hotel groups and workplace teams: send us the brief and a date. We will tell you honestly whether we are the right fit."
          />
          <ActionLink href="/contact" variant="gold" tone="light">
            Start an enquiry
          </ActionLink>
        </div>
      </Reveal>
    </Section>
  );
}
