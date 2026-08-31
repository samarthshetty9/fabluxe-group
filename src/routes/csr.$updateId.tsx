import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Section } from "@/components/primitives/Section";
import { Reveal } from "@/components/primitives/Reveal";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";
import { ActionLink } from "@/components/primitives/ActionLink";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { getImage } from "@/lib/images";
import csrData from "@/data/csr.json";
import type { CsrUpdate } from "@/components/csr/CsrUpdateCard";

const updates = csrData as CsrUpdate[];

export const Route = createFileRoute("/csr/$updateId")({
  loader: ({ params }) => {
    const update = updates.find((item) => item.id === params.updateId);
    if (!update) throw notFound();
    return { update };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "CSR update not found — Fabluxe Group" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { update } = loaderData;
    const title = `${update.title} — Fabluxe CSR`;
    return {
      meta: [
        { title },
        { name: "description", content: update.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: update.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CsrNotFound,
  component: CsrDetailPage,
});

function CsrNotFound() {
  return (
    <Section tone="beige" size="large">
      <div className="flex flex-col items-start gap-6 pt-20">
        <EyebrowLabel>CSR</EyebrowLabel>
        <h1 className="font-display text-display-sm text-navy">We can't find that update.</h1>
        <p className="max-w-md text-teal">
          It may have been renamed. The full CSR feed is one click away.
        </p>
        <ActionLink href="/csr" variant="outline">
          Back to CSR updates
        </ActionLink>
      </div>
    </Section>
  );
}

function CsrDetailPage() {
  const { update } = Route.useLoaderData();

  const meta = [
    { label: "Published", value: update.date },
    { label: "Location", value: update.location },
    { label: "Partner", value: update.partner.replace(/^(In partnership with|With) /, "") },
  ];

  return (
    <>
      <section className="relative">
        <img
          src={getImage(update.image)}
          alt={update.title}
          width={1600}
          height={900}
          className="h-[60vh] min-h-80 w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/65" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="shell flex flex-col gap-5 pb-16">
            <EyebrowLabel tone="light">CSR update</EyebrowLabel>
            <h1 className="max-w-3xl font-display text-display-md text-on-dark">{update.title}</h1>
            <time dateTime={update.isoDate} className="text-on-dark-muted">
              {update.date}
            </time>
          </div>
        </div>
      </section>

      <Section tone="beige">
        <dl className="grid gap-8 border-y border-border py-10 sm:grid-cols-3">
          {meta.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <dt className="text-eyebrow font-semibold uppercase text-teal">{item.label}</dt>
              <dd className="font-display text-xl text-navy">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <EyebrowLabel>The update</EyebrowLabel>
          </Reveal>
          <Reveal delay={80} className="lg:col-span-8">
            <div className="flex max-w-2xl flex-col gap-6 text-lg text-teal">
              {update.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <Reveal>
          <EyebrowLabel>Gallery</EyebrowLabel>
        </Reveal>
        <div className="mt-8">
          <Reveal delay={60}>
            <ProjectGallery images={update.gallery} title={update.title} />
          </Reveal>
        </div>
      </Section>

      <Section tone="navy">
        <div className="flex flex-col items-start gap-6">
          <EyebrowLabel tone="light">Get involved</EyebrowLabel>
          <h2 className="max-w-2xl font-display text-display-sm text-on-dark">
            Partner with us on the next one.
          </h2>
          <p className="max-w-xl text-on-dark-muted">
            We work with schools, trusts and collectives near our sites. If that is you, write to us
            and we will come and look at the space.
          </p>
          <div className="flex flex-wrap gap-4">
            <ActionLink href="/contact" variant="gold" tone="light">
              Contact the CSR team
            </ActionLink>
            <Link
              to="/csr"
              className="inline-flex items-center gap-2 border-b border-on-dark-muted/50 pb-1 text-eyebrow font-semibold uppercase text-on-dark-muted transition-colors duration-300 hover:text-gold"
            >
              All CSR updates
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
