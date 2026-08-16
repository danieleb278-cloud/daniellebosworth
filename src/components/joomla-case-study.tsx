import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import type { CaseStudy } from "@/lib/case-studies";
import joomlaHeroPoster from "@/assets/joomla/joomla_hero_poster.jpg.asset.json";

const HERO_VIDEO_SRC = "/joomla%20hero.mp4";

function JoomlaHeroMedia() {
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
      <div className="relative w-full overflow-hidden bg-background" style={{ aspectRatio: "16/9" }}>
        {reducedMotion ? (
          <img
            src={joomlaHeroPoster.url}
            alt="Joomla Extension Directory redesign walkthrough"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={HERO_VIDEO_SRC}
            poster={joomlaHeroPoster.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Joomla Extension Directory redesign walkthrough"
          />
        )}
      </div>
      <figcaption className="eyebrow mt-4 flex items-center justify-between">
        <span>Fig. 01 · Fragmented, inconsistent data made it harder for JED users to search, discover, and evaluate extensions.</span>
        <span aria-hidden>✦</span>
      </figcaption>
    </figure>
  );
}

const insightCards = [
  {
    label: "Findability",
    title: "Relevant extensions were difficult to surface.",
    body: "Users could search a large directory, but relevance, terminology, and filtering made the right option harder to identify.",
  },
  {
    label: "Evaluation",
    title: "The information needed to decide was scattered.",
    body: "Compatibility and key differences were not always visible at the moment users needed to compare alternatives.",
  },
  {
    label: "Confidence",
    title: "A result was not the same as a confident decision.",
    body: "About 65% of survey respondents reported choosing an extension that ultimately failed to meet their needs after significant effort.",
  },
];

const solutionGroups = [
  {
    number: "01",
    title: "Build a stronger information foundation",
    body: "Standardized metadata and a guided submission wizard give search, filtering, and comparison more consistent information to work with.",
  },
  {
    number: "02",
    title: "Make discovery more relevant",
    body: "Intent-aware ranking, clearer filters, and transparent match explanations help users understand why an extension appears.",
  },
  {
    number: "03",
    title: "Support confident evaluation",
    body: "Comparable cards, compatibility details, maintenance signals, and side-by-side comparison reduce guesswork before selection.",
  },
];

