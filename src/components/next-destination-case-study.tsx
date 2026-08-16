import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import type { CaseStudy } from "@/lib/case-studies";
import ndScreens from "@/assets/nd/screens.png.asset.json";
import ndJourney from "@/assets/nd/journey.png.asset.json";
import ndCompetitive from "@/assets/nd/competitive.png.asset.json";
import ndFullProto from "@/assets/nd/fullproto.png.asset.json";
import ndPersonalization from "@/assets/nd/personalization.png.asset.json";
import ndItinerary from "@/assets/nd/itinerary.png.asset.json";
import ndBudget from "@/assets/nd/budget.png.asset.json";

const LOVABLE_ASSET_ORIGIN = "https://daniellebosworth.lovable.app";
const assetUrl = (path: string) => path.startsWith("http") ? path : `${LOVABLE_ASSET_ORIGIN}${path}`;
const HERO_VIDEO_SRC = "/next%20desination%20video.mp4";

const insights = [
  {
    label: "Fragmentation",
    title: "Planning was spread across too many tools.",
    body: "Travelers moved between discovery, booking, notes, budgets, maps, and messaging just to assemble one trip.",
  },
  {
    label: "Coordination",
    title: "Group decisions created more friction than discovery.",
    body: "Preferences, approvals, and changes lived in separate conversations, making it difficult to keep a shared plan current.",
  },
  {
    label: "Confidence",
    title: "Budget and personalization shaped every choice.",
    body: "People needed recommendations that felt relevant without losing visibility into cost, timing, or control.",
  },
];

const solutionGroups = [
  {
    number: "01",
    title: "Personalize the starting point",
    body: "Onboarding captures interests, budget, travel style, and group needs so recommendations begin with useful context.",
  },
  {
    number: "02",
    title: "Coordinate one shared trip",
    body: "Collaborative itineraries bring decisions, updates, and group planning into one place instead of scattered threads.",
  },
  {
    number: "03",
    title: "Keep the plan realistic",
    body: "Budget visibility, local options, and itinerary structure help travelers move from inspiration to a plan they can actually use.",
  },
];

function NextDestinationHero() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <figure className="w-full">
      <div className="relative w-full overflow-hidden bg-secondary" style={{ aspectRatio: "16/9" }}>
        {reducedMotion ? (
          <img src={assetUrl(ndScreens.url)} alt="Next Destination mobile planning experience" className="absolute inset-0 h-full w-full object-contain" />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO_SRC}
            poster={assetUrl(ndScreens.url)}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Next Destination travel planning prototype walkthrough"
          />
        )}
      </div>
      <figcaption className="eyebrow mt-4 flex items-center justify-between">
        <span>Fig. 01 · Next Destination brings discovery, planning, budgets, and collaboration into one experience</span>
        <span aria-hidden>✦</span>
      </figcaption>
    </figure>
  );
}

