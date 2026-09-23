type ConnectionHeroProps = {
  portraitUrl: string;
  resumeUrl: string;
};

export function ConnectionHero({ portraitUrl, resumeUrl }: ConnectionHeroProps) {
  return (
    <section className="constraint-hero overflow-hidden bg-charcoal px-6 pb-10 pt-28 text-background md:px-12 md:pb-12 md:pt-36">
      <div className="constraint-frame relative mx-auto grid min-h-[44rem] max-w-[1400px] grid-cols-1 border border-background/20 md:min-h-[42rem] md:grid-cols-12">
        <div aria-hidden className="constraint-corner constraint-corner-tl" />
        <div aria-hidden className="constraint-corner constraint-corner-tr" />
        <div aria-hidden className="constraint-corner constraint-corner-bl" />
        <div aria-hidden className="constraint-corner constraint-corner-br" />

        <div className="constraint-copy relative z-10 flex flex-col border-b border-background/20 p-5 sm:p-8 md:col-span-8 md:border-b-0 md:border-r md:p-10 lg:p-12">
          <h1 className="constraint-headline font-display text-[clamp(4rem,14vw,7rem)] leading-[0.82] text-background md:text-[clamp(5rem,8.6vw,8.3rem)]">
            <span className="block">I like a good</span>
            <span className="block italic text-teal">challenge.</span>
          </h1>

          <div className="constraint-thesis mt-auto grid gap-6 border-t border-background/20 pt-6 md:grid-cols-2 md:gap-10 md:pt-8">
            <p className="font-display text-2xl leading-tight text-background sm:text-3xl md:text-4xl">
              The constraints are the design.
            </p>
            <p className="max-w-[34rem] text-sm leading-relaxed text-background/72 sm:text-base">
              Give me the needs, the limitations, the competing priorities, and the goal. That's where I get creative.
            </p>
          </div>
        </div>

        <div className="constraint-portrait relative min-h-[26rem] overflow-hidden md:col-span-4 md:min-h-0">
          <img
            src={portraitUrl}
            alt="Danielle Bosworth"
            className="constraint-portrait-image absolute inset-0 h-full w-full object-cover object-top grayscale"
          />
          <div aria-hidden className="constraint-portrait-rule absolute inset-x-0 top-[38%] h-px bg-teal" />
          <div aria-hidden className="constraint-portrait-rule absolute inset-y-0 left-[28%] w-px bg-background/20" />
        </div>

        <div className="constraint-actions relative z-20 flex flex-col border-t border-background/20 sm:flex-row md:col-span-12">
          <a
            href="#work"
            className="arrow-slide inline-flex min-h-16 flex-1 items-center justify-between bg-teal px-6 font-mono text-xs uppercase tracking-[0.16em] text-charcoal transition-colors hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal md:px-10"
          >
            Explore selected work <span aria-hidden className="arrow text-lg">→</span>
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-16 flex-1 items-center justify-between border-t border-background/20 px-6 font-mono text-xs uppercase tracking-[0.16em] text-background transition-colors hover:text-teal sm:border-l sm:border-t-0 md:px-10"
          >
            View résumé <span aria-hidden className="text-base">↗</span>
          </a>
        </div>
      </div>

      <style>{`
        .constraint-frame {
          isolation: isolate;
          animation: constraint-frame-settle 900ms cubic-bezier(.2,.78,.22,1) both;
        }

        .constraint-copy {
          animation: constraint-copy-settle 950ms cubic-bezier(.2,.78,.22,1) 80ms both;
        }

        .constraint-headline {
          max-width: 8.5ch;
          text-wrap: balance;
        }

        .constraint-portrait-image {
          opacity: .78;
          transform: scale(1.08) translateX(2%);
          filter: contrast(1.04);
          animation: constraint-portrait-settle 1100ms cubic-bezier(.2,.78,.22,1) 100ms both;
        }

        .constraint-portrait::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, var(--charcoal), transparent 30%);
          opacity: .42;
          pointer-events: none;
        }

        .constraint-portrait-rule {
          z-index: 2;
          opacity: .6;
          animation: constraint-rule-reveal 900ms ease-out 500ms both;
        }

        .constraint-actions {
          animation: constraint-actions-settle 700ms ease-out 420ms both;
        }

        .constraint-corner {
          position: absolute;
          z-index: 30;
          width: .75rem;
          height: .75rem;
          pointer-events: none;
        }
        .constraint-corner::before,
        .constraint-corner::after {
          content: "";
          position: absolute;
          background: var(--teal);
        }
        .constraint-corner::before { width: 100%; height: 1px; }
        .constraint-corner::after { width: 1px; height: 100%; }
        .constraint-corner-tl { left: -.4rem; top: -.4rem; }
        .constraint-corner-tr { right: -.4rem; top: -.4rem; transform: rotate(90deg); }
        .constraint-corner-bl { left: -.4rem; bottom: -.4rem; transform: rotate(-90deg); }
        .constraint-corner-br { right: -.4rem; bottom: -.4rem; transform: rotate(180deg); }

        @keyframes constraint-frame-settle {
          from { opacity: 0; transform: scale(.985); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes constraint-copy-settle {
          from { opacity: 0; transform: translate3d(1rem, .75rem, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        @keyframes constraint-portrait-settle {
          from { opacity: .35; transform: scale(1.16) translateX(5%); }
          to { opacity: .78; transform: scale(1.08) translateX(2%); }
        }
        @keyframes constraint-rule-reveal {
          from { opacity: 0; transform: scale(0); }
          to { opacity: .6; transform: scale(1); }
        }
        @keyframes constraint-actions-settle {
          from { opacity: 0; transform: translateY(.5rem); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (min-width: 768px) {
          .constraint-frame {
            grid-template-rows: minmax(0, 1fr) auto;
          }
          .constraint-thesis {
            align-items: end;
          }
        }

        @media (max-width: 767px) {
          .constraint-hero { padding-top: 7rem; }
          .constraint-frame { min-height: auto; }
          .constraint-copy { min-height: 34rem; }
          .constraint-headline { max-width: 7ch; }
          .constraint-portrait {
            min-height: 24rem;
            border-bottom: 0;
          }
          .constraint-portrait-image {
            object-position: 50% 12%;
            transform: scale(1.04);
          }
          .constraint-thesis p:last-child { max-width: 27rem; }
        }

        @media (max-width: 420px) {
          .constraint-copy { min-height: 32rem; padding: 1.25rem; }
          .constraint-headline { font-size: clamp(3.6rem, 18vw, 4.8rem); }
        }

        @media (prefers-reduced-motion: reduce) {
          .constraint-frame,
          .constraint-copy,
          .constraint-portrait-image,
          .constraint-portrait-rule,
          .constraint-actions {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}