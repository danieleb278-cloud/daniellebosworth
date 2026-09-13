import { useEffect, useState } from "react";

type ConnectionHeroProps = {
  portraitUrl: string;
  resumeUrl: string;
};

const signals = [
  { label: "Customer feedback", className: "signal-feedback" },
  { label: "Operations", className: "signal-operations" },
  { label: "Human behavior", className: "signal-behavior" },
  { label: "Product", className: "signal-product" },
  { label: "Experience", className: "signal-experience" },
] as const;

export function ConnectionHero({ portraitUrl, resumeUrl }: ConnectionHeroProps) {
  const [connected, setConnected] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduceMotion(media.matches);
      if (media.matches) setConnected(true);
    };

    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  return (
    <section className="connection-hero relative overflow-hidden bg-charcoal px-6 pb-12 pt-32 text-background md:px-12 md:pb-16 md:pt-40">
      <div aria-hidden className="connection-hero-grid absolute inset-0 opacity-30" />

      <div
        id="connection-field"
        className={`editorial-hero relative mx-auto max-w-[1400px] ${
          connected ? "is-connected" : ""
        } ${reduceMotion ? "reduce-motion" : ""}`}
        aria-label={
          connected
            ? "Danielle's portrait and a personal note about her cross-functional approach."
            : "An editorial composition connecting customer feedback, operations, human behavior, product, and experience."
        }
      >
        <p className="hero-eyebrow eyebrow !text-teal">Systems-minded product &amp; experience strategist</p>

        <h1 className="hero-headline font-display text-[clamp(3.2rem,7.2vw,7.35rem)] leading-[0.88] tracking-[-0.06em] text-background">
          <span className="block">I see</span>
          <span className="block">connections</span>
          <span className="block">
            others <span className="italic text-teal">overlook.</span>
          </span>
        </h1>

        <div aria-hidden className="portrait-integrated">
          <img src={portraitUrl} alt="" className="h-full w-full object-cover object-top grayscale" />
          <div className="portrait-veil absolute inset-0" />
        </div>

        <div aria-hidden className="signal-field">
          {signals.map((signal) => (
            <span key={signal.label} className={`signal-label ${signal.className}`}>
              {signal.label}
            </span>
          ))}
        </div>

        <blockquote className="hero-note">
          <span aria-hidden className="note-mark note-mark-open">“</span>
          <div className="note-composition">
            <p className="note-line note-intro">I work best between departments,</p>
            <p className="note-line note-together">bringing together</p>
            <p className="note-line note-feedback">
              <span>customer feedback</span>,
            </p>
            <p className="note-line note-context">stakeholder needs, and day-to-day operations.</p>
            <p className="note-line note-transition">Whether I’m shaping a</p>
            <p className="note-line note-product">product</p>
            <p className="note-line note-action">idea, improving an experience, or fixing a workflow,</p>
            <p className="note-line note-ending">I turn what I learn into practical solutions.</p>
          </div>
          <span aria-hidden className="note-mark note-mark-close">”</span>
        </blockquote>

        <a
          href="#work"
          className="cta-work arrow-slide inline-flex min-h-12 items-center justify-center border border-teal bg-teal px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
        >
          Explore selected work <span aria-hidden className="arrow">→</span>
        </a>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-resume inline-flex min-h-11 items-center border-b border-background/40 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:border-teal hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
        >
          View résumé <span aria-hidden className="ml-3">↗</span>
        </a>

        <button
          type="button"
          aria-expanded={connected}
          aria-controls="connection-field"
          aria-describedby="connection-state-description"
          onClick={() => setConnected((value) => !value)}
          className="state-toggle inline-flex min-h-12 items-center gap-3 border border-background/25 px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:border-teal hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
        >
          <span aria-hidden>↻</span>
          {connected ? "Show starting point" : "Show connections"}
        </button>

        <p id="connection-state-description" aria-live="polite" className="sr-only">
          {connected
            ? "The starting-point view shows Danielle's portrait and personal statement about her cross-functional approach."
            : "The connections view shows functional signals positioned around Danielle's headline and portrait."}
        </p>
      </div>

      <style>{`
        .connection-hero-grid {
          background-image:
            linear-gradient(color-mix(in oklab, var(--teal) 8%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklab, var(--teal) 8%, transparent) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, black, transparent 96%);
        }

        .editorial-hero {
          min-height: 45rem;
          isolation: isolate;
          border-bottom: 1px solid color-mix(in oklab, var(--background) 16%, transparent);
        }

        .hero-eyebrow {
          position: absolute;
          left: 0;
          top: 6rem;
          z-index: 6;
        }

        .hero-headline {
          position: absolute;
          left: 0;
          top: 10rem;
          z-index: 5;
          max-width: 10.2ch;
          text-wrap: balance;
        }

        .portrait-integrated {
          position: absolute;
          right: -4%;
          top: 1rem;
          z-index: 2;
          width: 38%;
          height: 39rem;
          overflow: hidden;
          opacity: .58;
          transform: translateX(1.5rem);
          transition: opacity 700ms ease, transform 850ms cubic-bezier(.2,.78,.22,1), filter 700ms ease;
          mask-image: linear-gradient(90deg, transparent 0%, black 18%, black 100%);
        }

        .portrait-veil {
          background:
            linear-gradient(90deg, var(--charcoal) 0%, transparent 32%),
            linear-gradient(0deg, var(--charcoal) 0%, transparent 18%);
          opacity: .88;
          transition: opacity 650ms ease;
        }

        .signal-field {
          position: absolute;
          inset: 0;
          z-index: 4;
          pointer-events: none;
        }

        .signal-label {
          position: absolute;
          font-family: var(--font-mono);
          font-size: .9rem;
          font-weight: 500;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: color-mix(in oklab, var(--background) 74%, transparent);
          transition: opacity 500ms ease, color 500ms ease, transform 700ms cubic-bezier(.2,.78,.22,1);
        }

        .signal-feedback {
          left: 46%;
          top: 40%;
          color: var(--teal);
          font-family: var(--font-display);
          font-size: clamp(1.45rem, 2.2vw, 2.15rem);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -.015em;
          text-transform: none;
        }
        .signal-operations { left: 32%; top: 72%; }
        .signal-behavior { left: 4%; top: 76%; }
        .signal-product {
          left: 57%;
          top: 69%;
          color: var(--background);
          font-family: var(--font-display);
          font-size: clamp(1.65rem, 2.5vw, 2.5rem);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -.02em;
          text-transform: none;
        }
        .signal-experience { right: 5%; top: 76%; }


        .hero-note {
          position: absolute;
          left: 42%;
          top: 11.5rem;
          bottom: auto;
          z-index: 6;
          width: min(23.5rem, 23.5%);
          color: color-mix(in oklab, var(--background) 90%, transparent);
          font-family: var(--font-display);
          font-size: clamp(.92rem, 1.05vw, 1.05rem);
          line-height: 1.24;
          text-align: center;
          opacity: 0;
          transform: translateY(1rem);
          transition: opacity 520ms ease 260ms, transform 700ms cubic-bezier(.2,.78,.22,1) 220ms;
        }

        .note-composition {
          position: relative;
          padding: 1.55rem 1.25rem 1.7rem;
        }

        .note-line {
          margin: 0;
          text-wrap: balance;
        }

        .note-intro { transform: translateX(-.65rem); }
        .note-together { margin-top: .12rem; transform: translateX(.55rem); }
        .note-feedback {
          margin: .42rem auto .28rem;
          transform: translateX(-.6rem);
        }
        .note-feedback span {
          color: var(--teal);
          font-size: clamp(1.55rem, 2vw, 2.05rem);
          font-style: italic;
          line-height: .95;
        }
        .note-context {
          margin-inline: auto;
          max-width: 19rem;
          transform: translateX(.45rem);
        }
        .note-transition { margin-top: .72rem; transform: translateX(-.55rem); }
        .note-product {
          margin: .08rem auto .22rem;
          color: var(--background);
          font-size: clamp(1.95rem, 2.65vw, 2.7rem);
          font-style: italic;
          line-height: .92;
          transform: translateX(.75rem);
        }
        .note-action {
          margin-inline: auto;
          max-width: 21rem;
          transform: translateX(-.35rem);
        }
        .note-ending {
          margin: .2rem auto 0;
          max-width: 19rem;
          transform: translateX(.5rem);
        }

        .note-mark {
          position: absolute;
          z-index: -1;
          color: var(--teal);
          font-family: var(--font-display);
          font-size: clamp(5.5rem, 7vw, 7.5rem);
          font-style: italic;
          line-height: .7;
          opacity: .72;
        }

        .note-mark-open {
          left: -1.2rem;
          top: -.85rem;
        }

        .note-mark-close {
          right: -1.1rem;
          bottom: -1rem;
        }

        .cta-work {
          position: absolute;
          left: 0;
          bottom: 1.25rem;
          z-index: 8;
        }

        .cta-resume {
          position: absolute;
          left: 50%;
          bottom: 1.25rem;
          z-index: 8;
          transform: translateX(-50%);
        }

        .state-toggle {
          position: absolute;
          right: 0;
          bottom: 1.25rem;
          z-index: 8;
        }

        .is-connected .portrait-integrated {
          opacity: 1;
          transform: translateX(0);
          filter: contrast(1.04);
        }

        .is-connected .portrait-veil { opacity: .52; }
        .is-connected .hero-note {
          opacity: 1;
          transform: translateY(0);
        }
        .is-connected .signal-label { opacity: .1; }

        @media (max-width: 1023px) {
          .editorial-hero { min-height: 43rem; }
          .portrait-integrated { right: -5%; width: 43%; height: 36rem; }
          .hero-headline { max-width: 9.4ch; }
          .hero-note { left: 39%; top: 11.25rem; width: 25%; font-size: .9rem; }
          .cta-resume { left: 22rem; }
          .signal-feedback { left: 45%; top: 40%; }
          .signal-product { left: 55%; top: 69%; }
        }

        @media (max-width: 767px) {
          .connection-hero { padding-top: 7rem; }
          .editorial-hero { min-height: 57rem; }
          .hero-eyebrow { top: 0; max-width: 19rem; line-height: 1.5; }
          .hero-headline {
            top: 4rem;
            width: 100%;
            max-width: 9.5ch;
            font-size: clamp(3.25rem, 16vw, 5.3rem);
            line-height: .9;
          }
          .portrait-integrated {
            right: -8%;
            top: 20rem;
            width: 72%;
            height: 31rem;
            opacity: .52;
            mask-image: linear-gradient(90deg, transparent 0%, black 22%, black 100%);
          }
          .portrait-veil {
            background:
              linear-gradient(90deg, var(--charcoal) 0%, transparent 35%),
              linear-gradient(0deg, var(--charcoal) 0%, transparent 22%);
          }
          .signal-label { font-size: .68rem; letter-spacing: .12em; }
          .signal-feedback { font-size: clamp(1.05rem, 5vw, 1.35rem); }
          .signal-product { font-size: clamp(1.25rem, 6vw, 1.65rem); }
          .signal-feedback { left: 4%; top: 38%; }
          .signal-operations { left: 2%; top: 48%; }
          .signal-behavior { left: 4%; top: 57%; writing-mode: vertical-rl; transform: rotate(180deg); }
          .signal-product { left: 38%; top: 63%; }
          .signal-experience { right: 1%; top: 56%; }
          .hero-note {
            left: 3%;
            top: auto;
            bottom: 13.1rem;
            width: 61%;
            max-width: 17rem;
            font-size: .82rem;
            line-height: 1.28;
          }
          .note-composition { padding: 1.7rem .65rem 1.9rem; }
          .note-feedback { margin-block: .35rem .22rem; transform: translateX(-.2rem); }
          .note-feedback span { font-size: clamp(1.3rem, 6vw, 1.75rem); }
          .note-transition { margin-top: .72rem; }
          .note-product {
            font-size: clamp(1.7rem, 8vw, 2.25rem);
            transform: translateX(.35rem);
          }
          .note-mark { font-size: 5rem; }
          .note-mark-open { left: -.3rem; top: 0; }
          .note-mark-close { right: -.1rem; bottom: -.3rem; }
          .cta-work {
            left: 0;
            bottom: 8.75rem;
            width: 100%;
          }
          .cta-resume {
            left: 0;
            right: auto;
            bottom: 5rem;
            transform: none;
            min-height: 2.75rem;
            padding-inline: .1rem;
          }
          .state-toggle {
            left: 0;
            right: auto;
            bottom: .5rem;
            min-height: 3.25rem;
          }
          .is-connected .signal-behavior { transform: rotate(180deg); }
        }

        @media (max-width: 420px) {
          .editorial-hero { min-height: 59rem; }
          .hero-headline { font-size: clamp(3rem, 15.5vw, 4.25rem); }
          .portrait-integrated { top: 19rem; width: 78%; }
          .hero-note { width: 64%; max-width: 16rem; bottom: 13.1rem; font-size: .78rem; }
          .cta-work { bottom: 8.75rem; }
          .cta-resume { bottom: 5rem; }
          .state-toggle { bottom: .5rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .portrait-integrated,
          .portrait-veil,
          .signal-label,
          .hero-note {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
