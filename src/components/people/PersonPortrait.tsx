import { getImage, hasImage } from "@/lib/images";
import { cn } from "@/lib/utils";

type PersonPortraitProps = {
  name: string;
  image?: string | undefined;
  className?: string;
  zoom?: boolean;
  fill?: boolean;
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/** Portrait with a monogram fallback for people without a photo yet. */
export function PersonPortrait({
  name,
  image,
  className,
  zoom = true,
  fill = false,
}: PersonPortraitProps) {
  if (!hasImage(image)) {
    return (
      <div
        className={cn(
          fill ? "flex size-full min-h-40 items-center justify-center bg-sky" : "flex aspect-4/5 w-full items-center justify-center bg-sky",
          className,
        )}
      >
        <span aria-hidden="true" className="font-display text-4xl text-teal">
          {initials(name)}
        </span>
        <span className="sr-only">Portrait of {name} coming soon</span>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden bg-sky", className)}>
      <img
        src={getImage(image as string)}
        alt={`Portrait of ${name}`}
        loading="lazy"
        width={900}
        height={1100}
        className={cn(
          "w-full object-cover",
          fill ? "h-full min-h-40" : "aspect-4/5",
          zoom && "media-zoom",
        )}
      />
    </div>
  );
}
