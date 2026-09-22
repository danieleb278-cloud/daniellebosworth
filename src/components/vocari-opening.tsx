import { useState } from "react";

export function VocariOpening() {
  const [thinkingOpen, setThinkingOpen] = useState(false);

  return (
    <section id="overview" aria-labelledby="vocari-idea-title" className="px-6 pb-24 md:px-12 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow">The idea was straightforward.</p>
        <h1 id="vocari-idea-title" className="mt-7 max-w-[1120px] text-balance font-display text-[clamp(2.75rem,5.8vw,6.25rem)] leading-[1.06] tracking-[-0.035em]">
          What if AI could help you discover what you're naturally good at?
        </h1>

        <div className="mt-12 grid items-start gap-12 lg:mt-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <div className="max-w-[52ch] space-y-6 text-lg leading-[1.75] text-muted-foreground">
              <p>We tend to enjoy doing things we're good at. But the abilities that come most naturally to us can be the easiest to overlook. When something has always felt easy, we may never recognize it as a strength at all.</p>
              <p className="text-foreground"><strong className="font-medium">Vocari began with the idea that conversational AI could uncover those overlooked patterns, then connect them to careers where those abilities could become an advantage.</strong></p>
            </div>

            <div className="mt-8 max-w-[52ch]">
              <a href="https://myvocari.lovable.app" target="_blank" rel="noreferrer" className="inline-block border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-background transition-colors hover:bg-accent hover:text-foreground">Explore the research prototype ↗</a>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Academic research prototype with a limited career catalog and early-stage personalization. The link demonstrates current capability, not the full product vision.</p>
            </div>



            <button
              type="button"
              onClick={() => setThinkingOpen((open) => !open)}
              aria-expanded={thinkingOpen}
              className="flex min-h-12 w-fit cursor-pointer list-none items-center gap-3 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span aria-hidden="true" className="w-3 font-mono text-base">{thinkingOpen ? "−" : "+"}</span>
              <span>The thinking behind the idea</span>
            </button>
          </div>

          <figure className="min-w-0 lg:pt-1">
            {/* Present the desktop region of the supplied image without changing the product UI. */}
            <div className="relative aspect-[693/352] overflow-hidden">
              <img
                src="/vocari/early-onboarding.png"
                alt="Early Vocari onboarding: Let's get to know you — for now. A guided conversation begins with About you."
                width={1046}
                height={570}
                className="absolute h-auto max-w-none"
                style={{ width: "150.938%", left: "-47.33%", top: "-32.1023%" }}
              />
            </div>
            <figcaption className="mt-5 max-w-[48ch] text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">Early Vocari onboarding</span>
              <span className="mt-1 block">The first version began by gathering a starting picture through guided conversation.</span>
            </figcaption>
          </figure>
        </div>

        <div className="pt-28 md:pt-44 lg:pt-52">
          <p className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.12] tracking-[-0.03em]">
            <span className="block">The concept was simple.</span>
            <span className="block">Building it was not.</span>
          </p>
          <span aria-hidden="true" className="mt-10 block font-mono text-2xl text-muted-foreground">↓</span>
        </div>
      </div>
    </section>
  );
}
