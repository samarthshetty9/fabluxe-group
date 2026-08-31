import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getImage } from "@/lib/images";

type ProjectGalleryProps = {
  images: string[];
  title: string;
};

/** Gallery with a simple lightbox. Arrow keys move between images. */
export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const step = (delta: number) => {
    setIndex((current) =>
      current === null ? null : (current + delta + images.length) % images.length,
    );
  };

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {images.map((image, i) => (
          <li key={`${image}-${i}`} className="group">
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              className="block w-full overflow-hidden bg-sky"
            >
              <img
                src={getImage(image)}
                alt={`${title}, view ${i + 1}`}
                loading="lazy"
                width={1200}
                height={900}
                className="media-zoom aspect-4/3 w-full object-cover"
              />
              <span className="sr-only">Open larger image</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open} onOpenChange={(next) => (next ? null : setIndex(null))}>
        <DialogContent
          className="max-w-5xl border-none bg-navy p-4"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
        >
          <DialogTitle className="sr-only">{title} gallery</DialogTitle>
          {open ? (
            <figure className="flex flex-col gap-4">
              <img
                src={getImage(images[index] as string)}
                alt={`${title}, view ${index + 1}`}
                width={1600}
                height={1200}
                className="max-h-[70vh] w-full object-contain"
              />
              <figcaption className="flex items-center justify-between gap-4 text-eyebrow font-semibold uppercase text-on-dark-muted">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="hover:text-gold"
                >
                  ← Previous
                </button>
                <span>
                  {index + 1} / {images.length}
                </span>
                <button type="button" onClick={() => step(1)} className="hover:text-gold">
                  Next →
                </button>
              </figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
