import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { VocariOpening } from "@/components/vocari-opening";
import type { CaseStudy } from "@/lib/case-studies";

const challengeCards = [
  {
    label: "Start with speed",
    title: "I needed something people could react to.",
    summary: "I chose Lovable deliberately so I could turn the idea into a working experience quickly, test assumptions, and learn from interaction instead of polishing a concept in isolation.",
    detail: "The first architecture was built for discovery. That was the right tradeoff early on because the prototype gave me evidence I could not get from static screens. It also meant I would eventually need to revisit decisions made while the product itself was still changing.",
  },
  {
    label: "The prototype created better questions",
    title: "A recommendation could make sense and still feel wrong.",
    summary: "Users did not simply accept or reject results. They questioned the evidence, added context, contradicted earlier answers, and sometimes changed how they described themselves.",
    detail: "That exposed a deeper product problem. If a user rejects Product Designer, should the system only hide that card? Or does the reaction reveal something about work style, motivation, environment, or another signal that should affect other recommendations too?",
  },
  {
    label: "The product outgrew the prototype",
    title: "Features that looked separate were actually sharing the same beliefs.",
    summary: "Profile DNA, recommendations, discovery sessions, career exploration, and feedback all depended on what Vocari believed about the user. Inconsistency in one place could ripple through the rest of the experience.",
    detail: "The interface was no longer the hardest part. I needed a clearer source of truth, rules for evidence and inference, and a way to keep changes consistent across features without making the system feel rigid.",
  },
  {
    label: "Stop adding. Start understanding.",
    title: "I paused feature growth and reconstructed the system underneath it.",
    summary: "I defined what counts as evidence, where it came from, how confidence should work, what happens when evidence changes, and which decisions needed deterministic behavior instead of AI interpretation.",
    detail: "That work became the foundation for source-aware evidence, typed profile models, recommendation rules, refinement metadata, reversal-safe behavior, and a Progressive Discovery Engine that can admit when it does not know enough yet.",
  },
];

const decisions = [
  {
    title: "Treat Profile DNA as a hypothesis, not a verdict",
    text: "The profile can evolve as new evidence appears. Missing information is not scored as a negative. Unsupported dimensions are excluded and lower confidence instead.",
  },
  {
    title: "Make disagreement useful",
    text: "Understand, Clarify, and Challenge interactions let the user inspect an interpretation, add context, or push back. Feedback can become structured evidence instead of a one-time UI reaction.",
  },
  {
    title: "Preserve the reasoning trail",
    text: "Discovery signals keep source information and history. Refinements can be reversed without pretending the earlier interaction never happened.",
  },
  {
    title: "Let the system say 'not enough yet'",
    text: "Recommendations deepen only as evidence grows. Vocari can begin with broad directions and move toward specific roles when the profile has enough support.",
  },
  {
    title: "Use AI where ambiguity helps",
    text: "Conversation and interpretation benefit from flexible language. Scoring, profile state, evidence handling, and other consistency-critical behavior use explicit logic and deterministic fallbacks.",
  },
];

const slides = [
  { src: "/vocari/dashboard.webp", alt: "Vocari dashboard with confidence, patterns, and career recommendations", caption: "Dashboard connects profile evidence, patterns, exploration, and next actions." },
  { src: "/vocari/profile-refinement.webp", alt: "Before and after preview of a proposed Profile DNA refinement", caption: "Profile refinement previews a proposed change before the user confirms it." },
  { src: "/vocari/why-this-fits.webp", alt: "Vocari recommendation explanation with supporting evidence and tradeoff", caption: "Why this fits connects a recommendation to supporting evidence and a realistic consideration." },
  { src: "/vocari/careers.webp", alt: "Vocari public career library with filters and career cards", caption: "The career library supports exploration beyond the recommendation feed." },
];

