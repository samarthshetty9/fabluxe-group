import { useRef } from "react";

const TOOLS = ["B", "I", "H2", "H3", "“ ”", "• List", "1. List", "Link", "Image"];

/**
 * Rich-text-style editor placeholder. The toolbar is visual only; the field is
 * a plain textarea so the prototype stays dependency-free.
 * // TODO: swap for the client's chosen WYSIWYG editor at build time.
 */
export function RichTextEditor({
  id,
  label,
  value,
  onChange,
  disabled,
  rows = 8,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  rows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </label>
      <div className="rounded-xs border border-border-strong bg-surface">
        <div className="flex flex-wrap items-center gap-1 border-b border-border px-2 py-1.5">
          {TOOLS.map((tool) => (
            <button
              key={tool}
              type="button"
              disabled={disabled}
              onClick={() => ref.current?.focus()}
              className="rounded-xs px-2 py-1 text-xs text-navy transition-colors hover:bg-sky disabled:cursor-not-allowed disabled:text-muted-foreground"
            >
              {tool}
            </button>
          ))}
          <span className="ml-auto text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            Placeholder toolbar
          </span>
        </div>
        <textarea
          id={id}
          ref={ref}
          rows={rows}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-y bg-transparent px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none disabled:cursor-not-allowed disabled:text-muted-foreground"
          placeholder="Write the body copy here…"
        />
      </div>
    </div>
  );
}
