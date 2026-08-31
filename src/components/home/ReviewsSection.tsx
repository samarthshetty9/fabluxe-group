import { Section } from "@/components/primitives/Section";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import { TestimonialSlider, type Testimonial } from "@/components/cards/TestimonialSlider";
import testimonials from "@/data/testimonials.json";

export function ReviewsSection() {
  return (
    <Section tone="beige">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <EyebrowLabel>What clients say</EyebrowLabel>
          <ActionLink href="/reviews" variant="quiet">
            All client reviews
          </ActionLink>
        </div>
        <div className="mt-10">
          <TestimonialSlider items={testimonials as Testimonial[]} />
        </div>
      </Reveal>
    </Section>
  );
}
