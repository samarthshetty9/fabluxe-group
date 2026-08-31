import { PersonPortrait } from "./PersonPortrait";

export type Person = {
  id: string;
  name: string;
  role: string;
  image?: string | undefined;
  short?: string;
  bio: string;
};

type PersonCardProps = {
  person: Person;
  size?: "default" | "compact";
  onOpen: (person: Person) => void;
};

/** Clickable card — opens the full bio in a modal. */
export function PersonCard({ person, size = "default", onOpen }: PersonCardProps) {
  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(person)}
        className="flex w-full flex-col gap-4 text-left"
        aria-haspopup="dialog"
      >
        <PersonPortrait name={person.name} image={person.image} />
        <div className="flex flex-col gap-1">
          <h3
            className={
              size === "compact"
                ? "font-display text-lg text-navy"
                : "font-display text-2xl text-navy"
            }
          >
            {person.name}
          </h3>
          <p className="text-eyebrow font-semibold uppercase text-teal">{person.role}</p>
          {size === "default" && person.short ? (
            <p className="mt-2 text-sm text-muted-foreground">{person.short}</p>
          ) : null}
          <span className="mt-2 text-eyebrow font-semibold uppercase text-teal transition-colors duration-300 group-hover:text-gold">
            Read bio →
          </span>
        </div>
      </button>
    </article>
  );
}
