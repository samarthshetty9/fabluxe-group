import { useEffect, useState } from "react";
import { ActionLink } from "@/components/primitives/ActionLink";
import { BrandMark } from "./BrandMark";
import group from "@/data/group.json";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid ? "bg-navy shadow-sm" : "bg-transparent",
      )}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-7 xl:flex">
          {group.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-eyebrow font-semibold uppercase text-on-dark-muted transition-colors duration-300 hover:text-gold"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ActionLink href="/contact" variant="gold" tone="light" className="hidden sm:inline-flex">
            Enquire
          </ActionLink>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex size-11 flex-col items-center justify-center gap-1.5 border border-on-dark-muted/40 xl:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="block h-px w-5 bg-on-dark" />
            <span aria-hidden="true" className="block h-px w-5 bg-on-dark" />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-on-dark-muted/20 bg-navy xl:hidden">
          <ul className="shell flex flex-col py-4">
            {group.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-on-dark-muted/15 py-4 text-eyebrow font-semibold uppercase text-on-dark-muted hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
