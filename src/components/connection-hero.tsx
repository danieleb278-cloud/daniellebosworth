import { useEffect, useState, type CSSProperties } from "react";

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
              <path d="M 16 24 Q 31 26 43 31" pathLength="1" className="connection-line signal-line signal-line-1" />
              <path d="M 72 18 Q 64 24 57 39" pathLength="1" className="connection-line signal-line signal-line-2" />
              <path d="M 15 54 Q 29 51 43 47" pathLength="1" className="connection-line signal-line signal-line-3" />
              <path d="M 78 50 Q 66 53 57 55" pathLength="1" className="connection-line signal-line signal-line-4" />
              <path d="M 28 79 Q 36 69 43 63" pathLength="1" className="connection-line signal-line signal-line-5" />
              <path d="M 73 76 Q 64 70 57 71" pathLength="1" className="connection-line signal-line signal-line-6" />
              <path d="M 50 22 L 50 73" pathLength="1" className="connection-line connection-spine" />
              <path d="M 50 73 L 24 87 M 50 73 L 50 87 M 50 73 L 76 87" pathLength="1" className="connection-line outcome-line" />
            </svg>

            <div className="portrait-signal absolute right-5 top-16 z-0 w-[5.75rem] border border-teal/60 bg-charcoal p-1.5 opacity-45 sm:right-7 sm:w-[7rem]">
              <img src={portraitUrl} alt="" className="aspect-[4/5] w-full object-cover object-top grayscale" />
            </div>

            {signals.map((signal, index) => (
              <div
                key={signal.label}
                className={`connection-node absolute z-10 ${signal.initial} ${showConnected ? signal.connected : ""}`}
                style={{ "--signal-index": index } as CSSProperties}
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
          position: absolute;
          z-index: 10;
          white-space: nowrap;
          line-height: 1;
          color: var(--background);
          transition:
            left 880ms cubic-bezier(.2,.78,.22,1),
            top 880ms cubic-bezier(.2,.78,.22,1),
            transform 880ms cubic-bezier(.2,.78,.22,1),
            opacity 520ms ease,
            font-size 880ms cubic-bezier(.2,.78,.22,1),
            letter-spacing 880ms cubic-bezier(.2,.78,.22,1),
            color 520ms ease,
            border-color 520ms ease;
          transition-delay: calc(var(--signal-index) * 38ms);
        }
        .connection-node > span { font-family: var(--font-mono); font-size: .58em; opacity: .75; }

        /* Disconnected signals: varied voices, scale and strength. */
        .signal-a { left: 7%; top: 18%; font-family: var(--font-display); font-size: clamp(1.45rem, 3vw, 2.15rem); font-style: italic; opacity: .96; }
        .signal-b { left: 54%; top: 13%; font-family: var(--font-mono); font-size: clamp(.8rem, 1.5vw, 1rem); letter-spacing: .18em; text-transform: uppercase; opacity: .58; }
        .signal-c { left: 5%; top: 50%; font-family: var(--font-sans); font-size: clamp(1rem, 2vw, 1.35rem); font-weight: 500; letter-spacing: .02em; opacity: .72; }
        .signal-d { left: 62%; top: 45%; font-family: var(--font-display); font-size: clamp(1.25rem, 2.4vw, 1.75rem); opacity: .9; }
        .signal-e { left: 14%; top: 75%; font-family: var(--font-mono); font-size: clamp(.75rem, 1.4vw, .95rem); letter-spacing: .13em; text-transform: uppercase; opacity: .52; }
        .signal-f { left: 53%; top: 72%; font-family: var(--font-display); font-size: clamp(1.15rem, 2.3vw, 1.65rem); font-style: italic; opacity: .78; }

        /* Connected signals: one clear, uniform vertical system. */
        .signal-a-connected { left: 50%; top: 27%; }
        .signal-b-connected { left: 50%; top: 34.5%; }
        .signal-c-connected { left: 50%; top: 42%; }
        .signal-d-connected { left: 50%; top: 49.5%; }
        .signal-e-connected { left: 50%; top: 57%; }
        .signal-f-connected { left: 50%; top: 64.5%; }
        .is-connected .connection-node {
          transform: translateX(-50%);
          width: min(58%, 17rem);
          border-bottom: 1px solid color-mix(in oklab, var(--teal) 48%, transparent);
          padding: 0 0 .38rem;
          font-family: var(--font-mono);
          font-size: clamp(.72rem, 1.3vw, .88rem);
          font-style: normal;
          font-weight: 400;
          letter-spacing: .13em;
          text-transform: uppercase;
          text-align: left;
          opacity: 1;
          color: var(--background);
        }

        .connection-line {
          fill: none;
          stroke: color-mix(in oklab, var(--teal) 88%, transparent);
          stroke-width: 1.15;
          vector-effect: non-scaling-stroke;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          opacity: 0;
          transition: stroke-dashoffset 720ms cubic-bezier(.22,.61,.36,1), opacity 240ms ease;
        }
        .signal-line-2 { transition-delay: 55ms; }
        .signal-line-3 { transition-delay: 110ms; }
        .signal-line-4 { transition-delay: 165ms; }
        .signal-line-5 { transition-delay: 220ms; }
        .signal-line-6 { transition-delay: 275ms; }
        .connection-spine { stroke-width: 1.4; transition-delay: 300ms; }
        .outcome-line { stroke-width: .85; transition-delay: 510ms; }
        .is-connected .connection-line { stroke-dashoffset: 0; opacity: .62; }
        .is-connected .connection-spine { opacity: .9; }
        .is-connected .outcome-line { opacity: .52; }

        .clarity-label, .outcomes {
          opacity: 0;
          pointer-events: none;
        }
        .clarity-label {
          top: 14% !important;
          transform: translate(-50%, -50%) translateY(-10px);
          transition: opacity 360ms ease 580ms, transform 520ms cubic-bezier(.22,.61,.36,1) 580ms;
        }
        .is-connected .clarity-label {
          opacity: 1;
          transform: translate(-50%, -50%) translateY(0);
        }
        .outcomes {
          bottom: 5.5rem !important;
          transition: opacity 440ms ease 700ms, transform 520ms cubic-bezier(.22,.61,.36,1) 700ms;
          transform: translateY(10px);
        }
        .is-connected .outcomes { opacity: 1; transform: translateY(0); }
        .outcomes > div {
          padding-top: .7rem;
          font-size: clamp(.72rem, 1.35vw, .92rem) !important;
          letter-spacing: .12em !important;
        }
        .portrait-signal { transition: opacity 500ms ease, transform 800ms ease; }
        .is-connected .portrait-signal { opacity: .08; transform: scale(.96); }

        @media (max-width: 639px) {
          .connection-field { height: 32rem; }
          .signal-a { left: 5%; font-size: 1.45rem; }
          .signal-b { left: 48%; top: 15%; font-size: .7rem; }
          .signal-c { left: 5%; font-size: 1rem; }
          .signal-d { left: 54%; font-size: 1.2rem; }
          .signal-e { left: 12%; font-size: .65rem; }
          .signal-f { left: 46%; font-size: 1.05rem; }
          .is-connected .connection-node { width: 68%; font-size: .68rem; }
          .outcomes { inset-inline: 1rem !important; bottom: 4.6rem !important; }
          .outcomes > div { font-size: .62rem !important; }
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
