import type { LucideIcon } from "lucide-react";
import { Phone, Mail } from "lucide-react";

export type CompanyContact = {
  id: string;
  name: string;
  sector: string;
  phone: string;
  email: string;
  lines: string[];
};

/** Compact contact card per operating company, to reinforce separate legal entities. */
export function CompanyContactCard({ company }: { company: CompanyContact }) {
  const details: { icon: LucideIcon; href: string; value: string }[] = [
    { icon: Phone, href: `tel:${company.phone.replace(/\s+/g, "")}`, value: company.phone },
    { icon: Mail, href: `mailto:${company.email}`, value: company.email },
  ];
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <p className="text-eyebrow font-medium uppercase text-gold">{company.sector}</p>
      <h3 className="mt-1 font-display text-lg text-foreground">{company.name}</h3>
      <ul className="mt-3 flex flex-col gap-1 text-sm text-muted-foreground">
        {company.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <dl className="mt-4 flex flex-col gap-2 border-t border-border pt-4 text-sm">
        {details.map(({ icon: Icon, href, value }) => (
          <div key={href} className="flex items-center gap-2">
            <Icon className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
            <a href={href} className="text-foreground underline-offset-4 hover:underline">
              {value}
            </a>
          </div>
        ))}
      </dl>
    </div>
  );
}
