export type Award = {
  year: string;
  title: string;
  body: string;
};

export function AwardTile({ award }: { award: Award }) {
  return (
    <div className="flex flex-col gap-3 border-t border-gold/50 pt-6">
      <span className="text-eyebrow font-semibold uppercase text-gold">{award.year}</span>
      <h3 className="font-display text-xl text-navy">{award.title}</h3>
      <p className="text-sm text-muted-foreground">{award.body}</p>
    </div>
  );
}
