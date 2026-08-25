import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import type { CaseStudy } from "@/lib/case-studies";

const HERO_VIDEO_SRC = "/final%20vocari%20hero%20video.mp4";

const researchCards = [
  {
    label: "Personalization",
    title: "People wanted guidance connected to their actual experiences.",
    body: "Generic results felt incomplete when participants could not see how their interests, strengths, skills, values, motivations, memories, and lived experience shaped a recommendation.",
  },
  {
    label: "Trust",
    title: "Explanation mattered most when a result felt surprising.",
    body: "Users needed to inspect the evidence behind an interpretation, question it, and understand realistic tradeoffs before trusting the next step.",
  },
  {
    label: "Emotion",
    title: "Completion did not always mean confidence.",
    body: "Self-report, observed hesitation, exploratory MorphCast data, and teammate-led heart-rate testing showed that ease of use and emotional support could diverge.",
  },
];

const solutionGroups = [
  {
    number: "01",
    title: "Turn conversation into an evolving evidence model",
    body: "Purpose-built prompts help AI notice recurring patterns across experiences, interests, values, motivations, skills, preferences, memories, and reflections without declaring a permanent personality type.",
  },
  {
    number: "02",
    title: "Let each interaction improve the next one",
    body: "Understand, Clarify, and Challenge interactions let users inspect an AI interpretation, add context, preview a proposed change, and decide what becomes confirmed evidence for future recommendations.",
  },
  {
    number: "03",
    title: "Reveal possibilities hidden inside existing strengths",
    body: "People often overlook abilities that come naturally to them. Vocari connects recurring evidence of strengths, problem-solving patterns, motivations, and ways of working to careers they may never have considered, expanding options instead of narrowing them."
  },
];

const slides = [
  {
    src: "/vocari/homepage.webp",
    alt: "Vocari homepage introducing reflective career discovery",
    caption: "Fig. 06 · Recognition-led homepage invites exploration without promising a definitive answer",
  },
  {
    src: "/vocari/dashboard.webp",
    alt: "Vocari dashboard with confidence, patterns, and career recommendations",
    caption: "Fig. 07 · Dashboard connects evidence, patterns, career exploration, and next actions",
  },
  {
    src: "/vocari/careers.webp",
    alt: "Vocari public career library with filters and career cards",
    caption: "Fig. 08 · Public career library supports exploration across industries and education paths",
  },
  {
    src: "/vocari/recommendations.webp",
    alt: "Personalized Vocari career recommendation cards",
    caption: "Fig. 09 · Recommendations show evidence level, fit signals, and alternative-path information",
  },
  {
    src: "/vocari/why-this-fits.webp",
    alt: "Vocari recommendation explanation with supporting evidence and tradeoff",
    caption: "Fig. 10 · Why this fits connects a recommendation to evidence and a realistic consideration",
  },
  {
    src: "/vocari/profile-refinement.webp",
    alt: "Before and after preview of a proposed Profile DNA refinement",
    caption: "Fig. 11 · Profile refinement previews the effect before the user confirms a change",
  },
];

