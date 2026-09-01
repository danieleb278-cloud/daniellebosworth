import { useEffect, useState, type CSSProperties } from "react";

type ConnectionHeroProps = {
  portraitUrl: string;
  resumeUrl: string;
};

const coreWords = [
  { label: "Behavior", className: "word-behavior" },
  { label: "Information", className: "word-information" },
  { label: "Friction", className: "word-friction" },
  { label: "Constraints", className: "word-constraints" },
  { label: "Business needs", className: "word-business" },
  { label: "Contradictions", className: "word-contradictions" },
] as const;

const supportingWords = [
  { label: "Systems", className: "word-systems" },
  { label: "Patterns", className: "word-patterns" },
  { label: "Research", className: "word-research" },
  { label: "Signals", className: "word-signals" },
  { label: "Human", className: "word-human" },
  { label: "Process", className: "word-process" },
  { label: "Structure", className: "word-structure" },
  { label: "Context", className: "word-context" },
  { label: "Strategy", className: "word-strategy" },
  { label: "Experience", className: "word-experience" },
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
    <section className="connection-hero relative overflow-hidden bg-charcoal px-6 pb-20 pt-32 text-background md:px-12 md:pb-28 md:pt-44">
      <div aria-hidden className="connection-hero-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(34rem,1.08fr)] lg:items-center lg:gap-16">
        <div className="max-w-3xl">
          <p className="eyebrow !text-teal">Systems-minded product &amp; experience strategist</p>
          <h1 className="mt-7 max-w-[12ch] font-display text-[clamp(3.2rem,6.8vw,7rem)] leading-[0.91] tracking-[-0.055em] text-background">
            I see connections others <span className="italic text-teal">overlook.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-background/75 md:text-lg">
            I bridge human behavior, operational workflows, and AI systems, turning complex business friction into
            structured, high-impact product experiences.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#work"
              className="arrow-slide inline-flex min-h-12 items-center justify-center border border-teal bg-teal px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              Explore selected work <span aria-hidden className="arrow">→</span>
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center border border-background/35 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:border-teal hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              View résumé
            </a>
          </div>
        </div>

        <div className="min-w-0">
          <div
            id="connection-field"
            className={`word-field relative isolate h-[31rem] overflow-hidden border border-background/15 bg-background/[0.025] sm:h-[34rem] ${connected ? "is-connected" : ""} ${reduceMotion ? "reduce-motion" : ""}`}
            aria-label={
              connected
                ? "Clarity revealed from overlapping signals, leading to designs, systems, and experiences."
                : "A layered field of human, information, process, and business signals."
            }
          >
            <div aria-hidden className="portrait-field absolute z-0">
              <img src={portraitUrl} alt="" className="h-full w-full object-cover object-top grayscale" />
              <div className="portrait-wash absolute inset-0" />
            </div>

            <div aria-hidden className="focus-glow absolute left-1/2 top-[46%] z-[1] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full" />

            <div className="word-cloud absolute inset-0 z-10" aria-hidden>
              {supportingWords.map((word, index) => (
                <span
                  key={word.label}
                  className={`cloud-word support-word ${word.className}`}
                  style={{ "--word-index": index } as CSSProperties}
                >
                  {word.label}
                </span>
              ))}
              {coreWords.map((word, index) => (
                <span
                  key={word.label}
                  className={`cloud-word core-word ${word.className}`}
                  style={{ "--word-index": index } as CSSProperties}
                >
                  {word.label}
                </span>
              ))}
            </div>

            <div className="clarity-resolution absolute z-20 text-left">
              <span className="clarity-kicker block font-mono text-[0.6rem] uppercase tracking-[0.28em] text-teal">
                Patterns become visible
              </span>
              <span className="clarity-word mt-2 block font-display text-[clamp(3.5rem,8vw,6rem)] italic leading-none text-background">
                Clarity
              </span>
              <span className="clarity-copy mt-4 block max-w-xs font-display text-base italic leading-snug text-background/75 sm:text-lg">
                The opportunity is often in the connection.
              </span>
            </div>

            <div className="outcome-row absolute inset-x-5 bottom-8 z-20 grid grid-cols-3 gap-3 sm:inset-x-8">
              {["Designs", "Systems", "Experiences"].map((outcome) => (
                <div
                  key={outcome}
                  className="border-t border-teal/70 pt-3 text-center font-mono text-[0.68rem] uppercase tracking-[0.14em] text-background sm:text-xs"
                >
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-5">
            <button
              type="button"
              aria-expanded={connected}
              aria-controls="connection-field"
              aria-describedby="connection-state-description"
              onClick={() => setConnected((value) => !value)}
              className="inline-flex min-h-11 w-fit items-center gap-3 border-b border-teal pb-1 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              {connected ? "Reset view" : "Reveal the connections"}
              <span aria-hidden>{connected ? "↺" : "↗"}</span>
            </button>
            <p id="connection-state-description" aria-live="polite" className="sr-only">
              {connected
                ? "The overlapping signals have resolved into clarity, designs, systems, and experiences."
                : "The signals are layered in an intentionally complex editorial composition."}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .connection-hero-grid {
          background-image:
            linear-gradient(color-mix(in oklab, var(--teal) 9%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklab, var(--teal) 9%, transparent) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .word-field {
          background:
            radial-gradient(circle at 73% 42%, color-mix(in oklab, var(--teal) 8%, transparent), transparent 39%),
            color-mix(in oklab, var(--charcoal) 96%, black);
        }
        .portrait-field {
          right: 3%;
          top: 7%;
          width: 44%;
          height: 82%;
          overflow: hidden;
          opacity: 0;
          transform: scale(.92) translateY(12px);
          transform-origin: center;
          transition: opacity 520ms ease 420ms, transform 760ms cubic-bezier(.2,.78,.22,1) 380ms, filter 620ms ease 380ms;
        }
        .portrait-wash {
          background: linear-gradient(90deg, color-mix(in oklab, var(--charcoal) 44%, transparent), transparent 24%);
          opacity: 1;
          transition: opacity 420ms ease 460ms;
        }
        .focus-glow {
          background: color-mix(in oklab, var(--teal) 22%, transparent);
          filter: blur(46px);
          opacity: 0;
          transform: translate(-50%, -50%) scale(.45);
          transition: opacity 500ms ease 310ms, transform 760ms cubic-bezier(.2,.78,.22,1) 260ms;
        }
        .cloud-word {
          position: absolute;
          display: block;
          white-space: nowrap;
          line-height: .88;
          color: var(--background);
          transition:
            left 860ms cubic-bezier(.2,.78,.22,1),
            top 860ms cubic-bezier(.2,.78,.22,1),
            transform 860ms cubic-bezier(.2,.78,.22,1),
            opacity 620ms ease,
            filter 700ms ease,
            letter-spacing 860ms cubic-bezier(.2,.78,.22,1);
          transition-delay: calc(var(--word-index) * 22ms);
        }
        .support-word {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: .18em;
          opacity: .45;
        }
        .core-word { z-index: 2; }

        .word-systems { left: 5%; top: 12%; font-family: var(--font-sans); font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 600; letter-spacing: -.05em; opacity: .76; }
        .word-patterns { right: 4%; top: 7%; font-size: clamp(.7rem, 1.6vw, 1rem); color: var(--teal); }
        .word-research { left: 9%; top: 31%; font-size: clamp(.62rem, 1.3vw, .82rem); }
        .word-signals { left: 47%; top: 28%; font-size: clamp(.78rem, 1.6vw, 1rem); opacity: .65; }
        .word-human { right: 5%; top: 35%; font-size: clamp(.62rem, 1.3vw, .82rem); color: var(--teal); }
        .word-process { left: 48%; top: 68%; font-family: var(--font-sans); font-size: clamp(1.8rem, 4vw, 3.2rem); font-weight: 600; letter-spacing: -.04em; opacity: .55; }
        .word-structure { right: 5%; top: 55%; font-size: clamp(.65rem, 1.4vw, .88rem); }
        .word-context { left: 5%; top: 83%; font-size: clamp(.6rem, 1.2vw, .76rem); writing-mode: vertical-rl; transform: rotate(180deg); }
        .word-strategy { left: 41%; top: 12%; font-family: var(--font-display); font-size: clamp(1.15rem, 2.7vw, 2rem); font-style: italic; letter-spacing: .01em; opacity: .48; }
        .word-experience { left: 8%; top: 67%; font-family: var(--font-sans); font-size: clamp(1.15rem, 2.8vw, 2.05rem); letter-spacing: -.02em; opacity: .48; }

        .word-behavior { left: 6%; top: 39%; font-family: var(--font-sans); font-size: clamp(2.25rem, 5.2vw, 4.2rem); font-weight: 600; letter-spacing: -.055em; opacity: .94; }
        .word-information { right: 5%; top: 20%; font-family: var(--font-mono); font-size: clamp(.72rem, 1.55vw, 1rem); letter-spacing: .2em; text-transform: uppercase; opacity: .6; }
        .word-friction { left: 56%; top: 42%; font-family: var(--font-display); font-size: clamp(1.35rem, 3vw, 2.3rem); font-style: italic; letter-spacing: .02em; opacity: .82; }
        .word-constraints { left: 10%; top: 60%; font-family: var(--font-mono); font-size: clamp(.72rem, 1.45vw, .95rem); letter-spacing: .17em; text-transform: uppercase; opacity: .57; }
        .word-business { left: 33%; top: 80%; font-family: var(--font-mono); font-size: clamp(.68rem, 1.4vw, .9rem); letter-spacing: .14em; text-transform: uppercase; opacity: .7; }
        .word-contradictions { right: 3%; top: 77%; font-family: var(--font-display); font-size: clamp(1.2rem, 2.7vw, 2rem); font-style: italic; opacity: .74; }

        .clarity-resolution, .outcome-row {
          opacity: 0;
          pointer-events: none;
        }
        .clarity-resolution {
          left: 6%;
          top: 22%;
          width: 42%;
          filter: blur(13px);
          transform: scale(.82) translateY(10px);
          transform-origin: left center;
          transition: opacity 470ms ease 430ms, filter 650ms ease 390ms, transform 720ms cubic-bezier(.2,.78,.22,1) 360ms;
        }
        .clarity-kicker, .clarity-copy {
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 380ms ease 650ms, transform 520ms ease 620ms;
        }
        .outcome-row {
          transform: translateY(14px);
          transition: opacity 450ms ease 720ms, transform 600ms cubic-bezier(.2,.78,.22,1) 690ms;
        }

        .is-connected .support-word {
          opacity: 0;
          filter: blur(8px);
          transform: scale(.88);
        }
        .is-connected .core-word {
          left: 50%;
          top: 43%;
          opacity: 0;
          filter: blur(10px);
          transform: translate(-50%, -50%) scale(.72);
          letter-spacing: -.04em;
        }
        .is-connected .portrait-field {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: contrast(1.05);
        }
        .is-connected .portrait-wash {
          opacity: 0;
        }
        .is-connected .focus-glow {
          opacity: .7;
          transform: translate(-50%, -50%) scale(1);
        }
        .is-connected .clarity-resolution {
          opacity: 1;
          filter: blur(0);
          transform: scale(1) translateY(0);
        }
        .is-connected .clarity-kicker,
        .is-connected .clarity-copy {
          opacity: 1;
          transform: translateY(0);
        }
        .is-connected .outcome-row {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 639px) {
          .word-field { height: 32rem; }
          .portrait-field { right: 3%; top: 11%; width: 48%; height: 72%; opacity: 0; }
          .clarity-resolution { left: 5%; top: 19%; width: 43%; }
          .clarity-word { font-size: clamp(2.7rem, 13vw, 4rem) !important; }
          .clarity-kicker { font-size: .5rem !important; letter-spacing: .18em !important; }
          .clarity-copy { max-width: 10.5rem; font-size: .82rem !important; }
          .word-systems { font-size: 2.3rem; }
          .word-behavior { font-size: 2.35rem; top: 40%; }
          .word-process { font-size: 1.9rem; left: 43%; }
          .word-friction { left: 50%; font-size: 1.35rem; }
          .word-contradictions { font-size: 1.15rem; }
          .word-experience { font-size: 1.15rem; }
          .word-strategy { left: 39%; font-size: 1.1rem; }
          .outcome-row { inset-inline: .8rem; gap: .4rem; }
          .outcome-row > div { font-size: .64rem !important; letter-spacing: .05em !important; }
          .clarity-copy { max-width: 15rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .cloud-word, .portrait-field, .focus-glow, .clarity-resolution, .clarity-kicker, .clarity-copy, .outcome-row {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
