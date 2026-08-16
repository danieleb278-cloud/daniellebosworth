import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import type { Block, CaseStudy, Section } from "@/lib/case-studies";
import joomlaHeroPoster from "@/assets/joomla/joomla_hero_poster.jpg.asset.json";
import joomlaSearchResults from "@/assets/joomla/search_results_redesign.png.asset.json";
import joomlaComparison from "@/assets/joomla/comparison_w_detail.png.asset.json";

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
      <div className="relative w-full overflow-hidden border border-border bg-secondary" style={{ aspectRatio: "16/9" }}>
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
      <figcaption className="eyebrow mt-3 flex items-center justify-between border-t border-border pt-2">
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

const reasoning = [
  {
    evidence: "Users struggled to find relevant extensions and search results were difficult to interpret.",
    insight: "Retrieval alone was not solving the discovery problem.",
    decision: "Make search more intent-aware with stronger relevance signals, filtering, and transparent result explanations.",
  },
  {
    evidence: "Compatibility and decision-critical information were scattered across the experience.",
    insight: "Users were being asked to remember and mentally compare information across extensions.",
    decision: "Standardize metadata and surface comparable information earlier in results and detail views.",
  },
  {
    evidence: "Users sometimes discovered an extension was unsuitable only after investing significant time.",
    insight: "The directory needed to support evaluation, not simply discovery.",
    decision: "Add side-by-side comparison and stronger trust, compatibility, and maintenance signals.",
  },
];

const solutionNames = [
  "Enhanced Search Relevance",
  "Intelligent Metadata Structure",
  "Extension Submission Wizard",
  "Comparison Tool",
  "Search Transparency",
  "Improved Filtering",
];

