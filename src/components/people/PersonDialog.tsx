import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PersonPortrait } from "./PersonPortrait";
import type { Person } from "./PersonCard";

type PersonDialogProps = {
  person: Person | null;
  onClose: () => void;
};

export function PersonDialog({ person, onClose }: PersonDialogProps) {
  return (
    <Dialog open={Boolean(person)} onOpenChange={(open) => (open ? null : onClose())}>
      <DialogContent className="max-w-2xl gap-0 rounded-none border-border bg-surface p-0">
        {person ? (
          <div className="grid gap-0 sm:grid-cols-[10rem_1fr]">
            <PersonPortrait name={person.name} image={person.image} zoom={false} fill />
            <div className="flex flex-col gap-4 p-8">
              <DialogHeader className="gap-2 text-left">
                <DialogTitle className="font-display text-2xl font-normal text-navy">
                  {person.name}
                </DialogTitle>
                <DialogDescription className="text-eyebrow font-semibold uppercase text-teal">
                  {person.role}
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-muted-foreground">{person.bio}</p>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