export function VocariCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <>
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal><div className="overflow-hidden bg-secondary p-3 md:p-5"><VocariHero /></div></Reveal>
        </div>
      </section>

      <section id="overview" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="01 / 05" label="Overview" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The project in 30 seconds</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
            <Summary label="The problem" text="Career assessments often produce fixed labels and recommendations people cannot meaningfully evaluate." />
            <Summary label="What I did" text="I conceived, named, designed, and built Vocari, including its product system, research direction, information architecture, interface, and working prototype." />
            <Summary label="The direction" text="Use purposeful AI conversations to reveal strengths people may not recognize in themselves, then connect those abilities to career possibilities they may never have considered." />
          </div>
          <div className="mt-14 grid border-y border-border sm:grid-cols-2 lg:grid-cols-4">
            <Meta label="Role" value="Product Creator, Product Designer & Prototype Developer" />
            <Meta label="Duration" value="May–August 2026" />
            <Meta label="Methods" value="Product strategy, interviews, surveys, usability testing, affective-computing research, IA, interaction design" />
            <Meta label="Tools" value="Lovable, ChatGPT, GitHub, Vercel, React, TypeScript, Supabase, MorphCast, Figma" />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="https://myvocari.lovable.app" target="_blank" rel="noreferrer" className="border border-foreground bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] text-background transition-colors hover:bg-accent hover:text-foreground">Explore the research prototype ↗</a>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">Academic research prototype with a limited career catalog and early-stage personalization. The link demonstrates current capability, not the full product vision.</p>
          </div>
        </div>
      </section>

      <section id="challenge" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="02 / 05" label="Discover" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The challenge</p>
          <div className="mt-14 grid grid-cols-12 gap-8">
            <Reveal className="col-span-12 lg:col-span-8">
              <h2 className="font-display text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.98] tracking-[-0.035em]">People did not need another label. They needed a way to <span className="text-accent">recognize themselves.</span></h2>
            </Reveal>
            <div className="col-span-12 lg:col-span-4 lg:pt-3">
              <p className="text-lg leading-relaxed text-muted-foreground">{study.challenge}</p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{study.context}</p>
            </div>
          </div>
          <div className="mt-16"><CaseFigure src="/vocari/early-empty-state.webp" alt="Early Career Compass dashboard empty state" caption="Fig. 02 · Early assessment-style prototype before the product shifted toward Progressive Discovery" /></div>
        </div>
      </section>

      <section id="insights" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex items-baseline gap-5"><span className="font-mono text-xs text-muted-foreground">Research findings</span><span className="eyebrow text-accent">What discovery revealed</span></div>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
            {researchCards.map((card, i) => <Reveal key={card.label} delay={i * 80}><article><span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")} · {card.label}</span><h3 className="mt-7 font-display text-2xl leading-tight tracking-tight md:text-3xl">{card.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{card.body}</p></article></Reveal>)}
          </div>
          <div className="mt-14"><CaseFigure src="/vocari/morphcast.webp" alt="Vocari research analytics showing consented MorphCast data" caption="Fig. 03 · Consent-aware MorphCast instrumentation connected emotional signals to specific prototype screens" /></div>
          <p className="mt-6 max-w-4xl text-sm leading-relaxed text-muted-foreground">Eight participants completed the affective-computing study; usable facial analytics were available for three. The findings were exploratory and informed research questions, not consumer personalization or claims of emotional accuracy.</p>
        </div>
      </section>

      <section id="reasoning" className="bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="03 / 05" label="Define" tone="dark" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-background/60">Designing the system behind the interface</p>
          <div className="grid gap-12 py-16 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <div className="space-y-4 font-display text-2xl text-background/70 md:text-3xl"><p>Fixed assessment results</p><p>Unexplained recommendations</p><p>Invisible profile changes</p></div>
            <div className="hidden h-48 w-px bg-background/20 lg:block" />
            <div><span className="eyebrow text-accent">Product opportunity</span><p className="mt-6 font-display text-3xl leading-snug md:text-5xl">Turn every AI interaction into a transparent, correctable learning loop.</p></div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <CaseFigure src="/vocari/discovery-journey.webp" alt="Vocari progressive discovery service journey" caption="Fig. 04 · Progressive Discovery connects reflection, recognition, career exploration, action, and continued growth" dark />
            <CaseFigure src="/vocari/product-book.webp" alt="Vocari Product Book North Star and decision filter" caption="Fig. 05 · Product Book aligns vision, architecture, evidence, data, and responsible evolution" dark />
          </div>
          <p className="mt-10 max-w-4xl text-base leading-relaxed text-background/70">I created the Vocari Product Book, Progressive Discovery Engine, product vision, and Career Content & Data Specification to keep experience language, profile evidence, recommendation logic, career facts, and future AI behavior aligned. These documents explicitly distinguish current capability, approved direction, and long-term vision.</p>
        </div>
      </section>

      <section id="design" className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="04 / 05" label="Design" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">The solution direction</p>
          <div className="mt-14 grid gap-12 md:grid-cols-3">{solutionGroups.map(group => <div key={group.number}><span className="font-mono text-xs text-accent">{group.number}</span><h3 className="mt-6 font-display text-2xl leading-tight md:text-3xl">{group.title}</h3><p className="mt-5 leading-relaxed text-muted-foreground">{group.body}</p></div>)}</div>
          <AILearningLoop />
          <DesignCarousel />

          <Reveal>
            <div className="mt-16 grid gap-8 border-y border-border py-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
              <div>
                <span className="eyebrow text-accent">Delivery resilience</span>
                <h3 className="mt-6 font-display text-3xl leading-tight md:text-5xl">
                  When the platform reached its limits, I changed the delivery pipeline.
                </h3>
              </div>
              <div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  During high-intensity prototyping, platform resource limits began interrupting iteration. Instead of
                  pausing development, I established an alternate workflow: bringing relevant codebase context into
                  ChatGPT to develop targeted patches, reviewing and pushing changes through GitHub, and using Vercel's
                  automated deployments to keep the working prototype available for continued validation.
                </p>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  The workflow reduced dependency on a single prototyping platform while preserving version history,
                  deployment continuity, and the ability to keep testing live product decisions.
                </p>
                <div className="mt-8 flex flex-wrap gap-3" aria-label="Delivery workflow tools">
                  {["ChatGPT-assisted development", "GitHub version control", "Vercel deployment"].map((tool) => (
                    <span
                      key={tool}
                      className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="next" className="bg-secondary px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionLabel number="05 / 05" label="Next" />
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Outcome, boundaries & reflection</p>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <div><span className="eyebrow text-accent">What the prototype demonstrated</span><h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">A career platform can treat the user as the authority on their own life.</h2><p className="mt-7 text-lg leading-relaxed text-muted-foreground">The working prototype established the structured foundation: profile evidence, rule-derived patterns, explainable career recommendations, public exploration, authenticated persistence, and consent-aware research instrumentation. The approved AI direction adds purposeful conversations that transform user-confirmed context into progressively better recommendations.</p></div>
            <div className="space-y-8">
              <ReasonCell label="Validate next" text="Longitudinal AI conversations, broader career coverage, recommendation calibration, accessibility, and resource recommendations that improve through reflection." />
              <ReasonCell label="Important boundary" text="MorphCast remained isolated research instrumentation and did not influence consumer recommendations." />
              <ReasonCell label="Reflection" text="The hardest product challenge was not simply adding AI. It was designing a learning loop that could recognize patterns, improve through interaction, and still keep its evidence visible, correctable, and user-controlled." />
            </div>
          </div>
          <div className="mt-16 border-t border-border pt-12"><span className="eyebrow text-accent">Capabilities demonstrated</span><div className="mt-7 flex flex-wrap gap-3">{["Product creation","Systems thinking","UX research","Information architecture","Interaction design","Prototype development","AI governance","Data specification"].map(skill=><span key={skill} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-wider">{skill}</span>)}</div></div>
        </div>
      </section>
    </>
  );
}

function AILearningLoop() {
  const steps = [
    { number: "01", title: "Prompt", text: "Vocari asks a focused question selected to fill a meaningful gap in what it understands." },
    { number: "02", title: "Interpret", text: "AI looks for patterns across confirmed experiences, skills, values, motivations, interests, memories, preferences, and real-life context." },
    { number: "03", title: "Confirm", text: "The user can understand, clarify, challenge, or reject the interpretation before it changes Profile DNA." },
    { number: "04", title: "Recommend", text: "Recommendations show where recurring strengths and motivations are valuable, opening unfamiliar career possibilities without ruling out any path." },
    { number: "05", title: "Reflect", text: "The user reflects on a career, activity, or future learning resource, creating new evidence for the next interaction." },
  ];
  return (
    <div className="mt-16 border-y border-border py-14">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.7fr]">
        <div>
          <span className="eyebrow text-accent">The AI learning loop</span>
          <h3 className="mt-6 font-display text-3xl leading-tight md:text-5xl">The more users interact, the more useful Vocari can become.</h3>
          <p className="mt-6 leading-relaxed text-muted-foreground">Vocari is designed to learn through purposeful questions and confirmed evidence, not passive surveillance. Over time, the same loop can support resource recommendations and reflections that deepen the profile again.</p>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {steps.map((step) => (
            <div key={step.number} className="bg-background p-6">
              <span className="font-mono text-xs text-accent">{step.number} · {step.title}</span>
              <p className="mt-4 leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-8 border-l border-accent pl-5 text-sm leading-relaxed text-muted-foreground">Recommendations are invitations to explore, not judgments about what someone can or cannot do. The goal is to make overlooked strengths and unfamiliar possibilities visible.</p>
    </div>
  );
}

function VocariHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return <figure><div className="relative w-full overflow-hidden bg-background" style={{ aspectRatio: "16/9" }}>{reducedMotion ? <img src="/vocari/homepage.webp" alt="Vocari research prototype" className="absolute inset-0 h-full w-full object-cover" /> : <video className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO_SRC} autoPlay muted loop playsInline preload="metadata" aria-label="Short motion preview of the Vocari research prototype" />}</div><figcaption className="eyebrow mt-4 flex items-center justify-between"><span>Fig. 01 · From lived experience to evidence-informed career exploration</span><span aria-hidden>✦</span></figcaption></figure>;
}

function DesignCarousel() {
  const [active, setActive] = useState(0);
  return <div className="mt-14"><div className="mx-auto max-w-5xl">{slides.map((slide,index)=><div key={slide.src} className={index===active?"block":"hidden"} aria-hidden={index!==active}><CaseFigure src={slide.src} alt={slide.alt} caption={slide.caption} portrait={index===1} /></div>)}</div><div className="mx-auto mt-6 flex max-w-5xl items-center justify-between border-t border-border pt-5"><span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Solution visual {String(active+1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</span><div className="flex gap-3"><button type="button" onClick={()=>setActive((active-1+slides.length)%slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Previous</button><button type="button" onClick={()=>setActive((active+1)%slides.length)} className="border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] hover:border-accent hover:text-accent">Next</button></div></div></div>;
}

function CaseFigure({src,alt,caption,portrait=false,dark=false}:{src:string;alt:string;caption:string;portrait?:boolean;dark?:boolean}) {
  return <figure className="w-full"><div className={`flex w-full items-center justify-center border p-4 md:p-6 ${dark?"border-background/20 bg-background/5":"border-border bg-secondary"}`}><img src={src} alt={alt} className={portrait?"block max-h-[760px] w-auto max-w-full":"block h-auto w-full"} loading="lazy" /></div><figcaption className={`eyebrow mt-3 flex items-center justify-between border-t pt-2 ${dark?"border-background/20 text-background/70":"border-border"}`}><span>{caption}</span><span aria-hidden>✦</span></figcaption></figure>;
}
function Summary({label,text}:{label:string;text:string}) { return <div><span className="eyebrow text-accent">{label}</span><p className="mt-5 font-display text-2xl leading-snug tracking-tight md:text-3xl">{text}</p></div>; }
function Meta({label,value}:{label:string;value:string}) { return <div className="min-h-32 border-border px-0 py-6 sm:px-6 sm:first:pl-0 lg:border-r lg:last:border-r-0"><span className="eyebrow text-muted-foreground">{label}</span><p className="mt-3 max-w-[28ch] text-sm leading-relaxed">{value}</p></div>; }
function SectionLabel({number,label,tone="light"}:{number:string;label:string;tone?:"light"|"dark"}) { return <div className="flex items-baseline gap-5"><span className={`font-mono text-xs ${tone==="dark"?"text-background/60":"text-muted-foreground"}`}>{number}</span><span className="eyebrow text-accent">{label}</span></div>; }
function ReasonCell({label,text}:{label:string;text:string}) { return <div><span className="eyebrow text-accent">{label}</span><p className="mt-4 font-display text-xl leading-snug md:text-2xl">{text}</p></div>; }