export function VocariCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <>
      <VocariOpening />

      <section id="challenge" className="px-6 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-3xl">
            <span className="eyebrow text-accent">What building exposed</span>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.02] tracking-[-0.035em]">
              Every answer created a harder question.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The first prototype helped me discover the product. Then the product became complex enough that I had to understand the system underneath it.
            </p>
          </div>

          <div className="mt-14 border-t border-border">
            {challengeCards.map((card, index) => (
              <ChallengeCard key={card.label} card={card} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="research" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <span className="eyebrow text-accent">Evidence changed the direction</span>
              <h2 className="mt-6 font-display text-4xl leading-tight tracking-tight md:text-6xl">
                The problem was not getting people through an assessment.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>{study.context}</p>
              <p>
                Research kept pointing toward trust and recognition. People wanted to understand why something appeared, especially when a result surprised them. Completion alone did not mean the system had earned confidence.
              </p>
              <p>
                Eight participants took part in the affective-computing study. Facial analytics were usable for three participants, so I treated those signals as exploratory research rather than evidence of emotional accuracy or a personalization input.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <CaseFigure src="/vocari/early-empty-state.webp" alt="Early Career Compass dashboard empty state" caption="Early assessment-style prototype before Progressive Discovery." />
            <CaseFigure src="/vocari/morphcast.webp" alt="Vocari research analytics showing consented MorphCast data" caption="Consent-aware research instrumentation connected exploratory emotional signals to prototype screens." />
          </div>
        </div>
      </section>

      <section id="decisions" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-4xl">
            <span className="eyebrow text-accent">Product decisions</span>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,5.5vw,5.8rem)] leading-[1] tracking-[-0.035em]">
              I stopped designing features as isolated screens.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Once the same evidence was influencing multiple parts of Vocari, each interaction needed rules about what it could change and why.
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-border md:grid-cols-2">
            {decisions.map((decision, index) => (
              <Reveal key={decision.title} delay={index * 60}>
                <article className="h-full bg-background p-7 md:p-9">
                  <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-5 font-display text-2xl leading-tight md:text-3xl">{decision.title}</h3>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{decision.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <CaseFigure src="/vocari/discovery-journey.webp" alt="Vocari progressive discovery service journey" caption="Progressive Discovery turns continued interaction into a learning loop." />
            <CaseFigure src="/vocari/product-book.webp" alt="Vocari Product Book North Star and decision filter" caption="The Product Book aligned experience language, evidence rules, data, and future behavior." />
          </div>
        </div>
      </section>

      <section id="architecture" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <span className="eyebrow text-accent">Under the interface</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">
                Speed discovered the product. Structure made it sustainable.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-background/70">
              <p>
                I began working directly with the codebase when product decisions could no longer be expressed as interface changes alone. I used typed models, evidence metadata, Supabase migrations, deterministic identifiers, structured reaction scoring, and reversal-safe synchronization to make the behavior more explicit.
              </p>
              <p>
                The recommendation system also needed to distinguish a missing signal from a negative one. Evidence retains its source, unsupported dimensions reduce confidence, and role recommendations have eligibility rules rather than appearing simply because the system can generate an answer.
              </p>
              <p className="text-background">
                This was the point where my role shifted from asking, "What should this screen do?" to asking, "What must the whole system believe for this screen to behave correctly?"
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Typed user model", "A shared structure for profile state and evidence."],
              ["Source-aware evidence", "Signals retain where they came from and what they support."],
              ["Reversal-safe updates", "Changing a decision does not erase the reasoning history."],
              ["Deterministic behavior", "Critical rules stay testable instead of depending entirely on AI."],
            ].map(([title, text]) => (
              <div key={title} className="border border-background/20 p-6">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-background/60">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <span className="eyebrow text-accent">The experience</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-6xl">The interface became the visible layer of the system.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Profile DNA, career recommendations, explanations, discovery, and refinement are designed to show the user what Vocari currently understands while leaving room for that understanding to change.
            </p>
          </div>
          <DesignCarousel />
        </div>
      </section>

      <section id="delivery" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <span className="eyebrow text-accent">A constraint became a workflow decision</span>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                When one development path hit limits, I built another.
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                During high-intensity prototyping, platform resource limits began interrupting iteration. I moved relevant codebase context into ChatGPT to reason through targeted changes, worked through GitHub version control, and used automated deployment workflows to keep the prototype available for continued testing.
              </p>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                That workflow reduced dependency on a single prototyping tool and gave me a better understanding of the architecture I was making product decisions on top of.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {["Lovable", "GitHub", "ChatGPT", "Supabase", "Vercel", "TypeScript", "Testing"].map((tool) => (
                  <span key={tool} className="border border-border bg-background px-4 py-2 font-mono text-xs uppercase tracking-wider">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="reflection" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-24">
            <div>
              <span className="eyebrow text-accent">What changed for me</span>
              <h2 className="mt-6 font-display text-[clamp(2.8rem,5.8vw,6rem)] leading-[1] tracking-[-0.035em]">
                Personalization is not the same as generating a personalized-looking answer.
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Vocari taught me that a system earns trust by being able to show what it knows, distinguish evidence from inference, respond when the user disagrees, and update without making the rest of the experience incoherent.
              </p>
            </div>
            <div className="space-y-8 lg:pt-10">
              <ReasonCell label="What exists now" text="A working research prototype with progressive profile evidence, career exploration, explainable recommendations, discovery sessions, persistence, and refinement behavior." />
              <ReasonCell label="What I would validate next" text="Longitudinal use, broader career coverage, recommendation calibration, accessibility, and whether profile refinements improve later recommendations in ways users recognize as more accurate." />
              <ReasonCell label="The bigger question" text="How do you design a product that can keep learning about a human without pretending the human is static?" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ChallengeCard({ card, index }: { card: (typeof challengeCards)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const notes = [
    "Start with speed.",
    "Users didn't just accept results.",
    "Features that looked separate were actually connected.",
    "So I stopped adding and started understanding.",
  ];
  const placeholderLabels = [
    "Early prototype",
    "Recommendation reaction",
    "Connected system",
    "Evidence model",
  ];

  return (
    <article className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group grid w-full gap-5 py-7 text-left md:grid-cols-[14rem_0.72fr_1.45fr_auto] md:items-center md:gap-10 md:py-9"
      >
        <div className="relative w-fit px-2 py-1">
          <span className="absolute left-1/2 top-0 h-3 w-12 -translate-x-1/2 -rotate-2 bg-muted opacity-80" aria-hidden="true" />
          <span className="block max-w-[12rem] rotate-[-1deg] border border-border/70 bg-secondary px-6 py-6 font-handwriting text-[1.7rem] leading-[1.02] shadow-[0_10px_24px_-18px_rgba(0,0,0,0.5)]">
            {notes[index]}
          </span>
        </div>
        <span className="eyebrow text-accent">{card.label}</span>
        <span className="font-display text-2xl leading-tight md:text-3xl">{card.title}</span>
        <span
          aria-hidden
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border font-mono text-xl text-muted-foreground transition-colors group-hover:border-accent"
        >
          {open ? "−" : "+"}
        </span>
      </button>

      {open && (
        <div className="grid gap-8 pb-12 md:grid-cols-[14rem_0.72fr_1.45fr_auto] md:gap-10">
          <div className="hidden md:block" />
          <div>
            <span className="eyebrow text-accent">What I noticed</span>
            <p className="mt-3 font-display text-xl leading-snug">{card.summary}</p>
          </div>
          <div>
            <span className="eyebrow text-accent">Why it mattered</span>
            <p className="mt-3 leading-relaxed text-muted-foreground">{card.detail}</p>
            <button
              type="button"
              className="mt-7 w-full border border-dashed border-border bg-secondary p-4 text-left transition-colors hover:border-accent"
              aria-label={`Placeholder evidence gallery for ${placeholderLabels[index]}`}
            >
              <span className="block aspect-[16/8] bg-background" aria-hidden="true" />
              <span className="mt-3 flex items-center justify-between gap-4">
                <span>
                  <span className="eyebrow text-accent">Evidence gallery placeholder</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{placeholderLabels[index]} · choose final images later</span>
                </span>
                <span className="font-mono text-lg text-muted-foreground">↗</span>
              </span>
            </button>
          </div>
          <div className="hidden md:block" />
        </div>
      )}
    </article>
  );
}

function DesignCarousel() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-14">
      <div className="mx-auto max-w-5xl">
        {slides.map((slide, index) => (
          <div key={slide.src} className={index === active ? "block" : "hidden"} aria-hidden={index !== active}>
            <CaseFigure src={slide.src} alt={slide.alt} caption={slide.caption} portrait={index === 0} />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <div className="flex gap-3">
          <button type="button" onClick={() => setActive((active - 1 + slides.length) % slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Previous</button>
          <button type="button" onClick={() => setActive((active + 1) % slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Next</button>
        </div>
      </div>
    </div>
  );
}

function CaseFigure({ src, alt, caption, portrait = false }: { src: string; alt: string; caption: string; portrait?: boolean }) {
  return (
    <figure className="w-full">
      <div className="flex w-full items-center justify-center border border-border bg-background p-4 md:p-6">
        <img src={src} alt={alt} className={portrait ? "block max-h-[760px] w-auto max-w-full" : "block h-auto w-full"} loading="lazy" />
      </div>
      <figcaption className="eyebrow mt-3 flex items-center justify-between border-t border-border pt-2">
        <span>{caption}</span><span aria-hidden>✦</span>
      </figcaption>
    </figure>
  );
}

function ReasonCell({ label, text }: { label: string; text: string }) {
  return <div><span className="eyebrow text-accent">{label}</span><p className="mt-4 font-display text-xl leading-snug md:text-2xl">{text}</p></div>;
}
