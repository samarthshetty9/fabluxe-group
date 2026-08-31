import { MapPin } from "lucide-react";

type ContactMapProps = {
  addressLines: string[];
};

/**
 * Map placeholder — the production site will embed a real map tile.
 * Kept deliberately quiet so it never competes with the contact details.
 */
export function ContactMap({ addressLines }: ContactMapProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-on-dark-muted/20 bg-navy/40">
      <div
        aria-hidden="true"
        className="grid h-56 w-full place-items-center bg-[linear-gradient(135deg,var(--navy)_0%,var(--teal)_140%)]"
      >
        <div className="flex flex-col items-center gap-2 text-on-dark-muted">
          <MapPin className="h-6 w-6 text-gold" />
          <p className="text-eyebrow font-medium uppercase tracking-[0.22em]">
            Map placeholder
          </p>
        </div>
      </div>
      <div className="absolute bottom-3 left-3 rounded-md bg-navy/80 px-3 py-2 text-xs text-on-dark">
        {addressLines[0]}
      </div>
    </div>
  );
}
