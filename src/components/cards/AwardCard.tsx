import { getImage, hasImage } from "@/lib/images";

export type AwardEntry = {
  id: string;
  year: string;
  title: string;
  awardingBody: string;
  category: string;
  company?: string | undefined;
  note?: string | undefined;
  image?: string | undefined;
};

/** Award card: name, awarding body, category, short note and optional image. */
export function AwardCard({ award }: { award: AwardEntry }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden bg-surface">
      {hasImage(award.image) ? (
        <div className="overflow-hidden">
          <img
            src={getImage(award.image as string)}
            alt={`${award.title}, ${award.awardingBody}`}
            loading="lazy"
            width={1200}
            height={900}
            className="media-zoom aspect-4/3 w-full object-cover"
          />
        </div>
      ) : (
        <div
          className="flex aspect-4/3 w-full items-center justify-center bg-sky"
          aria-hidden="true"
        >
          <span className="font-display text-display-sm text-navy/25">{award.year}</span>
        </div>
      )}


      <div className="flex flex-1 flex-col gap-3 border-t border-gold/50 p-8">
        <div className="flex flex-wrap items-center gap-3 text-eyebrow font-semibold uppercase">
          <span className="text-gold">{award.category}</span>
          {award.company ? <span className="text-teal">· {award.company}</span> : null}
        </div>
        <h3 className="font-display text-xl text-navy">{award.title}</h3>
        <p className="text-sm font-semibold text-teal">{award.awardingBody}</p>
        {award.note ? <p className="text-sm text-muted-foreground">{award.note}</p> : null}
      </div>
    </article>
  );
}
