import { useEffect, useState } from "react";

type ConnectionHeroProps = {
  portraitUrl: string;
  resumeUrl: string;
};

const signals = [
  { label: "Behavior", initial: "signal-a", connected: "signal-a-connected" },
  { label: "Information", initial: "signal-b", connected: "signal-b-connected" },
  { label: "Friction", initial: "signal-c", connected: "signal-c-connected" },
  { label: "Constraints", initial: "signal-d", connected: "signal-d-connected" },
  { label: "Business needs", initial: "signal-e", connected: "signal-e-connected" },
  { label: "Contradictions", initial: "signal-f", connected: "signal-f-connected" },
] as const;

const connections = [
  ["23%", "23%", "50%", "50%"],
  ["73%", "19%", "50%", "50%"],
  ["18%", "58%", "50%", "50%"],
  ["76%", "55%", "50%", "50%"],
  ["31%", "82%", "50%", "50%"],
  ["69%", "81%", "50%", "50%"],
] as const;

export function ConnectionHero({ portraitUrl, resumeUrl }: ConnectionHeroProps) {
  const [connected, setConnected] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const showConnected = connected;

  return (
    <section className="connection-hero relative overflow-hidden bg-charcoal px-6 pb-20 pt-32 text-background md:px-12 md:pb-28 md:pt-44">
      <div aria-hidden className="connection-hero-grid absolute inset-0 opacity-35" />
      <div className="relative mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.92fr)_minmax(34rem,1.08fr)] lg:items-center lg:gap-16">
        <div className="max-w-3xl">
          <p className="eyebrow !text-teal">Systems-minded product &amp; experience strategist</p>
          <h1 className="mt-7 max-w-[12ch] font-display text-[clamp(3.2rem,6.8vw,7rem)] leading-[0.91] tracking-[-0.055em] text-background">
            I see connections others <span className="italic text-teal">overlook.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-background/75 md:text-lg">
            I uncover relationships between people, information, processes, and business needs, then turn friction,
            contradictions, and complexity into intuitive designs, clearer systems, and more meaningful experiences.
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
            className={`connection-field relative isolate h-[31rem] overflow-hidden border border-background/15 bg-background/[0.025] sm:h-[34rem] ${showConnected ? "is-connected" : ""} ${reduceMotion ? "reduce-motion" : ""}`}
            aria-label={showConnected
              ? "Connected view: six observations converge into clarity and lead to designs, systems, and experiences."
              : "Initial view: six separate observations awaiting connection."
            }
          >
            <div aria-hidden className="absolute inset-x-7 top-7 flex items-center justify-between">
              <span className="eyebrow !text-background/45">Connection field / 01</span>
              <span className="h-px w-14 bg-teal/60" />
            </div>

            <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map(([x1, y1, x2, y2], index) => (
                <line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  pathLength="1"
                  className="connection-line"
                />
              ))}
              <line x1="50%" y1="50%" x2="24%" y2="94%" pathLength="1" className="connection-line outcome-line" />
              <line x1="50%" y1="50%" x2="50%" y2="94%" pathLength="1" className="connection-line outcome-line" />
              <line x1="50%" y1="50%" x2="76%" y2="94%" pathLength="1" className="connection-line outcome-line" />
            </svg>

            <div className="portrait-signal absolute right-5 top-16 z-0 w-[5.75rem] border border-teal/60 bg-charcoal p-1.5 opacity-45 sm:right-7 sm:w-[7rem]">
              <img src={portraitUrl} alt="" className="aspect-[4/5] w-full object-cover object-top grayscale" />
            </div>

            {signals.map((signal, index) => (
              <div
                key={signal.label}
                className={`connection-node absolute z-10 ${signal.initial} ${showConnected ? signal.connected : ""}`}
                style={{ "--signal-index": index } as React.CSSProperties}
              >
                <span aria-hidden className="mr-2 text-teal">0{index + 1}</span>
                {signal.label}
              </div>
            ))}

            <div className="clarity-label absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block font-display text-3xl italic text-background sm:text-4xl">Clarity</span>
              <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-teal">
                relationships made visible
              </span>
            </div>

            <div className="outcomes absolute inset-x-5 bottom-6 z-20 grid grid-cols-3 gap-2 sm:inset-x-8">
              {["Designs", "Systems", "Experiences"].map((outcome) => (
                <div key={outcome} className="border-t border-teal/70 pt-2 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-background">
                  {outcome}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              aria-expanded={showConnected}
              aria-controls="connection-field"
              aria-describedby="connection-state-description"
              onClick={() => setConnected((value) => !value)}
              className="inline-flex min-h-11 w-fit items-center gap-3 border-b border-teal pb-1 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:text-teal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
            >
              {showConnected ? "Reset view" : "Reveal the connections"}
              <span aria-hidden>{showConnected ? "↺" : "↗"}</span>
            </button>
            <p
              id="connection-state-description"
              aria-live="polite"
              className={`max-w-xs font-display text-lg italic text-background/75 transition-opacity duration-700 ${showConnected ? "opacity-100" : "opacity-0"}`}
            >
              The opportunity is often in the connection.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .connection-hero-grid {
          background-image:
            linear-gradient(color-mix(in oklab, var(--teal) 10%, transparent) 1px, transparent 1px),
            linear-gradient(90deg, color-mix(in oklab, var(--teal) 10%, transparent) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: linear-gradient(to bottom, black, transparent 92%);
        }
        .connection-field::before {
          content: "";
          position: absolute;
          inset: 11% 8%;
          border: 1px solid color-mix(in oklab, var(--teal) 12%, transparent);
          pointer-events: none;
        }
        .connection-node {
          border-top: 1px solid color-mix(in oklab, var(--background) 34%, transparent);
          background: var(--charcoal);
          padding: .55rem .15rem .45rem;
          font-family: var(--font-mono);
          font-size: clamp(.62rem, 1.1vw, .72rem);
          letter-spacing: .11em;
          line-height: 1.2;
          text-transform: uppercase;
          white-space: nowrap;
          color: color-mix(in oklab, var(--background) 82%, transparent);
          transition: left 780ms cubic-bezier(.22,.61,.36,1), top 780ms cubic-bezier(.22,.61,.36,1), transform 780ms cubic-bezier(.22,.61,.36,1), border-color 700ms ease, color 700ms ease;
        }
        .signal-a { left: 9%; top: 19%; }
        .signal-b { left: 57%; top: 14%; }
        .signal-c { left: 6%; top: 53%; }
        .signal-d { left: 64%; top: 48%; }
        .signal-e { left: 18%; top: 75%; }
        .signal-f { left: 59%; top: 73%; }
        .signal-a-connected { left: 13%; top: 20%; }
        .signal-b-connected { left: 60%; top: 17%; }
        .signal-c-connected { left: 9%; top: 51%; }
        .signal-d-connected { left: 66%; top: 49%; }
        .signal-e-connected { left: 22%; top: 74%; }
        .signal-f-connected { left: 58%; top: 73%; }
        .is-connected .connection-node {
          border-color: color-mix(in oklab, var(--teal) 72%, transparent);
          color: var(--background);
        }
        .connection-line {
          stroke: color-mix(in oklab, var(--teal) 70%, transparent);
          stroke-width: .28;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          transition: stroke-dashoffset 760ms cubic-bezier(.22,.61,.36,1), opacity 300ms ease;
        }
        .outcome-line { stroke-width: .18; opacity: 0; }
        .is-connected .connection-line {
          stroke-dashoffset: 0;
          opacity: .78;
        }
        .is-connected .outcome-line { opacity: .35; transition-delay: 160ms; }
        .clarity-label, .outcomes {
          opacity: 0;
          transform-origin: center;
          transition: opacity 560ms ease 220ms;
          pointer-events: none;
        }
        .clarity-label { transform: translate(-50%, -50%) scale(.96); transition: opacity 560ms ease 220ms, transform 560ms ease 220ms; }
        .is-connected .clarity-label { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        .is-connected .outcomes { opacity: 1; }
        .portrait-signal { transition: opacity 600ms ease; }
        .is-connected .portrait-signal { opacity: .14; }

        @media (max-width: 639px) {
          .connection-node { font-size: .56rem; letter-spacing: .07em; }
          .portrait-signal { opacity: .25; }
          .signal-a { left: 6%; }
          .signal-b { left: 48%; }
          .signal-d { left: 54%; }
          .signal-f { left: 48%; }
          .signal-a-connected { left: 8%; }
          .signal-b-connected { left: 50%; }
          .signal-d-connected { left: 57%; }
          .signal-f-connected { left: 48%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .connection-node, .connection-line, .clarity-label, .outcomes, .portrait-signal {
            transition: none !important;
          }
          .is-connected .connection-line { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