export function NextDestinationCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <>
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal><NextDestinationHero /></Reveal>
        </div>
      </section>

      <section id="overview" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="01 / 05" label="Overview" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The project in 30 seconds</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            <Summary label="The problem" text="Trip planning required people to piece together destinations, budgets, group preferences, and itineraries across disconnected tools." />
            <Summary label="What I did" text="I combined survey research, interviews, affinity mapping, and competitive analysis to define the product opportunity and prioritize the experience." />
            <Summary label="The direction" text="Create one flexible planning space that personalizes discovery, supports group decisions, and keeps the practical details connected." />
          </div>
          <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Role" value="Product Strategy, UX Research & Experience Design" />
            <Meta label="Duration" value="Semester project" />
            <Meta label="Methods" value="Surveys, interviews, affinity mapping, competitive analysis" />
            <Meta label="Tools" value="Figma, Miro, Google Forms" />
          </div>
        </div>
      </section>

      <section id="discover" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="02 / 05" label="Discover" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The challenge</p>
          <div className="mt-14 grid grid-cols-12 gap-8">
            <Reveal className="col-span-12 lg:col-span-8">
              <h2 className="font-display text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.98] tracking-[-0.035em]">
                Planning a trip wasn&apos;t one task. It was a chain of <span className="text-accent">disconnected decisions.</span>
              </h2>
            </Reveal>
            <div className="col-span-12 lg:col-span-4 lg:pt-3">
              <p className="text-lg leading-relaxed text-muted-foreground">{study.challenge}</p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{study.context}</p>
            </div>
          </div>
          <div className="mt-16">
            <CaseFigure
              src={assetUrl(ndJourney.url)}
              alt="Journey map describing the fragmented travel planning process"
              caption="Fig. 02 · The planning journey exposed friction across discovery, evaluation, coordination, and booking"
            />
          </div>

          <div className="mt-24 flex items-baseline gap-5">
            <span className="font-mono text-xs text-muted-foreground">Research findings</span>
            <span className="eyebrow text-accent">What discovery revealed</span>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {insights.map((card, index) => (
              <Reveal key={card.label} delay={index * 80}>
                <article>
                  <span className="eyebrow text-accent">{String(index + 1).padStart(2, "0")} · {card.label}</span>
                  <h3 className="mt-7 font-display text-2xl leading-tight tracking-tight md:text-3xl">{card.title}</h3>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{card.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="define" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="03 / 05" label="Define" tone="dark" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-background/60">Connecting the dots</p>
          <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="space-y-4 font-display text-2xl text-background/70 md:text-3xl">
              <p>Too many planning tools</p>
              <p>Group decisions in scattered threads</p>
              <p>Budgets and preferences treated separately</p>
            </div>
            <div className="hidden h-48 w-px bg-background/20 lg:block" />
            <Reveal>
              <p className="font-display text-[clamp(2.4rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.035em]">
                The opportunity wasn&apos;t another destination finder. It was a <span className="text-accent">shared planning system</span> connecting decisions across the entire trip.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-4 border-t border-background/20 pt-10 sm:grid-cols-3">
            {["Personal control", "Shared coordination", "One connected plan"].map((item) => (
              <div key={item} className="border-l border-accent pl-4 font-display text-xl">{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="design" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="04 / 05" label="Design" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The solution direction</p>
          <div className="mt-10 max-w-4xl">
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
              One planning space, shaped around <span className="text-accent">the traveler.</span>
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              The concept connects personalization, collaboration, budget awareness, and itinerary planning so each decision improves the next instead of creating another tab to manage.
            </p>
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {solutionGroups.map((item) => (
              <article key={item.number} className="border-t border-border pt-5">
                <span className="font-mono text-xs text-accent">{item.number}</span>
                <h3 className="mt-4 font-display text-2xl leading-tight tracking-tight">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
          <Reveal><SolutionCarousel /></Reveal>
        </div>
      </section>

      <section id="next" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="05 / 05" label="Next" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Expected impact & next validation</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">Designed to improve</h2>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["Planning clarity", "Group coordination", "Budget awareness", "Decision confidence"].map((item) => (
                  <div key={item} className="border-t border-border pt-4 font-display text-lg md:text-xl">{item}</div>
                ))}
              </div>
            </div>
            <div className="border-l border-border pl-0 lg:pl-10">
              <span className="eyebrow text-accent">What I&apos;d validate next</span>
              <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
                Test whether travelers can build and adjust a shared plan with fewer tool changes, less coordination effort, and clearer budget tradeoffs.
              </p>
              <p className="mt-6 text-muted-foreground">Because this was a concept and prototype project, these are intended outcomes—not invented launch metrics.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="eyebrow text-accent">Reflection</span>
            <p className="mt-7 font-display text-3xl leading-snug tracking-tight md:text-5xl">{study.reflections}</p>
          </div>
          <div className="lg:col-span-4">
            <span className="eyebrow text-accent">This project demonstrates</span>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Product Strategy", "Research Synthesis", "Experience Design", "Feature Prioritization", "Systems Thinking"].map((skill) => (
                <span key={skill} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CaseFigure({ src, alt, caption, portrait = false }: { src: string; alt: string; caption: string; portrait?: boolean }) {
  return (
    <figure className="w-full">
      <div className="flex w-full items-center justify-center border border-border bg-secondary p-4 md:p-6">
        <img src={src} alt={alt} className={portrait ? "block max-h-[760px] w-auto max-w-full" : "block h-auto w-full"} loading="lazy" decoding="async" />
      </div>
      <figcaption className="eyebrow mt-3 flex items-center justify-between border-t border-border pt-2">
        <span>{caption}</span><span aria-hidden>✦</span>
      </figcaption>
    </figure>
  );
}

function SolutionCarousel() {
  const slides = [
    { src: assetUrl(ndFullProto.url), alt: "Full Next Destination prototype flow", caption: "Fig. 03 · The complete prototype connects onboarding, discovery, planning, and collaboration", portrait: false },
    { src: assetUrl(ndPersonalization.url), alt: "Personalized recommendation screens", caption: "Fig. 04 · Preferences and budget shape a more relevant starting point", portrait: true },
    { src: assetUrl(ndItinerary.url), alt: "Collaborative itinerary planning screens", caption: "Fig. 05 · A shared itinerary keeps group decisions and changes visible", portrait: true },
    { src: assetUrl(ndBudget.url), alt: "Travel budget planning screens", caption: "Fig. 06 · Budget tools keep inspiration grounded in practical tradeoffs", portrait: true },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="mt-14">
      <div className="mx-auto max-w-5xl">
        {slides.map((slide, index) => (
          <div key={slide.src} className={index === active ? "block" : "hidden"} aria-hidden={index !== active}>
            <CaseFigure {...slide} />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Solution visual {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setActive((active - 1 + slides.length) % slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent" aria-label="Show previous solution visual">Previous</button>
          <button type="button" onClick={() => setActive((active + 1) % slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent" aria-label="Show next solution visual">Next</button>
        </div>
      </div>
    </div>
  );
}

function Summary({ label, text }: { label: string; text: string }) {
  return <div><span className="eyebrow text-accent">{label}</span><p className="mt-5 font-display text-2xl leading-snug tracking-tight md:text-3xl">{text}</p></div>;
}
function Meta({ label, value }: { label: string; value: string }) {
  return <div className="min-h-32 border-border px-0 py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0"><span className="eyebrow text-muted-foreground">{label}</span><p className="mt-3 max-w-[24ch] text-sm leading-relaxed">{value}</p></div>;
}
function SectionLabel({ number, label, tone = "light" }: { number: string; label: string; tone?: "light" | "dark" }) {
  return <div className="flex items-baseline gap-5"><span className={`font-mono text-xs ${tone === "dark" ? "text-background/60" : "text-muted-foreground"}`}>{number}</span><span className="eyebrow text-accent">{label}</span></div>;
}
