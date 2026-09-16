import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { SiteNav } from "@/components/site-nav";
import { ConnectionHero } from "@/components/connection-hero";
import { Reveal } from "@/components/reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { PlaceholderImage } from "@/components/placeholder-image";
import { ContentVisualCase } from "@/components/content-visual-case";
import noiseCover from "@/assets/noise/Cover_Noise_visual_design_study.png.asset.json";
import { caseStudies } from "@/lib/case-studies";
import { supabase } from "@/integrations/supabase/client";
const portraitUrl = "/home/portrait.svg";
import resumePdf from "@/assets/resume.pdf.asset.json";
import earSketch from "@/assets/editorial/ear-sketch.png";
import eyeSketch from "@/assets/editorial/eye-sketch.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Danielle Bosworth — Product, AI & Experience Strategy" },
      {
        name: "description",
        content:
          "Danielle Bosworth is a product and experience strategist connecting human behavior, operational workflows, and AI systems to solve complex business problems.",
      },
      { property: "og:title", content: "Danielle Bosworth — Product, AI & Experience Strategy" },
      {
        property: "og:description",
        content:
          "Danielle Bosworth is a product and experience strategist connecting human behavior, operational workflows, and AI systems to solve complex business problems.",
      },
      { property: "og:url", content: "https://madebydanielleb.com/" },
      { property: "og:image", content: "https://madebydanielleb.com/__l5e/assets-v1/482779bb-540e-4b8e-b11b-fabba4614b04/d-logo.png" },
      { property: "og:image:alt", content: "Danielle Bosworth logo" },
      { name: "twitter:image", content: "https://madebydanielleb.com/__l5e/assets-v1/482779bb-540e-4b8e-b11b-fabba4614b04/d-logo.png" },
      { name: "twitter:title", content: "Danielle Bosworth — Product, AI & Experience Strategy" },
      { name: "twitter:description", content: "Danielle Bosworth is a product and experience strategist connecting human behavior, operational workflows, and AI systems to solve complex business problems." },
    ],
    links: [{ rel: "canonical", href: "https://madebydanielleb.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Danielle Bosworth",
          url: "https://madebydanielleb.com/",
          description:
            "Product and experience strategy portfolio of Danielle Bosworth, connecting human behavior, operational workflows, systems thinking, and AI.",
          author: { "@type": "Person", name: "Danielle Bosworth" },
        }),
      },
    ],
  }),
  component: Index,
});

const marquee = [
  "Product Strategy",
  "Customer Experience",
  "UX Research",
  "Content & Marketing",
  "Voice of Customer",
  "Service Design",
  "Information Architecture",
  "Cross-Functional",
];

const projectProof: Record<string, { connection: string; evidence: string }> = {
  vocari: {
    connection:
      "An independent AI/product innovation: Vocari explores how behavioral signals, confirmed evidence, and reflection can power adaptive career discovery without flattening a person's complexity.",
    evidence:
      "An end-to-end research prototype, eight affective-computing sessions, Profile DNA, explainable recommendations, and the Progressive Discovery system established the foundation for learning over time.",
  },
  joomla: {
    connection:
      "Users were not simply struggling to search. Metadata quality, ranking logic, compatibility, and trust all shaped whether they could make a confident decision.",
    evidence:
      "Four stakeholder interviews, two surveys, a heuristic evaluation, and competitive research informed an IA and search recommendation framework.",
  },
  "next-destination": {
    connection:
      "Planning stress came from fragmentation across budgeting, group coordination, personalization, and itinerary tools, not from destination discovery alone.",
    evidence:
      "Research synthesis and feature prioritization shaped an all-in-one concept, high-fidelity prototype, and product strategy.",
  },
  supercuts: {
    connection:
      "The visible problem was low sales, but the real problem crossed staffing, service consistency, training, customer behavior, and local demand.",
    evidence:
      "Reviewed roughly six months of historical performance, then changed training, operations, incentives, and local outreach while monitoring results — monthly sales grew from roughly $4–5K to more than $20K over about 13 months.",
  },
  robin: {
    connection:
      "The client brief was open: improve the job-search experience. Research showed job seekers juggling resumes, applications, interviews, and follow-up with little visibility into what to do next.",
    evidence:
      "Market and user research, personas and journey mapping, a design sprint, a working prototype, and user testing shaped the product concept presented back to the client.",
  },
  "content-strategy": {
    connection:
      "The same customer question could support multiple audience touchpoints when the message was adapted to each channel rather than recreated from scratch.",
    evidence:
      "One source article became a coordinated set of blog, carousel, short-form video, email, and supporting social assets.",
  },
};

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav darkAtTop />
      <Hero />
      <Marquee />
      <HowIWork />
      <CommercialImpact />
      <Work />
      <About />
      <Resume />
      <Contact />
      <Footer />
      <BackToTop />
      {import.meta.env.DEV ? (
        <Link
          to="/connect"
          className="fixed bottom-5 left-5 z-50 rounded-sm border border-border bg-background px-3 py-2 font-mono text-[0.65rem] uppercase tracking-widest text-foreground shadow-sm transition-colors hover:border-teal hover:text-teal"
        >
          Preview connect page
        </Link>
      ) : null}
    </div>
  );
}

function Hero() {
  return <ConnectionHero portraitUrl={portraitUrl} resumeUrl={resumePdf.url} />;
}

function Stat({ k, label }: { k: string; label: string }) {
  return (
    <div className="group border-t border-border pt-3 transition-colors duration-300 hover:border-teal">
      <div className="font-display text-2xl tracking-tight text-teal transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-3xl">
        <AnimatedCounter value={k} />
      </div>
      <div className="eyebrow mt-1 leading-tight">{label}</div>
    </div>
  );
}