export function JoomlaCaseStudy({ study }: { study: CaseStudy }) {

  const problemImage = {
    src: "/joomla/diagram-comparing-problem.png",
    alt: "Diagram of the current confusing extension comparison experience",
    ratio: "16/9",
    fit: "contain" as const,
  };
  const researchImage = {
    src: "/joomla/customer-journey-map.png",
    alt: "Customer journey map across search, evaluation, and selection",
    ratio: "16/9",
    fit: "contain" as const,
  };

  return (
    <>
      {/* Hero visual */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="overflow-hidden bg-secondary p-3 md:p-5">
              <JoomlaHeroMedia />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 30 second read */}
      <section id="overview" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="01 / 05" label="Overview" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The project in 30 seconds</p>
          <div className="mt-12" />
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            <Summary label="The problem" text="Users could access thousands of extensions, but finding, comparing, and confidently selecting the right one required too much effort." />
            <Summary label="What I did" text="I researched the discovery journey, evaluated search and information architecture, and connected those findings to a practical redesign strategy." />
            <Summary label="The direction" text="Treat the directory as a decision-support experience built around intent, structured metadata, and comparison — not just a list of extensions." />
          </div>
          {study.snapshot && (
            <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
              <Meta label="Role" value="UX Researcher & Information Architect" />
              <Meta label="Duration" value="12 weeks" />
              <Meta label="Methods" value="Interviews, surveys, heuristic evaluation, competitive analysis" />
              <Meta label="Tools" value="Figma, Miro, Google Forms, Cacoo" />
            </div>
          )}
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="02 / 05" label="Discover" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The challenge</p>
          <div className="mt-14 grid grid-cols-12 gap-8">
            <Reveal className="col-span-12 lg:col-span-8">
              <h2 className="font-display text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.98] tracking-[-0.035em]">
                Finding extensions wasn&apos;t the problem. Finding the <span className="text-accent">right one</span> was.
              </h2>
            </Reveal>
            <div className="col-span-12 lg:col-span-4 lg:pt-3">
              <p className="text-lg leading-relaxed text-muted-foreground">{study.challenge}</p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{study.context}</p>
            </div>
          </div>
          {problemImage && (
            <div className="mt-16">
              <PlaceholderImage src={problemImage.src} alt={problemImage.alt} caption="Fig. 02 · The current compare-by-memory loop users fall into" ratio={problemImage.ratio ?? "16/9"} fit={problemImage.fit ?? "cover"} priority />
            </div>
          )}
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-baseline gap-5">
            <span className="font-mono text-xs text-muted-foreground">Research findings</span>
            <span className="eyebrow text-accent">What discovery revealed</span>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {insightCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 80}>
                <article className="h-full">
                  <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")} · {card.label}</span>
                  <h3 className="mt-7 font-display text-2xl leading-tight tracking-tight md:text-3xl">{card.title}</h3>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{card.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {researchImage && (
            <div className="mt-14">
              <PlaceholderImage src={researchImage.src} alt={researchImage.alt} caption="Fig. 03 · Journey across search, evaluation, and selection" ratio={researchImage.ratio ?? "16/9"} fit={researchImage.fit ?? "cover"} priority />
            </div>
          )}
        </div>
      </section>

      {/* Connecting the dots */}
      <section id="reasoning" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="03 / 05" label="Define" tone="dark" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-background/60">Connecting the dots</p>
          <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="space-y-4 font-display text-2xl text-background/70 md:text-3xl">
              <p>Different search language</p>
              <p>Inconsistent metadata</p>
              <p>Scattered compatibility details</p>
            </div>
            <div className="hidden h-48 w-px bg-background/20 lg:block" />
            <Reveal>
              <p className="font-display text-[clamp(2.4rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.035em]">
                Search wasn&apos;t the real problem. The gap sat between <span className="text-accent">user intent</span> and how information was structured.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-4 border-t border-background/20 pt-10 sm:grid-cols-3">
            {["Intent-aware discovery", "Structured metadata", "Decision support"].map((item) => (
              <div key={item} className="border-l border-accent pl-4 font-display text-xl">{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Design */}

      <section id="solution" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="04 / 05" label="Design" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The solution direction</p>
          <div className="mt-10 max-w-4xl">
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">A directory that helps people <span className="text-accent">decide, not just browse.</span></h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">The recommendations work as a system: improve the information entering the directory, use that structure to sharpen discovery, and make alternatives easier to evaluate before users commit time to implementation.</p>
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
          <Reveal>
            <SolutionCarousel />
          </Reveal>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="05 / 05" label="Next" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Expected impact & next validation</p>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">Designed to improve</h2>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["Discoverability", "Search clarity", "Compatibility awareness", "Decision confidence"].map((item) => (
                  <div key={item} className="border-t border-border pt-4 font-display text-lg md:text-xl">{item}</div>
                ))}
              </div>
            </div>
            <div className="border-l border-border pl-0 lg:pl-10">
              <span className="eyebrow text-accent">What I&apos;d validate next</span>
              <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">Test whether users find suitable extensions faster, understand why results match, compare alternatives with less recall effort, and avoid unsuitable selections earlier.</p>
              <p className="mt-6 text-muted-foreground">Because this was a design recommendation project rather than a launched product, these are intended outcomes—not manufactured performance metrics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reflection + capabilities */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="eyebrow text-accent">Reflection</span>
              <p className="mt-7 font-display text-3xl leading-snug tracking-tight md:text-5xl">{study.reflections}</p>
            </div>
            <div className="lg:col-span-4">
              <span className="eyebrow text-accent">This project demonstrates</span>
              <div className="mt-7 flex flex-wrap gap-2">
                {["Systems Thinking", "Research Synthesis", "Information Architecture", "Search Strategy", "UX Research", "Designing Within Constraints"].map((skill) => (
                  <span key={skill} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SolutionCarousel() {
  const slides = [
    {
      src: "/joomla/search-results-redesign.png",
      alt: "Redesigned search results page with structured filters and comparable cards",
      caption: "Fig. 04 · Search results with structured filters, comparable cards, and clearer metadata",
    },
    {
      src: "/joomla/comparison-detail.png",
      alt: "Side-by-side extension comparison view",
      caption: "Fig. 05 · Side-by-side comparison so alternatives are evaluated without recall effort",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <div className="mt-14">
      <div className="mx-auto max-w-5xl">
        {slides.map((slide, index) => (
          <div key={slide.src} className={index === active ? "block" : "hidden"} aria-hidden={index !== active}>
            <PlaceholderImage src={slide.src} alt={slide.alt} caption={slide.caption} ratio="16/9" fit="contain" priority />
          </div>
        ))}
      </div>
      <div className="mx-auto mt-6 flex max-w-5xl items-center justify-between border-t border-border pt-5">
        <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
          Solution visual {String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActive((active - 1 + slides.length) % slides.length)}
            className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
            aria-label="Show previous solution visual"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setActive((active + 1) % slides.length)}
            className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
            aria-label="Show next solution visual"
          >
            Next
          </button>
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
  return (
    <div className="flex items-baseline gap-5">
      <span className={`font-mono text-xs ${tone === "dark" ? "text-background/60" : "text-muted-foreground"}`}>{number}</span>
      <span className="eyebrow text-accent">{label}</span>
    </div>
  );
}
function ReasonCell({ label, text, accent = false }: { label: string; text: string; accent?: boolean }) {
  return <div><span className={`eyebrow ${accent ? "text-accent" : "text-muted-foreground"}`}>{label}</span><p className="mt-4 font-display text-xl leading-snug md:text-2xl">{text}</p></div>;
}
