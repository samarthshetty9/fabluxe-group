import { getImage } from "@/lib/images";

/**
 * Image upload placeholder — shows the currently assigned mock asset and a
 * non-functional drop zone.
 * // TODO: wire to the client's media library / asset storage.
 */
export function ImageUploadField({
  label = "Cover image",
  imageKey,
  disabled,
}: {
  label?: string;
  imageKey?: string | undefined;
  disabled?: boolean;
}) {
  const src = imageKey ? getImage(imageKey) : undefined;

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-col gap-3 rounded-xs border border-dashed border-border-strong bg-beige/60 p-3 sm:flex-row sm:items-center">
        <div className="h-24 w-full shrink-0 overflow-hidden rounded-xs bg-sky sm:w-36">
          {src ? (
            <img src={src} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[0.625rem] uppercase tracking-[0.14em] text-navy/60">
              No image
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-foreground">
            {imageKey ? `Assigned asset: ${imageKey}` : "No asset assigned"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Drag an image here or choose a file. JPG or PNG, 2000px on the long edge.
          </p>
          <button
            type="button"
            disabled={disabled}
            className="mt-2 rounded-xs border border-border-strong px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-navy transition-colors hover:bg-navy hover:text-on-dark disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
          >
            Choose file
          </button>
        </div>
      </div>
    </div>
  );
}
