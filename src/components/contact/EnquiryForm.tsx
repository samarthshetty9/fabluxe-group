import { useMemo, useState } from "react";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/primitives/Reveal";
import { EyebrowLabel } from "@/components/primitives/EyebrowLabel";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  enquiryType: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type EnquiryType = { value: string; label: string };

type EnquiryFormProps = {
  enquiryTypes: EnquiryType[];
};

const EMPTY: FormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  enquiryType: "",
  message: "",
};

/**
 * B2B enquiry form. All validation is client-side — there is no back end on
 * this prototype. A success panel replaces the form on submit with a mock
 * reference number.
 */
export function EnquiryForm({ enquiryTypes }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});

  const schema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .trim()
          .min(2, { message: "Please enter your full name." })
          .max(80, { message: "Name must be under 80 characters." }),
        email: z
          .string()
          .trim()
          .min(1, { message: "Email is required." })
          .email({ message: "Please enter a valid email address." }),
        phone: z
          .string()
          .trim()
          .min(1, { message: "Phone number is required." })
          .regex(/^[0-9+()\-\s]{6,20}$/, {
            message: "Please enter a valid phone number.",
          }),
        company: z.string().trim().max(120, { message: "Too long." }).optional().or(z.literal("")),
        enquiryType: z.string().min(1, { message: "Please choose an enquiry type." }),
        message: z
          .string()
          .trim()
          .min(10, { message: "Please tell us a little more (10+ characters)." })
          .max(2000, { message: "Message must be under 2000 characters." }),
      }),
    [],
  );

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key] !== undefined) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = schema.safeParse(values);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormValues | undefined;
        if (key && fieldErrors[key] === undefined) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    // TODO: integrate with SixOrbit — client's existing enquiry system.
    // The prototype only mints a reference number client-side.
    const ref = `FBL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setReference(ref);
    setSubmitted(true);
  }

  function resetForm() {
    setValues(EMPTY);
    setErrors({});
    setSubmitted(false);
    setReference("");
  }

  if (submitted) {
    return <SuccessPanel reference={reference} onReset={resetForm} />;
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-soft sm:p-8">
      <Reveal>
        <EyebrowLabel>B2B enquiry</EyebrowLabel>
        <h2 className="mt-3 font-display text-display-sm text-foreground">
          Tell us about your project
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Send the brief and a project lead will come back to you within one working day.
        </p>
      </Reveal>

      <form noValidate onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" required error={errors["name"]} htmlFor="enquiry-name">
            <Input
              id="enquiry-name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={errors["name"] !== undefined}
            />
          </Field>
          <Field label="Email" required error={errors["email"]} htmlFor="enquiry-email">
            <Input
              id="enquiry-email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              aria-invalid={errors["email"] !== undefined}
            />
          </Field>
          <Field label="Phone" required error={errors["phone"]} htmlFor="enquiry-phone">
            <Input
              id="enquiry-phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              aria-invalid={errors["phone"] !== undefined}
            />
          </Field>
          <Field
            label="Company name"
            optional
            error={errors["company"]}
            htmlFor="enquiry-company"
          >
            <Input
              id="enquiry-company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              aria-invalid={errors["company"] !== undefined}
            />
          </Field>
        </div>

        <Field
          label="Enquiry type"
          required
          error={errors["enquiryType"]}
          htmlFor="enquiry-type"
        >
          <Select
            value={values.enquiryType}
            onValueChange={(v) => update("enquiryType", v)}
          >
            <SelectTrigger id="enquiry-type" aria-invalid={errors["enquiryType"] !== undefined}>
              <SelectValue placeholder="Choose an enquiry type" />
            </SelectTrigger>
            <SelectContent>
              {enquiryTypes.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field
          label="Enquiry message"
          required
          error={errors["message"]}
          htmlFor="enquiry-message"
        >
          <Textarea
            id="enquiry-message"
            rows={5}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={errors["message"] !== undefined}
            placeholder="Project type, location, timeline, budget range…"
          />
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            By submitting you agree to be contacted about this enquiry.
          </p>
          <Button type="submit" size="lg" className="sm:min-w-44">
            Send enquiry
          </Button>
        </div>
      </form>
    </div>
  );
}

type FieldProps = {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string | undefined;
  htmlFor: string;
  children: React.ReactNode;
};

function Field({ label, required, optional, error, htmlFor, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
        {label}
        {required ? <span className="ml-0.5 text-gold">*</span> : null}
        {optional ? (
          <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p role="alert" className="text-xs text-teal">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SuccessPanel({
  reference,
  onReset,
}: {
  reference: string;
  onReset: () => void;
}) {
  return (
    <div className="flex h-full min-h-80 flex-col items-center justify-center rounded-lg border border-border bg-surface p-8 text-center shadow-soft">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal/15 text-teal">
        <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 font-display text-display-sm text-foreground">Enquiry received</h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Thank you. Your enquiry has been logged in our prototype system. A project lead will
        come back to you within one working day.
      </p>
      <p className="mt-5 text-eyebrow font-medium uppercase text-muted-foreground">
        Reference number
      </p>
      <p className="mt-1 font-display text-xl text-foreground">{reference}</p>
      <Button variant="outline" className="mt-6" onClick={onReset}>
        Send another enquiry
      </Button>
    </div>
  );
}
