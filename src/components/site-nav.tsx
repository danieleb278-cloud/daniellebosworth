import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "resume", label: "Résumé" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-background/75 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-xl tracking-tight">dscript</span>
          <span className="eyebrow hidden sm:inline">— index</span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`/#${s.id}`}
                className="eyebrow link-underline text-foreground"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="mailto:hello@dscript.studio"
          className="eyebrow hidden rounded-full border border-foreground px-4 py-2 text-foreground transition-colors hover:bg-foreground hover:text-background md:inline-block"
        >
          Available — Q3
        </a>
      </nav>
    </header>
  );
}
