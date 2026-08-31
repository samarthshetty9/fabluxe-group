import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/group/PageHero";
import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { CsrUpdateCard, type CsrUpdate } from "@/components/csr/CsrUpdateCard";
import csrData from "@/data/csr.json";

const title = "CSR Updates — Fabluxe Group";
const description =
  "Classroom refits, joinery apprenticeships, native planting and artisan livelihoods: a running feed of Fabluxe Group's community work, newest first.";

export const Route = createFileRoute("/csr/")({
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
  component: CsrPage,
});

const updates = [...(csrData as CsrUpdate[])].sort((a, b) => b.isoDate.localeCompare(a.isoDate));

function CsrPage() {
  return (
    <>
      <PageHero
        eyebrow="CSR"
        title="Work we do that nobody invoices us for."
        intro="We keep our community work close to what we are good at — building things, training people, and maintaining what we install. Updates below run newest first."
      />

      <Section tone="beige">
        <div className="flex flex-col gap-10">
          {updates.map((update, i) => (
            <Reveal key={update.id} delay={Math.min(i * 60, 240)}>
              <CsrUpdateCard update={update} />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
