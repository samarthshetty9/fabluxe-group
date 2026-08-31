import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import {
  ContactInfoPanel,
  type ContactLine,
} from "@/components/contact/ContactInfoPanel";
import { ContactMap } from "@/components/contact/ContactMap";
import {
  CompanyContactCard,
  type CompanyContact,
} from "@/components/contact/CompanyContactCard";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import contactsData from "@/data/contacts.json";

const title = "Contact & B2B Enquiries — Fabluxe Group";
const description =
  "Contact Fabluxe Group and our two operating companies, or send a B2B enquiry. Separate lines for Fabluxe Home Solutions and Fabluxora Interiors.";

export const Route = createFileRoute("/contact")({
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
  component: ContactPage,
});

const groupContact = contactsData.group as unknown as ContactLine;
const companies = contactsData.companies as unknown as CompanyContact[];
const enquiryTypes = contactsData.enquiryTypes as { value: string; label: string }[];

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Two companies, one standard of reply."
        intro="Reach the group office or the operating company you need directly. For project briefs, the enquiry form on the right routes to a named lead within one working day."
      />

      <Section tone="white" size="large">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: contact details, map, company lines */}
          <div className="flex flex-col gap-10">
            <Reveal>
              <EyebrowLabel>Group office</EyebrowLabel>
              <h2 className="mt-3 font-display text-display-sm text-foreground">
                Fabluxe House, Mumbai
              </h2>
              <div className="mt-6">
                <ContactInfoPanel data={groupContact} />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ContactMap addressLines={groupContact.addressLines} />
            </Reveal>

            <Reveal delay={120}>
              <div>
                <EyebrowLabel>Operating companies</EyebrowLabel>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                  Each company keeps its own line for sales and service enquiries. They are
                  separate legal entities operating under one group.
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {companies.map((company) => (
                    <CompanyContactCard key={company.id} company={company} />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: B2B enquiry form */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm enquiryTypes={enquiryTypes} />
          </div>
        </div>
      </Section>
    </>
  );
}
