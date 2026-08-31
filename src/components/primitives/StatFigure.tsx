type StatFigureProps = {
  figure: string;
  label: string;
  note?: string;
};

export function StatFigure({ figure, label, note }: StatFigureProps) {
  return (
    <div className="flex flex-col gap-2 border-t border-border pt-6">
      <span className="font-display text-display-sm text-navy">{figure}</span>
      <span className="text-eyebrow font-semibold uppercase text-teal">{label}</span>
      {note ? <span className="text-sm text-muted-foreground">{note}</span> : null}
    </div>
  );
}
