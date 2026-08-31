import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ActionLink } from "@/components/primitives/ActionLink";
import group from "@/data/group.json";
import companies from "@/data/companies.json";

/** Parent → two companies. Drawn with borders so it restyles from tokens alone. */
export function StructureDiagram() {
  return (
    <Section tone="beige">
      <Reveal>
        <SectionHeading
          eyebrow="Group structure"
          title="One parent. Two operating companies."
          intro="Each company has its own team, its own P&L and its own website. The group holds the standard they both work to."
        />
      </Reveal>

      <div className="mt-16 flex flex-col items-center">
        <Reveal className="w-full">
          <div className="mx-auto max-w-md border border-border-strong bg-navy px-8 py-7 text-center text-on-dark">
            <p className="text-eyebrow font-semibold uppercase text-on-dark-muted">Parent</p>
            <p className="mt-2 font-display text-2xl">{group.name}</p>
            <p className="mt-1 text-sm text-on-dark-muted">Founded {group.founded} · Mumbai</p>
          </div>
        </Reveal>

        <span aria-hidden="true" className="h-12 w-px bg-border-strong" />

        <div
          aria-hidden="true"
          className="hidden h-px w-full max-w-3xl bg-border-strong sm:block"
        />

        <div className="grid w-full max-w-3xl gap-8 sm:grid-cols-2">
          {companies.map((company, i) => (
            <Reveal key={company.id} delay={i * 100} className="flex flex-col items-center">
              <span aria-hidden="true" className="hidden h-12 w-px bg-border-strong sm:block" />
              <div className="flex w-full flex-col gap-3 border border-border-strong bg-surface px-8 py-7 text-center">
                <p className="text-eyebrow font-semibold uppercase text-teal">{company.sector}</p>
                <p className="font-display text-xl text-navy">{company.name}</p>
                <p className="text-sm text-muted-foreground">{company.footerLine}</p>
                <ActionLink
                  href={company.url}
                  variant="quiet"
                  external
                  className="justify-center self-center"
                >
                  Visit site
                </ActionLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
