import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ContactLine = {
  label: string;
  addressLines: string[];
  phone: string;
  email: string;
  hours: string;
};

/** Left column: full contact details split by company, plus hours and a map placeholder. */
export function ContactInfoPanel({ data }: { data: ContactLine }) {
  const { addressLines, phone, email, hours } = data;
  return (
    <div className="flex flex-col gap-8">
      <DetailRow icon={MapPin} label="Visit">
        <address className="not-italic leading-relaxed text-muted-foreground">
          {addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
      </DetailRow>
      <DetailRow icon={Phone} label="Call">
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {phone}
        </a>
      </DetailRow>
      <DetailRow icon={Mail} label="Email">
        <a
          href={`mailto:${email}`}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {email}
        </a>
      </DetailRow>
      <DetailRow icon={Clock} label="Working hours">
        <span className="text-muted-foreground">{hours}</span>
      </DetailRow>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-gold">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-eyebrow font-medium uppercase text-muted-foreground">{label}</p>
        <div className="text-base">{children}</div>
      </div>
    </div>
  );
}
