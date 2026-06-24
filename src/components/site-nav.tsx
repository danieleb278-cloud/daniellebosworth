import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png.asset.json";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isDark = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isDark
          ? "backdrop-blur-md bg-charcoal/95 border-b border-background/10 shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 py-4 md:px-12">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="group flex min-w-0 items-baseline gap-2"
        >
          <span className={`truncate font-display text-lg tracking-tight sm:text-xl ${isDark ? 'text-background' : 'text-foreground'}`}>
            Danielle Bosworth
          </span>
          <span className={`eyebrow hidden sm:inline ${isDark ? 'text-background/70' : ''}`}>
            — portfolio
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`/#${s.id}`}
                className={`eyebrow link-underline ${isDark ? 'text-background' : 'text-foreground'}`}
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:Danieleb278@gmail.com"
              className="eyebrow rounded-full border border-teal px-4 py-2 text-teal transition-colors hover:bg-teal hover:text-charcoal"
            >
              Open to full-time, contract, or part-time roles
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`eyebrow flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 md:hidden ${isDark ? 'border-background/30 text-background' : 'border-foreground text-foreground'}`}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 right-0 h-px transition-transform duration-300 ${isDark ? 'bg-background' : 'bg-foreground'} ${open ? "top-1/2 rotate-45" : "top-0"}`}
            />
            <span
              className={`absolute left-0 right-0 h-px transition-transform duration-300 ${isDark ? 'bg-background' : 'bg-foreground'} ${open ? "top-1/2 -rotate-45" : "top-full"}`}
            />
          </span>
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`overflow-hidden md:hidden ${
          open ? "max-h-[80vh] border-t border-background/20 bg-charcoal text-background" : "max-h-0"
        } transition-[max-height] duration-500 ease-out`}
      >
        <ul className="flex flex-col divide-y divide-background/20 px-6 py-2">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`/#${s.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 font-display text-2xl tracking-tight text-background"
              >
                <span>{s.label}</span>
                <span className="eyebrow text-background/60">→</span>
              </a>
            </li>
          ))}
          <li>
            <a
              href="mailto:Danieleb278@gmail.com"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between py-5 font-display text-2xl tracking-tight text-teal"
            >
              <span>Email</span>
              <span className="eyebrow text-teal">Open to full-time, contract, or part-time roles ✦</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
