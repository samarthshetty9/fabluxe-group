import { getImage } from "@/lib/images";

export type Initiative = {
  id: string;
  title: string;
  image: string;
  description: string;
  figure: string;
  figureLabel: string;
};

/** Initiative card: image, title, description and a single impact figure. */
export function InitiativeCard({ initiative }: { initiative: Initiative }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden bg-surface">
      <div className="overflow-hidden">
        <img
          src={getImage(initiative.image)}
          alt={initiative.title}
          loading="lazy"
          width={1200}
          height={900}
          className="media-zoom aspect-4/3 w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-8">
        <h3 className="font-display text-xl text-navy">{initiative.title}</h3>
        <p className="text-sm text-muted-foreground">{initiative.description}</p>
        <div className="mt-auto flex flex-col gap-1 border-t border-border pt-5">
          <span className="font-display text-3xl text-teal">{initiative.figure}</span>
          <span className="text-eyebrow font-semibold uppercase text-muted-foreground">
            {initiative.figureLabel}
          </span>
        </div>
      </div>
    </article>
  );
}