export function JoomlaCaseStudy({ study }: { study: CaseStudy }) {
  const sections = study.sections ?? [];
  const research = findSection(sections, "research");
  const problem = findSection(sections, "problem");
  const solution = findSection(sections, "solution");
  const ia = findSection(sections, "ia");
  const features = findSection(sections, "features");
  const outcomes = findSection(sections, "outcomes");
  const reflection = findSection(sections, "reflection");

  const problemImage = findFirstImage(problem);
  const researchImage = findFirstImage(research);

  return (
    <>
      {/* Hero visual */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <div className="overflow-hidden border border-border bg-secondary p-3 md:p-5">
              <JoomlaHeroMedia />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 30 second read */}
      <section id="overview" className="border-y border-border px-6 py-20 md:px-12 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-center justify-between">
            <span className="eyebrow text-accent">The project in 30 seconds</span>
            <span className="font-mono text-xs text-muted-foreground">01 / 07</span>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            <Summary label="The problem" text="Users could access thousands of extensions, but finding, comparing, and confidently selecting the right one required too much effort." />
            <Summary label="What I did" text="I researched the discovery journey, evaluated search and information architecture, and connected those findings to a practical redesign strategy." />
            <Summary label="The direction" text="Reframe the directory from a listing of extensions into a decision-support experience built around intent, structured metadata, and comparison." />
          </div>
          {study.snapshot && (
            <div className="mt-14 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
              <Meta label="Role" value={study.snapshot.myRole} />
              <Meta label="Duration" value={study.duration} />
              <Meta label="Methods" value={study.snapshot.methodsUsed} />
              <Meta label="Tools" value={study.snapshot.toolsUsed} />
            </div>
          )}
        </div>
      </section>

      {/* Challenge */}
      <section id="challenge" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="02 / 07" label="The challenge" />
          <div className="mt-12 grid grid-cols-12 gap-8">
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
              <PlaceholderImage src={problemImage.src} alt={problemImage.alt} caption={problemImage.caption} ratio={problemImage.ratio ?? "16/9"} fit={problemImage.fit ?? "cover"} />
            </div>
          )}
        </div>
      </section>

      {/* Insights */}
      <section id="insights" className="border-y border-border bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="03 / 07" label="What the research revealed" />
          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
            {insightCards.map((card, i) => (
              <Reveal key={card.label} delay={i * 80}>
                <article className="h-full bg-secondary p-8 md:p-10">
                  <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")} · {card.label}</span>
                  <h3 className="mt-7 font-display text-2xl leading-tight tracking-tight md:text-3xl">{card.title}</h3>
                  <p className="mt-5 leading-relaxed text-muted-foreground">{card.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
          {researchImage && (
            <div className="mt-14">
              <PlaceholderImage src={researchImage.src} alt={researchImage.alt} caption={researchImage.caption} ratio={researchImage.ratio ?? "16/9"} fit={researchImage.fit ?? "cover"} />
            </div>
          )}
          {research && <DeepDive title="Explore the research" section={research} />}
        </div>
      </section>

      {/* Connecting the dots */}
      <section id="reasoning" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between border-b border-background/20 pb-5">
            <span className="eyebrow opacity-70">04 / 07 · Connecting the dots</span>
            <span className="eyebrow text-accent">From symptoms to system</span>
          </div>
          <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="space-y-4 font-display text-2xl opacity-70 md:text-3xl">
              <p>Different search language</p>
              <p>Inconsistent metadata</p>
              <p>Scattered compatibility details</p>
            </div>
            <div className="hidden h-48 w-px bg-background/20 lg:block" />
            <Reveal>
              <p className="font-display text-[clamp(2.4rem,5vw,5.5rem)] leading-[1.02] tracking-[-0.035em]">
                The real problem wasn&apos;t simply search. It was the disconnect between <span className="text-accent">user intent</span> and how information was structured.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-4 border-t border-background/20 pt-8 sm:grid-cols-3">
            {["Intent-aware discovery", "Structured metadata", "Decision support"].map((item) => (
              <div key={item} className="border-l border-accent pl-4 font-display text-xl">{item}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence -> insight -> decision */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="05 / 07" label="From evidence to decision" />
          <div className="mt-14 divide-y divide-border border-y border-border">
            {reasoning.map((item, i) => (
              <Reveal key={item.evidence} delay={i * 70}>
                <div className="grid gap-7 py-10 md:grid-cols-3 md:gap-10">
                  <ReasonCell label="Evidence" text={item.evidence} />
                  <ReasonCell label="Insight" text={item.insight} />
                  <ReasonCell label="Decision" text={item.decision} accent />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section id="solution" className="border-y border-border px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="06 / 07" label="The solution direction" />
          <div className="mt-10 max-w-4xl">
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">From extension directory to <span className="text-accent">decision-support platform.</span></h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground">The recommendations work as a system: improve the information entering the directory, use that structure to improve discovery, then make alternatives easier to evaluate before users commit time to implementation.</p>
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solutionNames.map((name, i) => (
              <div key={name} className="border border-border p-6">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <h3 className="mt-5 font-display text-xl tracking-tight md:text-2xl">{name}</h3>
              </div>
            ))}
          </div>
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div className="mx-auto max-w-xl">
                <PlaceholderImage
                  src={joomlaSearchResults.url}
                  alt="Redesigned search results page with structured filters and comparable cards"
                  caption="Fig. 05 · Search results with structured filters, comparable cards, and clearer metadata"
                  ratio="3/5"
                  fit="cover-top"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="mx-auto max-w-xl">
                <PlaceholderImage
                  src={joomlaComparison.url}
                  alt="Side-by-side extension comparison view"
                  caption="Fig. 06 · Side-by-side comparison so alternatives are evaluated without recall effort"
                  ratio="4/3"
                  fit="cover-top"
                />
              </div>
            </Reveal>
          </div>
          {solution && <DeepDive title="See the underlying search + metadata model" section={solution} />}
          {ia && <DeepDive title="Explore the information architecture work" section={ia} />}
          {features && <DeepDive title="Explore all solution details" section={features} />}
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="07 / 07" label="Expected impact & next validation" />
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl tracking-tight md:text-5xl">Designed to improve</h2>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {["Discoverability", "Search clarity", "Compatibility awareness", "Decision confidence"].map((item) => (
                  <div key={item} className="border-t border-border py-5 font-display text-lg md:text-xl">{item}</div>
                ))}
              </div>
            </div>
            <div className="border-l border-border pl-0 lg:pl-10">
              <span className="eyebrow text-accent">What I&apos;d validate next</span>
              <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">Test whether users find suitable extensions faster, understand why results match, compare alternatives with less recall effort, and avoid unsuitable selections earlier.</p>
              <p className="mt-6 text-muted-foreground">Because this was a design recommendation project rather than a launched product, these are intended outcomes—not manufactured performance metrics.</p>
            </div>
          </div>
          {outcomes && <DeepDive title="See supporting impact rationale" section={outcomes} />}
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
          {reflection && <DeepDive title="Read the full reflection" section={reflection} />}
        </div>
      </section>
    </>
  );
}

function Summary({ label, text }: { label: string; text: string }) {
  return <div><span className="eyebrow text-accent">{label}</span><p className="mt-5 font-display text-2xl leading-snug tracking-tight md:text-3xl">{text}</p></div>;
}
function Meta({ label, value }: { label: string; value: string }) {
  return <div><span className="eyebrow text-muted-foreground">{label}</span><p className="mt-2 text-sm leading-relaxed">{value}</p></div>;
}
function SectionLabel({ number, label }: { number: string; label: string }) {
  return <div className="flex items-center justify-between border-b border-border pb-5"><span className="eyebrow text-accent">{label}</span><span className="font-mono text-xs text-muted-foreground">{number}</span></div>;
}
function ReasonCell({ label, text, accent = false }: { label: string; text: string; accent?: boolean }) {
  return <div><span className={`eyebrow ${accent ? "text-accent" : "text-muted-foreground"}`}>{label}</span><p className="mt-4 font-display text-xl leading-snug md:text-2xl">{text}</p></div>;
}

function DeepDive({ title, section }: { title: string; section: Section }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-12 border-t border-border">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-6 text-left">
        <span className="eyebrow">{title}</span><span className="font-display text-2xl text-accent">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="grid grid-cols-12 gap-6 pb-10"><div className="col-span-12 space-y-6 md:col-span-10 md:col-start-2">{section.blocks.map((block, i) => <DeepBlock key={i} block={block} />)}</div></div>}
    </div>
  );
}

function DeepBlock({ block }: { block: Block }) {
  if (block.kind === "p") return <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{block.text}</p>;
  if (block.kind === "list") return <div>{block.heading && <h4 className="font-display text-xl">{block.heading}</h4>}<ul className="mt-3 space-y-2">{block.items.map((item) => <li key={item} className="flex gap-3 text-muted-foreground"><span className="mt-2 h-px w-4 shrink-0 bg-accent"/><span>{item}</span></li>)}</ul></div>;
  if (block.kind === "image") return <PlaceholderImage src={block.src} alt={block.alt} caption={block.caption} ratio={block.ratio ?? "16/9"} fit={block.fit ?? "cover"} />;
  if (block.kind === "gallery") return <div className="grid gap-5 sm:grid-cols-2">{block.items.map((item, i) => <PlaceholderImage key={i} src={item.src} alt={item.alt} caption={item.caption} ratio={item.ratio ?? "4/5"} />)}</div>;
  if (block.kind === "carousel") return null;
  return <div className="border-l border-border pl-5"><h4 className="font-display text-xl md:text-2xl">{block.heading}</h4><div className="mt-4 space-y-4">{block.blocks.map((nested, i) => <DeepBlock key={i} block={nested} />)}</div></div>;
}

function findSection(sections: Section[], id: string) { return sections.find((section) => section.id === id); }
function findFirstImage(section?: Section) { return section ? collectImages(section)[0] : undefined; }
function collectImages(section?: Section): Extract<Block, { kind: "image" }>[] {
  if (!section) return [];
  const images: Extract<Block, { kind: "image" }>[] = [];
  const walk = (blocks: Block[]) => blocks.forEach((block) => {
    if (block.kind === "image") images.push(block);
    else if (block.kind === "group") walk(block.blocks);
    else if (block.kind === "gallery") block.items.forEach((item) => images.push({ kind: "image", ...item }));
  });
  walk(section.blocks);
  return images;
}
