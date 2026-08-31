import { Link } from "@tanstack/react-router";

import { getImage } from "@/lib/images";

export type CsrUpdate = {
  id: string;
  title: string;
  date: string;
  isoDate: string;
  image: string;
  location: string;
  partner: string;
  summary: string;
  body: string[];
  gallery: string[];
};

/** One entry in the CSR feed: date, title, image, excerpt and a read-more link. */
export function CsrUpdateCard({ update }: { update: CsrUpdate }) {
  return (
    <article className="group grid overflow-hidden bg-surface lg:grid-cols-12">
      <div className="overflow-hidden lg:col-span-5">
        <img
          src={getImage(update.image)}
          alt={update.title}
          loading="lazy"
          width={1200}
          height={900}
          className="media-zoom size-full min-h-64 object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-8 lg:col-span-7 lg:p-10">
        <div className="flex flex-wrap items-center gap-3 text-eyebrow font-semibold uppercase text-gold">
          <time dateTime={update.isoDate}>{update.date}</time>
          <span className="text-teal">· {update.location}</span>
        </div>
        <h3 className="font-display text-2xl text-navy">
          <Link
            to="/csr/$updateId"
            params={{ updateId: update.id }}
            className="transition-colors duration-300 hover:text-teal"
          >
            {update.title}
          </Link>
        </h3>
        <p className="text-muted-foreground">{update.summary}</p>
        <p className="text-sm text-teal">{update.partner}</p>
        <Link
          to="/csr/$updateId"
          params={{ updateId: update.id }}
          className="mt-2 inline-flex items-center gap-2 self-start text-eyebrow font-semibold uppercase text-navy transition-colors duration-300 hover:text-teal"
        >
          Read more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