function ParallaxWrap({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const offset = Math.max(-16, Math.min(16, -progress * 24));
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <section className="overflow-hidden border-y border-border bg-foreground py-5 text-background">
      <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
        {items.map((t, i) => (
          <span key={i} className="font-display text-2xl tracking-tight md:text-3xl">
            {t} <span className="text-accent soft-pulse">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function HowIWork() {
  const steps = ["Find the friction", "Trace the system", "Design the intervention"];
  const titleRows = ["HO", "WI", "WOR", "K"];

  return (
    <section aria-labelledby="how-i-work-heading" className="border-b border-border px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 items-stretch gap-8 md:gap-10 lg:gap-14">
          <Reveal className="col-span-12 md:col-span-4 lg:col-span-3">
            <div
              aria-hidden
              className="flex h-60 flex-col justify-center overflow-hidden bg-charcoal px-3 py-4 text-background sm:h-72 md:h-full md:min-h-[30rem]"
            >
              {titleRows.map((row, index) => (
                <span
                  key={row}
                  className="block font-sans text-[clamp(4.6rem,12vw,9rem)] font-semibold uppercase leading-[0.62] tracking-[-0.12em]"
                  style={{ transform: `translateX(${index % 2 === 0 ? "-0.08em" : "0.04em"})` }}
                >
                  {row}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="col-span-12 md:col-span-8 lg:col-span-9" delay={100}>
            <div className="flex h-full flex-col justify-center">
              <h2 id="how-i-work-heading" className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
                Find the friction<span className="text-accent">.</span> Trace the system
                <span className="text-accent">.</span> Design the intervention<span className="text-accent">.</span>
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Research helps me understand where a problem actually begins. Systems thinking reveals the dependencies
                around it. Product strategy turns those findings into something actionable, whether that means changing
                a workflow, defining a feature, restructuring information, or introducing new technology.
              </p>
              <ol className="mt-9 grid gap-3 sm:grid-cols-3">
                {steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="eyebrow w-full rounded-full border border-border px-4 py-2 text-center transition-colors duration-300 hover:border-teal hover:text-teal">
                      <span className="mr-2 font-mono text-teal">0{i + 1}</span>
                      {step}
                    </span>
                    {i < steps.length - 1 && (
                      <span aria-hidden className="hidden font-mono text-muted-foreground lg:inline">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const commercialImpact = [
  {
    index: "01",
    category: "AI Product & Knowledge Design",
    outcome: "1 Source",
    outcomeLabel: "Unified AI knowledge hub",
    context: "Magic Sleek · Internal AI System",
    description:
      "Designed an AI-assisted knowledge system that unified fragmented product data and technical guidance, simplifying internal workflows and helping teams deliver more consistent answers to customer questions.",
    tags: ["AI Workflows", "Information Architecture", "Process Optimization"],
    featuredCase: false,
  },
  {
    index: "02",
    category: "CX & Service Design",
    outcome: "4×+",
    outcomeLabel: "Monthly location revenue",
    context: "G&C Robins Co. / Supercuts",
    description:
      "Improved frontline service workflows, staffing, CRM outreach, and client follow-up, helping turn a struggling retail location into a high-performing operation with a +32% lift in retention.",
    tags: ["CX Design", "Service Design", "Customer Journey Mapping"],
    featuredCase: false,
    caseSlug: "supercuts",
  },
  {
    index: "03",
    category: "Product & Partner Strategy",
    outcome: "~$56K",
    outcomeLabel: "First-order account activation",
    context: "Magic Sleek · B2B Expansion",
    description:
      "Connected business goals with salon and distributor needs by creating targeted product education, onboarding assets, and cross-functional communication for a major regional partner.",
    tags: ["Product Strategy", "Cross-Functional Enablement", "User Onboarding"],
    featuredCase: true,
  },
];

function CommercialImpact() {
  return (
    <section
      aria-labelledby="commercial-impact-heading"
      className="border-b border-border bg-charcoal px-6 py-12 text-background md:px-12 md:py-14"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
            <h2
              id="commercial-impact-heading"
              className="font-mono text-[clamp(2rem,4vw,3.25rem)] lowercase leading-none tracking-[-0.055em] text-background/70"
            >
              impact<span aria-hidden className="text-teal">_</span>
            </h2>
            <p className="font-display text-xl tracking-tight text-background md:text-2xl">
              Cross-functional work, real business <span className="text-teal">impact</span>
              <span className="text-accent">.</span>
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {commercialImpact.map((item) => (
            <div
              key={item.index}
              className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-5 border-t border-background/15 pt-5 sm:flex sm:grid-cols-none sm:gap-4"
            >
              <span className="font-display text-3xl leading-none tracking-[-0.03em] text-background md:text-4xl">
                {item.outcome}
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-background/80">{item.outcomeLabel}</span>
                <span className="eyebrow block text-background/45">{item.context}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



const magicSleekEvidence = [
  {
    src: "/magic-sleek/commercial-gap.svg",
    alt: "Before-and-after diagram showing the distributor enablement gap and the partner-ready system Danielle built",
    label: "01 · Business gap",
    title: "The product story existed. The partner system did not.",
    description:
      "Outdated general materials and scattered commercial information made the opportunity harder for distributor leaders and field representatives to evaluate.",
  },
  {
    src: "/magic-sleek/partnership-pathway.svg",
    alt: "Five-stage pathway from initiating distributor contact through an approximately 56 thousand dollar initial order",
    label: "02 · Contribution pathway",
    title: "I connected relationship-building, content, and enablement.",
    description:
      "I initiated contact with distributor leadership, secured the meeting, built the sales story, and prepared the team to represent the product.",
  },
  {
    src: "/magic-sleek/enablement-toolkit.svg",
    alt: "Representative reconstruction of distributor, professional decision, and troubleshooting documents",
    label: "03 · Enablement system",
    title: "One knowledge foundation, translated by audience.",
    description:
      "Distributor materials clarified commercial value while professional guides supported consistent application, troubleshooting, and post-training reference.",
  },
  {
    src: "/magic-sleek/training-seminar.svg",
    alt: "Representative four-hour training seminar architecture covering product, application, sales, and support",
    label: "04 · Team readiness",
    title: "Four hours designed to build selling confidence.",
    description:
      "The seminar connected product knowledge, professional application, objection handling, and salon value into a repeatable field conversation.",
  },
];

function MagicSleekFieldCase({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-charcoal/80 p-0 backdrop-blur-sm sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="magic-sleek-case-heading"
        onClick={(e) => e.stopPropagation()}
        className="page-fade max-h-full w-full max-w-[1100px] overflow-y-auto border border-background/20 bg-charcoal text-background"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-background/20 bg-charcoal px-6 py-5 md:px-9">
          <div>
            <span className="eyebrow text-teal">§ Featured Field Case</span>
            <h3
              id="magic-sleek-case-heading"
              className="mt-2 font-display text-2xl leading-[1.05] tracking-tight text-background md:text-3xl"
            >
              Building the system behind a <span className="italic text-teal">~$56K distributor launch</span>
              <span className="text-accent">.</span>
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 border border-background/25 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-background/70 hover:border-teal hover:text-teal"
          >
            Close ✕
          </button>
        </div>

        <div id="magic-sleek-case-content" className="px-6 pb-12 pt-10 md:px-9 md:pb-16">

          <Reveal>
            <p className="max-w-4xl font-display text-xl leading-relaxed text-background/90 sm:text-2xl md:text-3xl">
              Magic Sleek had strong product expertise, but its distributor story was fragmented across outdated
              presentations, informal knowledge, and materials created for other audiences. I turned that information
              into a partner-ready sales and education system, while also opening the relationship that created the
              opportunity.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px border border-background/20 bg-background/20 md:grid-cols-3">
            {[
              {
                label: "The business need",
                body: "Give distributor leadership enough commercial clarity to evaluate the partnership, then equip its sales representatives to communicate value to salons.",
              },
              {
                label: "What I owned",
                body: "Initiated contact with the owner, secured the meeting, created distributor-specific and professional materials, and led a four-hour product and sales seminar.",
              },
              {
                label: "The result",
                body: "The combined relationship, sales, and training work supported a new distributor partnership and an initial order of approximately $56K.",
              },
            ].map((item) => (
              <div key={item.label} className="bg-charcoal p-7 md:p-8">
                <span className="eyebrow text-teal">{item.label}</span>
                <p className="mt-4 text-sm leading-relaxed text-background/75 md:text-base">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
            {magicSleekEvidence.map((item, i) => (
              <Reveal key={item.src} delay={(i % 2) * 100}>
                <figure>
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden border border-background/20 bg-navy p-2 transition-colors hover:border-teal"
                    aria-label={`Open full-size visual: ${item.title}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      width={1664}
                      height={960}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                  </a>
                  <figcaption className="mt-5 border-l-2 border-teal pl-4">
                    <span className="eyebrow text-teal">{item.label}</span>
                    <h4 className="mt-2 font-display text-2xl leading-tight text-background">{item.title}</h4>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-background/65">{item.description}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-12 gap-6 border-y border-background/20 py-10">
            <div className="col-span-12 md:col-span-3">
              <span className="eyebrow text-teal">Commercial takeaway</span>
            </div>
            <p className="col-span-12 max-w-4xl font-display text-2xl leading-relaxed text-background md:col-span-9 md:text-3xl">
              This was not a design exercise. It was cross-functional commercial work that moved from opportunity
              identification to partner readiness and revenue.
            </p>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="max-w-3xl text-xs leading-relaxed text-background/45">
              Visuals are representative reconstructions because original client materials are confidential. The
              commercial figure is approximate and reflects the initial distributor order.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="eyebrow shrink-0 text-teal link-underline"
            >
              Close case ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const moreWorkOrder = ["robin", "next-destination", "supercuts"];

function Work() {
  const featured = caseStudies.filter((cs) => cs.slug === "vocari" || cs.slug === "joomla");
  const rest = moreWorkOrder
    .map((slug) => caseStudies.find((cs) => cs.slug === slug))
    .filter((cs): cs is (typeof caseStudies)[number] => Boolean(cs));

  const [fieldCaseOpen, setFieldCaseOpen] = useState(false);
  const [contentCaseOpen, setContentCaseOpen] = useState(false);
  const anyModalOpen = fieldCaseOpen || contentCaseOpen;

  useEffect(() => {
    if (!anyModalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFieldCaseOpen(false);
        setContentCaseOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [anyModalOpen]);


  return (
    <section id="work" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 grid grid-cols-12 items-center gap-8 border-b border-border pb-10 md:gap-10">
          <Reveal className="col-span-12 sm:col-span-5 md:col-span-4">
            <div
              aria-hidden
              className="relative h-44 max-w-md overflow-hidden text-teal sm:h-56 md:h-64"
            >
              <div
                className="absolute -left-2 top-1 font-display text-[clamp(5.5rem,12vw,10rem)] uppercase leading-[0.55] tracking-[-0.1em] text-transparent"
                style={{ WebkitTextStroke: "1.2px var(--teal)" }}
              >
                PROJ
              </div>
              <div
                className="absolute -left-5 bottom-2 font-display text-[clamp(5.5rem,12vw,10rem)] uppercase leading-[0.55] tracking-[-0.1em] text-transparent"
                style={{ WebkitTextStroke: "1.2px var(--teal)" }}
              >
                ECTS
              </div>
              <span className="absolute left-[43%] top-[8%] h-[84%] w-px rotate-[18deg] bg-background" />
              <span className="absolute left-[67%] top-0 h-full w-px -rotate-[12deg] bg-background" />
            </div>
          </Reveal>

          <Reveal className="col-span-12 sm:col-span-7 md:col-span-8" delay={100}>
            <h2 className="font-display text-4xl leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              Selected work across product, research, and
              <span className="italic text-muted-foreground"> systems thinking</span>
              <span className="text-accent">.</span>
            </h2>
          </Reveal>
        </div>

        <div className="divide-y divide-border">
          {featured.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 100}>
              <Link to="/work/$slug" params={{ slug: cs.slug }} className="group block py-10 md:py-14">
                <div className="grid grid-cols-12 gap-6 md:items-center md:gap-10">
                  {/* Image */}
                  <div className={`col-span-12 md:col-span-5 ${cs.slug === "joomla" ? "md:order-2" : "md:order-1"}`}>
                    <div className="overflow-hidden border-2 border-teal p-3 shadow-lg card-lift bg-charcoal">
                      <PlaceholderImage
                        label={`Project ${cs.index}`}
                        ratio="4/3"
                        src={cs.cover?.src}
                        alt={cs.cover?.alt}
                        fit="contain"
                        className="bg-paper transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>

                  {/* Text */}
                  <div className={`col-span-12 md:col-span-7 ${cs.slug === "joomla" ? "md:order-1" : "md:order-2"}`}>
                    <h3 className="font-display text-3xl tracking-tight transition-transform duration-500 group-hover:-translate-y-1 md:text-5xl">
                      {cs.title}
                      <span className="text-teal">.</span>
                    </h3>
                    <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">{cs.homeSubtitle ?? cs.subtitle}</p>
                    {projectProof[cs.slug] && (
                      <div className="mt-6 grid max-w-2xl gap-5 border-l-2 border-teal pl-5 sm:grid-cols-2">
                        <div>
                          <span className="eyebrow text-teal">Connection recognized</span>
                          <p className="mt-2 text-sm leading-relaxed text-foreground">
                            {projectProof[cs.slug].connection}
                          </p>
                        </div>
                        <div>
                          <span className="eyebrow text-muted-foreground">Evidence</span>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {projectProof[cs.slug].evidence}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="mt-6 flex flex-wrap items-center gap-2">
                      {cs.tags.map((t) => (
                        <span
                          key={t}
                          className="eyebrow rounded-full border border-border px-3 py-1 transition-all duration-300 hover:border-teal hover:text-teal hover:-translate-y-0.5"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="eyebrow arrow-slide link-underline ml-auto hidden md:inline">
                        Read case{" "}
                        <span className="arrow" aria-hidden>
                          →
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <WorkCarousel
          items={rest}
          onOpenFieldCase={() => setFieldCaseOpen(true)}
          onOpenContentCase={() => setContentCaseOpen(true)}
        />
        <MagicSleekFieldCase open={fieldCaseOpen} onClose={() => setFieldCaseOpen(false)} />
        <ContentVisualCase open={contentCaseOpen} onClose={() => setContentCaseOpen(false)} />
      </div>
    </section>

  );
}

function WorkCarousel({
  items,
  onOpenFieldCase,
  onOpenContentCase,
}: {
  items: typeof caseStudies;
  onOpenFieldCase: () => void;
  onOpenContentCase: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const total = items.length + 2;


  // Scroll offset that brings card `i` to the snap position.
  function offsetFor(track: HTMLDivElement, i: number) {
    const cards = Array.from(track.children) as HTMLElement[];
    const first = cards[0];
    const card = cards[i];
    if (!first || !card) return 0;
    const max = track.scrollWidth - track.clientWidth;
    return Math.max(0, Math.min(max, card.offsetLeft - first.offsetLeft));
  }

  // Keep the internal index synced with manual swiping / trackpad scrolling
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const count = track.children.length;
        let nearest = 0;
        let best = Infinity;
        for (let i = 0; i < count; i++) {
          const d = Math.abs(offsetFor(track, i) - track.scrollLeft);
          if (d < best) {
            best = d;
            nearest = i;
          }
        }
        indexRef.current = nearest;
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [items.length]);

  function scrollToIndex(target: number) {
    const track = trackRef.current;
    if (!track || !track.children[target]) return;
    indexRef.current = target;
    track.scrollTo({ left: offsetFor(track, target), behavior: "smooth" });
  }

  function step(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 2;
    const atStart = track.scrollLeft <= 2;
    // Wrap when the track can't scroll any further in that direction
    if (dir === 1 && atEnd) return scrollToIndex(0);
    if (dir === -1 && atStart) return scrollToIndex(total - 1);
    scrollToIndex(((indexRef.current + dir) % total + total) % total);
  }




  const arrowClass =
    "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-base leading-none text-foreground transition-colors hover:border-teal hover:text-teal";
  const cardClass =
    "group grid w-[80%] shrink-0 snap-start grid-rows-[auto_2.5rem_minmax(5.75rem,auto)_minmax(8rem,1fr)_auto] self-stretch border border-border bg-card p-5 text-left card-lift sm:w-[52%] lg:w-[38%]";
  const mediaClass = "block aspect-video overflow-hidden border border-border bg-charcoal p-2";
  const mediaImageClass = "block h-full w-full bg-paper object-contain transition-transform duration-700";
  const metadataClass = "eyebrow mt-5 block self-start text-muted-foreground";
  const titleClass = "mt-1 block self-start font-display text-2xl leading-[1.15] tracking-tight";
  const descriptionClass = "mt-2 block self-start text-sm leading-relaxed text-muted-foreground";
  const tagsClass = "mt-5 flex min-h-[4.5rem] content-start flex-wrap gap-2 self-end";
  const metadataBySlug: Record<string, string> = {
    robin: "Industry RFP · Product Discovery",
    "next-destination": "End-to-End Product Design",
    supercuts: "Operations · Customer Experience",
  };

  return (
    <div className="mt-16">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-t border-border pt-8">
        <h3 className="font-mono text-[clamp(2.25rem,5vw,4.5rem)] lowercase leading-none tracking-[-0.055em] text-foreground">
          more work<span aria-hidden className="ml-1 inline-block text-teal soft-pulse">_</span>
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous project"
            className={arrowClass}
          >
            <span aria-hidden>←</span>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next project"
            className={arrowClass}
          >
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>


      <div
        ref={trackRef}
        className="no-scrollbar -mx-6 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:-mx-12 md:px-12"
      >
        <button
          type="button"
          onClick={onOpenFieldCase}
          aria-haspopup="dialog"
          className={cardClass}
        >
          <span className={mediaClass}>
            <img
              src="/magic-sleek/partnership-pathway.svg"
              alt="Five-stage pathway from initiating distributor contact through an initial distributor order"
              loading="lazy"
              className={`${mediaImageClass} bg-charcoal group-hover:scale-[1.02]`}
            />
          </span>
          <span className={metadataClass}>Magic Sleek · B2B Partner Expansion</span>
          <span className={titleClass}>
            Building the system behind a ~$56K distributor launch
            <span className="text-teal">.</span>
          </span>
          <span className={descriptionClass}>
            I connected partner outreach, sales positioning, product education, and field enablement into one system
            that supported the distributor launch.
          </span>
          <span className={tagsClass}>
            {["B2B Strategy", "Partner Enablement", "Cross-Functional Execution"].map((t) => (
              <span key={t} className="eyebrow rounded-full border border-border px-3 py-1">
                {t}
              </span>
            ))}
          </span>
        </button>

        {items.map((cs) => (
          <Link
            key={cs.slug}
            to="/work/$slug"
            params={{ slug: cs.slug }}
            className={cardClass}
          >
            <span className={mediaClass}>
              <img
                src={cs.cover?.src}
                alt={cs.cover?.alt ?? `${cs.title} project cover`}
                loading="lazy"
                className={`${mediaImageClass} ${
                  cs.slug === "supercuts"
                    ? "bg-charcoal scale-[1.03] group-hover:scale-[1.06]"
                    : cs.slug === "robin" || cs.slug === "next-destination"
                      ? "scale-[1.18] group-hover:scale-[1.22]"
                      : "group-hover:scale-[1.02]"
                }`}
              />
            </span>
            <span className={metadataClass}>{metadataBySlug[cs.slug] ?? cs.discipline}</span>
            <h3 className={titleClass}>
              {cs.title}
              <span className="text-teal">.</span>
            </h3>
            <p className={descriptionClass}>{cs.homeSubtitle ?? cs.subtitle}</p>
            <span className={tagsClass}>
              {cs.tags.slice(0, 3).map((t) => (
                <span key={t} className="eyebrow rounded-full border border-border px-3 py-1">
                  {t}
                </span>
              ))}
            </span>
          </Link>
        ))}

        <button
          type="button"
          onClick={onOpenContentCase}
          aria-haspopup="dialog"
          className={cardClass}
        >
          <span className={mediaClass}>
            <img
              src={noiseCover.url}
              alt="NOISE visual attention study cover artwork"
              loading="lazy"
              className={`${mediaImageClass} object-cover group-hover:scale-[1.02]`}
            />
          </span>
          <span className={metadataClass}>Content Strategy · Visual Design</span>
          <span className={titleClass}>
            Content &amp; Visual Communication
            <span className="text-teal">.</span>
          </span>
          <span className={descriptionClass}>
            Two explorations in translating ideas into attention, visual hierarchy, and multichannel communication.
          </span>
          <span className={tagsClass}>
            {["Content Strategy", "Visual Communication", "Creative Direction"].map((t) => (
              <span key={t} className="eyebrow rounded-full border border-border px-3 py-1">
                {t}
              </span>
            ))}
          </span>
        </button>
      </div>
    </div>
  );
}

function EditorialSketches() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh + 200) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Ghost-print treatment: invert the dark-line sketches so strokes become
  // light, then use `screen` so the white paper drops out into the navy
  // background entirely. What remains is a faint lifted texture — no gray
  // rectangle, no photographic image, just the barest hint of a shape that
  // reveals itself once the eye adjusts.
  const baseImg: React.CSSProperties = {
    position: "absolute",
    mixBlendMode: "screen",
    filter: "invert(1) grayscale(1) contrast(0.85) brightness(0.9)",
    userSelect: "none",
    pointerEvents: "none",
  };

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0" style={{ zIndex: 0 }}>
      {/* Ear — large but reduced/staggered so desktop does not collide with the eye. */}
      <img
        src={earSketch}
        alt=""
        loading="lazy"
        width={1024}
        height={1024}
        
        style={{
          ...baseImg,
          top: "clamp(-90px, -4vw, -32px)",
          left: "clamp(-360px, -18vw, -160px)",
          width: "clamp(680px, 52vw, 1050px)",
          transition: "opacity 7s cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDelay: "2400ms",
          opacity: visible ? 0.11 : 0,
          // Flip so the outer helix curls toward the center and the canal
          // sits at the outside edge. Slightly stronger contrast so the
          // rim of the ear reads as a shape, not just mist.
          filter: "invert(1) grayscale(1) contrast(1.05) brightness(1)",
          transform: "scaleX(-1)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 62% at 60% 45%, black 25%, rgba(0,0,0,0.7) 60%, transparent 92%)",
          maskImage:
            "radial-gradient(ellipse 60% 62% at 60% 45%, black 25%, rgba(0,0,0,0.7) 60%, transparent 92%)",
        }}
      />
      {/* Eye — anchored in the lower-left corner, mirroring the ear in the
          upper-left so it sits in the blank space below the quote. */}
      <img
        src={eyeSketch}
        alt=""
        loading="lazy"
        width={1024}
        height={1024}
        className="sketch-breathe-eye hidden md:block"
        style={{
          ...baseImg,
          bottom: "clamp(-260px, -22vh, -120px)",
          left: "clamp(-340px, -18vw, -150px)",
          width: "clamp(640px, 50vw, 1020px)",
          transition: "opacity 8s cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDelay: "3400ms",
          opacity: visible ? 0.12 : 0,
          filter: "invert(1) grayscale(1) contrast(1.15) brightness(1.05)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, rgba(0,0,0,0.7) 65%, transparent 92%)",
          maskImage:
            "radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, rgba(0,0,0,0.7) 65%, transparent 92%)",
        }}
      />
    </div>
  );
}

function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-navy px-6 py-28 text-background md:px-12 md:py-40"
    >
      {/* warm editorial tint — subtle separation from surrounding sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 15% 20%, color-mix(in oklab, var(--accent-yellow) 10%, transparent) 0%, transparent 55%), radial-gradient(90% 70% at 85% 90%, color-mix(in oklab, var(--accent-purple) 8%, transparent) 0%, transparent 60%)",
        }}
      />
      {/* graphite anatomical sketches — anchored to the whole section so they can go huge */}
      <EditorialSketches />
      <div className="relative mx-auto max-w-[1400px]">
        <Reveal>
          <h2
            id="about-heading"
            className="text-right font-display text-[clamp(4rem,9vw,8rem)] uppercase leading-[0.82] tracking-[-0.055em] text-background"
          >
            About<span className="text-teal">.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-12 items-stretch gap-6 md:mt-16">
          <div className="col-span-12 flex flex-col justify-center md:col-span-4">
            <div className="relative">
              <figure className="relative border-l-2 border-teal pl-5">
                <span aria-hidden className="font-display text-6xl leading-none text-teal md:text-7xl">
                  “
                </span>
                <h2 className="mt-2 font-display text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                  One <span className="text-teal">ear</span> on the customer, one <span className="text-teal">eye</span>{" "}
                  on the business.
                </h2>
                <figcaption className="eyebrow mt-5 text-background/60">— Operating philosophy</figcaption>
              </figure>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="font-display text-xl leading-relaxed text-background/90 md:text-2xl">
                My path has been cumulative, not scattered. Frontline customer experience → leadership and operations →
                psychology → product and systems → AI and emerging technology. Each stage added a lens rather than changed
                 lanes. I often become the{" "}
                <span className="text-teal">interdepartmental translator</span>, following a problem across the
                boundaries where customer behavior, business operations, information, and technology meet — and turning
                what I find there into practical solutions.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-3xl text-base leading-loose text-background/75">
                My foundation in psychology and customer-facing leadership helps me understand people; my Master of
                Business and Science in Product Design &amp; Innovation at Rutgers University, expected December 2026,
                strengthens how I approach systems, research, service design, and AI. Together, those perspectives help
                me find the relationships behind a problem and turn complexity into clear, human-centered solutions.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-3xl text-base leading-loose text-background/75">
                I approach product and service design through a systems-complexity lens. Whether analyzing behavioral
                patterns, cross-functional dependencies, or operational bottlenecks, I look for the underlying structures
                that dictate how information and people actually move through a system. My curiosity outside work — about
                human consciousness, philosophy, physics, and unexpected patterns across disciplines — keeps me asking
                better questions and finding connections others miss.
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-background/20 pt-10 md:grid-cols-4">
              {[
                {
                  header: "Strategy",
                  items: ["Discovery", "Positioning", "VOC", "Opportunity Mapping"],
                },
                {
                  header: "Experience",
                  items: ["Journey Mapping", "Service Design", "Research Synthesis", "User Insights"],
                },
                {
                  header: "Solutions",
                  items: ["Product Design", "AI Workflows", "Process Design", "Prototyping"],
                },
                {
                  header: "Communication",
                  items: ["Product Education", "Content Systems", "Enablement", "Brand Experience"],
                },
              ].map(({ header, items }) => (
                <div key={header}>
                  <div className="font-display text-lg">{header}</div>
                  <ul className="mt-2 space-y-1">
                    {items.map((item) => (
                      <li key={item} className="eyebrow text-background/60">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const experienceLetters = [
  { letter: "E", startSlot: 1, y: -18, rotate: -8 },
  { letter: "X", startSlot: 3, y: 14, rotate: 7 },
  { letter: "P", startSlot: 0, y: -8, rotate: -5 },
  { letter: "E", startSlot: 5, y: 20, rotate: 8 },
  { letter: "R", startSlot: 2, y: -16, rotate: 5 },
  { letter: "I", startSlot: 4, y: 10, rotate: -7 },
  { letter: "E", startSlot: 8, y: -12, rotate: 6 },
  { letter: "N", startSlot: 7, y: 17, rotate: -4 },
  { letter: "C", startSlot: 6, y: -7, rotate: 8 },
  { letter: "E", startSlot: 9, y: 12, rotate: -6 },
];

function ExperienceHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setAssembled(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAssembled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-b border-border pb-10 md:pb-12">
      <h2
        id="experience-heading"
        aria-label="Experience"
        className="grid grid-cols-10 overflow-hidden font-display text-[clamp(1.85rem,8vw,7rem)] font-medium uppercase leading-[0.86] tracking-[-0.06em]"
      >
        {experienceLetters.map(({ letter, startSlot, y, rotate }, index) => (
          <span
            key={`${letter}-${index}`}
            aria-hidden="true"
            className="block text-center text-foreground motion-reduce:transform-none motion-reduce:transition-none"
            style={{
              opacity: assembled ? 1 : 0.58,
              transform: assembled
                ? "translate3d(0, 0, 0) rotate(0deg)"
                : `translate3d(${(startSlot - index) * 100}%, ${y}px, 0) rotate(${rotate}deg)`,
              transition:
                "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",
              transitionDelay: assembled ? `${index * 28}ms` : "0ms",
              willChange: "transform, opacity",
            }}
          >
            {letter}
          </span>
        ))}
      </h2>

      <p
        className={`mx-auto mt-8 max-w-3xl text-center font-display text-base leading-relaxed transition-all duration-700 md:mt-10 md:text-lg lg:text-xl ${
          assembled ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`}
        style={{ transitionDelay: assembled ? "720ms" : "0ms" }}
      >
        Across roles, the pattern has stayed consistent: I follow problems beyond the department where they first
        appear. What may begin as a customer issue often reveals a workflow, information, training, or system-design
        problem. <span className="italic text-teal">Each role added another lens</span> for understanding those
        connections and turning them into practical improvements<span className="text-accent">.</span>
      </p>
    </div>
  );
}

function Resume() {
  const roles = [
    {
      year: "May 2025 — June 2026",
      role: "Product Specialist & Marketing Coordinator",
      org: "Magic Sleek · Manalapan, NJ",
      detail:
        "Bridged customer insight, brand strategy, and digital operations through educational content, social and email, trade show execution, Tableau/GA4 reporting, and an AI-powered internal knowledge assistant.",
    },
    {
      year: "Jan — May 2025",
      role: "Product Design Extern · MissTeePRO",
      org: "Rutgers MBS Externship",
      detail:
        "Competitive and ingredient research for professional haircare; built an Airtable research library and synthesized findings into product roadmap recommendations.",
    },
    {
      year: "2024 — Expected Dec 2026",
      role: "MBS, Product Design & Innovation",
      org: "Rutgers University · GPA 3.7",
      detail:
        "UX research, prototyping, and service design across Figma, Miro, and Adobe — paired with applied client and academic briefs. Earned UX Design Certificate and Google Analytics Certification.",
    },
    {
      year: "2018 — 2024",
      role: "Branch Manager → Hairstylist / Cosmetologist",
      org: "G&C Robins Co. / Supercuts · The Art of Hair",
      detail:
        "Led daily operations, staff, and CX in a high-volume retail environment, growing monthly location sales from roughly $4–5K to more than $20K while improving retention through outreach, CRM, and service improvements.",
    },
    {
      year: "2021 — 2023",
      role: "B.A. Psychology, Minor in Sociology",
      org: "Rutgers University",
      detail:
        "Foundation in human behavior, research methods, and qualitative analysis — the lens behind every project that follows.",
    },
  ];
  const tools = [
    "Figma",
    "Miro",
    "Canva",
    "Adobe Creative Cloud",
    "CapCut",
    "Tableau",
    "GA4",
    "Search Console",
    "Salesforce",
    "Airtable",
    "Notion",
    "Shopify",
    "WordPress",
    "Webflow",
    "Meta Business Suite",
    "ChatGPT",
    "Gemini",
    "ElevenLabs",
  ];
  const skills = [
    "Product & Experience Strategy",
    "Customer Insights & Research Synthesis",
    "Service & Process Design",
    "Information Architecture",
    "Product Education & Enablement",
    "AI-Assisted Knowledge Systems",
    "Cross-Functional Operations",
    "Multichannel Content Strategy",
    "Systems Thinking",
  ];
  return (
    <section id="resume" aria-labelledby="experience-heading" className="px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <ExperienceHeading />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <ol className="divide-y divide-border">
              {roles.map((r, i) => (
                <Reveal key={r.role} delay={i * 80}>
                  <li className="grid grid-cols-12 gap-6 py-8">
                    <div className="col-span-12 md:col-span-3">
                      <span className="eyebrow">{r.year}</span>
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <h3 className="font-display text-2xl tracking-tight md:text-3xl">{r.role}</h3>
                      <div className="eyebrow mt-1">{r.org}</div>
                      <p className="mt-3 max-w-lg text-base text-muted-foreground">{r.detail}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <aside className="col-span-12 md:col-span-3 md:col-start-10">
            <div className="rule-top pt-6">
              <span className="eyebrow">Skills</span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills.map((t) => (
                  <li
                    key={t}
                    className="eyebrow rounded-full border border-border px-3 py-1 transition-all duration-300 hover:border-teal hover:text-teal hover:-translate-y-0.5"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rule-top mt-10 pt-6">
              <span className="eyebrow">Toolkit</span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tools.map((t) => (
                  <li
                    key={t}
                    className="eyebrow rounded-full border border-border px-3 py-1 transition-all duration-300 hover:border-teal hover:text-teal hover:-translate-y-0.5"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={resumePdf.url}
              download="Danielle_Bosworth_CX_Product_Design_Operations_Resume.pdf"
              className="eyebrow mt-10 inline-flex items-center gap-2 rounded-full border-2 border-teal bg-teal px-4 py-2 text-background transition-colors hover:bg-transparent hover:text-teal"
            >
              ↓ Download résumé (PDF)
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 border-b border-teal pb-5 md:col-span-2 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <h2
              id="contact-heading"
              aria-label="Contact"
              className="font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.78] tracking-[-0.055em]"
            >
              <span className="md:hidden">Contact<span className="text-teal">.</span></span>
              <span aria-hidden className="hidden md:flex md:flex-col md:items-center md:gap-1">
                {"CONTACT".split("").map((letter, index) => (
                  <span key={`${letter}-${index}`} className={index === 6 ? "text-teal" : undefined}>
                    {letter}
                  </span>
                ))}
              </span>
            </h2>
          </div>

          <div className="col-span-12 md:col-span-10">
            <Reveal>
              <div className="inline-block">
                <h3 className="font-handwriting text-[clamp(4.5rem,10vw,8.5rem)] font-medium leading-[0.82] tracking-[-0.035em] text-teal">
                  Let&apos;s connect.
                </h3>
                <span aria-hidden className="mt-3 block h-px w-full origin-left bg-teal" />
              </div>
              <p className="mt-7 max-w-3xl font-display text-xl leading-relaxed text-foreground md:text-2xl">
                Have a problem that doesn&apos;t fit neatly inside one department? Those are usually the ones I&apos;m
                most interested in.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:items-stretch md:gap-20">
              <div className="flex h-full flex-col gap-10">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:contact.madebydanielleb@gmail.com"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-teal bg-teal px-5 py-2.5 text-background transition-colors hover:bg-transparent hover:text-teal"
                  >
                    Email me →
                  </a>
                  <a
                    href="https://linkedin.com/in/daniellelbosworth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border-2 border-teal bg-teal px-5 py-2.5 text-background transition-colors hover:bg-transparent hover:text-teal"
                  >
                    LinkedIn →
                  </a>
                </div>
                <div>
                  <span className="eyebrow">Looking for</span>
                  <ul className="mt-4 flex flex-col gap-3 font-display text-lg sm:text-xl">
                    {[
                      "Roles at the intersection of product strategy, AI-enabled systems, and customer experience.",
                      "Adjacent directions: solutions consulting, innovation, implementation.",
                    ].map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
                      >
                        <span className="text-2xl leading-none text-teal">›</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="eyebrow">Based in</span>
                  <p className="mt-3 font-display text-lg sm:text-xl">
                    New Jersey<span className="text-teal">.</span>{" "}
                    <span className="text-muted-foreground">
                      Open to onsite roles in central NJ, or remote anywhere.
                    </span>
                  </p>
                  <p className="mt-4 inline-block rounded-full border border-teal px-3 py-1 text-xs uppercase tracking-[0.18em] text-teal">
                    Full-time · Contract · Part-time
                  </p>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

type SendStatus = "idle" | "sending" | "sent" | "error";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (company) return; // bot
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0];
        if (typeof k === "string" && !fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    setErrorMsg(null);
    const { name, email, phone, message } = parsed.data;
    try {
      const res = await fetch("https://formspree.io/f/maqrodpe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: phone && phone.length > 0 ? phone : "",
          message,
        }),
      });
      if (!res.ok) throw new Error(`Formspree ${res.status}`);
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("formspree submit failed", err);
      setStatus("error");
      setErrorMsg("Something went wrong sending your message. You can email me directly instead.");
    }
  }

  const inputCls =
    "mt-2 w-full border-b border-border bg-transparent py-2 font-display text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-teal focus:outline-none focus-visible:border-teal";

  return (
    <form onSubmit={onSubmit} className="flex h-full flex-col gap-8 border-l-0 md:border-l-2 md:border-teal md:pl-8">
      <div>
        <span className="eyebrow">Send a message</span>
        <p className="mt-2 text-sm text-muted-foreground">Drop me a line here — messages land straight in my inbox.</p>
      </div>

      {/* honeypot: hidden from users, catches bots */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      <div className="space-y-5">
        <div>
          <label className="eyebrow" htmlFor="cf-name">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={100}
            className={inputCls}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-accent">{errors.name}</p>}
        </div>

        <div>
          <label className="eyebrow" htmlFor="cf-email">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={255}
            className={inputCls}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-xs text-accent">{errors.email}</p>}
        </div>

        <div>
          <label className="eyebrow" htmlFor="cf-phone">
            Phone <span className="text-muted-foreground/60">(optional)</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            maxLength={40}
            className={inputCls}
            placeholder="(555) 555-5555"
          />
        </div>

        <div>
          <label className="eyebrow" htmlFor="cf-message">
            Message
          </label>
          <textarea
            id="cf-message"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            maxLength={2000}
            rows={5}
            className={inputCls + " resize-y"}
            placeholder="Tell me a bit about the role or project…"
          />
          {errors.message && <p className="mt-1 text-xs text-accent">{errors.message}</p>}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="eyebrow inline-flex items-center gap-2 rounded-full border-2 border-teal bg-teal px-5 py-2 text-background transition-all duration-300 hover:bg-transparent hover:text-teal hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-wait"
        >
          {status === "sending" ? "Sending…" : "Send message →"}
        </button>

        {status === "sent" && (
          <p className="rise-in mt-3 text-sm text-teal">Thanks — your message is on its way. I'll get back to you soon.</p>
        )}
        {status === "error" && errorMsg && (
          <p className="mt-3 text-sm text-accent">
            {errorMsg}{" "}
            <a href="mailto:contact.madebydanielleb@gmail.com" className="text-teal link-underline">
              Email me directly
            </a>
          </p>
        )}
      </div>
    </form>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="eyebrow">© {new Date().getFullYear()} Danielle Bosworth</span>
        <span className="eyebrow">Designed with intention</span>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border-2 border-teal bg-charcoal text-background shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-teal ${
        show ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <span aria-hidden className="font-display text-xl leading-none">
        ↑
      </span>
    </button>
  );
}
