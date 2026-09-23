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
import howIWorkGraphic from "@/assets/how-i-work-typographic.png.asset.json";
import { caseStudies } from "@/lib/case-studies";
import { supabase } from "@/integrations/supabase/client";
const portraitUrl = "/home/portrait.svg";
import resumePdf from "@/assets/resume.pdf.asset.json";

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
  return (
    <section aria-labelledby="how-i-work-heading" className="border-b border-border px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 items-stretch gap-8 md:gap-10 lg:gap-14">
          <Reveal className="col-span-12 md:col-span-4 lg:col-span-3">
            <div aria-hidden className="@container aspect-square overflow-hidden bg-charcoal">
              <img
                src={howIWorkGraphic.url}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-8 lg:col-span-9" delay={100}>
            <div className="flex h-full flex-col justify-center">
              <h2 id="how-i-work-heading" className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
                I notice things<span className="text-accent">.</span>
              </h2>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I get curious about why something works the way it does. If something doesn't make sense, I usually
                can't leave it alone. I end up following the problem across departments, systems, customer behavior,
                technology, whatever it touches.
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                I don't really care what category the problem belongs to. I want to understand why it's happening.
              </p>
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
      className="border-b border-border bg-charcoal px-6 py-14 text-background md:px-12 md:py-16"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
            <h2 id="commercial-impact-heading" className="font-mono text-[clamp(2rem,4vw,3.25rem)] lowercase leading-none text-background/70">
              impact<span aria-hidden className="text-teal">_</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-3">
          {commercialImpact.map((item) => (
            <div
              key={item.index}
              className="grid grid-cols-[7rem_minmax(0,1fr)] items-baseline gap-5 sm:flex sm:grid-cols-none sm:gap-4"
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

function ProjectsBlueprint() {
  const ref = useRef<HTMLDivElement>(null);
  const [built, setBuilt] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setBuilt(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBuilt(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const gridX = [115, 205, 295, 385, 475, 565, 655];
  const ticks = [70, 160, 250, 340, 430, 520, 610, 700];
  return (
    <div ref={ref} aria-hidden className="w-full overflow-hidden">
      <svg viewBox="0 0 780 210" className="block h-auto w-full" role="presentation">
        <g fill="none" stroke="var(--teal)" strokeWidth="1" opacity="0.38">
          {gridX.map((x, index) => <line key={x} x1={x} y1="52" x2={x} y2="172" strokeDasharray="140" style={{ strokeDashoffset: built ? 0 : 140, transition: `stroke-dashoffset 650ms ease ${index * 45}ms` }} />)}
          {[72, 112, 152].map((y, index) => <line key={y} x1="48" y1={y} x2="732" y2={y} strokeDasharray="720" style={{ strokeDashoffset: built ? 0 : 720, transition: `stroke-dashoffset 850ms ease ${120 + index * 70}ms` }} />)}
        </g>
        <g fill="none" stroke="var(--teal)" strokeWidth="1.5">
          <line x1="48" y1="30" x2="732" y2="30" strokeDasharray="700" style={{ strokeDashoffset: built ? 0 : 700, transition: "stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
          <line x1="48" y1="20" x2="48" y2="42" /><line x1="732" y1="20" x2="732" y2="42" />
          <line x1="30" y1="52" x2="30" y2="172" strokeDasharray="140" style={{ strokeDashoffset: built ? 0 : 140, transition: "stroke-dashoffset 650ms ease 180ms" }} />
          <line x1="20" y1="52" x2="42" y2="52" /><line x1="20" y1="172" x2="42" y2="172" />
          {ticks.map((x) => <line key={x} x1={x} y1="24" x2={x} y2="36" />)}
        </g>
        <g fill="var(--teal)" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="2" style={{ opacity: built ? 0.72 : 0, transition: "opacity 500ms ease 450ms" }}>
          <text x="374" y="18">SYSTEM 01</text><text x="3" y="116" transform="rotate(-90 3 116)">120</text>
          {["80", "70", "90", "80", "70", "90", "80", "90"].map((label, index) => <text key={`${label}-${index}`} x={ticks[index] - 8} y="198">{label}</text>)}
        </g>
        <text x="55" y="158" fill="transparent" stroke="var(--teal)" strokeWidth="1.5" fontFamily="var(--font-display)" fontSize="119" fontWeight="400" letterSpacing="-5" style={{ opacity: built ? 1 : 0, transition: "opacity 450ms ease 260ms" }}>PROJECTS</text>
        <text x="55" y="158" fill="var(--foreground)" fontFamily="var(--font-display)" fontSize="119" fontWeight="400" letterSpacing="-5" style={{ opacity: built ? 0.1 : 0, transition: "opacity 850ms ease 850ms" }}>PROJECTS</text>
      </svg>
    </div>
  );
}

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
    <section id="work" aria-labelledby="selected-projects-heading" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex justify-center border-b border-border pb-10">
          <ProjectsBlueprint />
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
        <h3 className="font-mono text-[clamp(2.25rem,5vw,4.5rem)] lowercase leading-none text-foreground">
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

// Career words that first read as an unrelated scatter, then settle onto a
// single line — the realization that the problems, not the industries, were
// the common thread.
const challengePhrases = [
  "A problem to solve",
  "A skill to master",
  "A process to perfect",
  "A system to improve",
  "An experience to design",
];

// Different kinds of challenges pass through focus as the visitor scrolls;
// the motivation underneath them — "Give me something to figure out." — is
// present from the start, quiet at first, and never leaves.
function ChallengeFocus() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [stacked, setStacked] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setStacked(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setProgress(1);
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // start later in the scroll (block must climb to ~55% of the viewport)
      // and stretch the cycle so every phrase gets time on screen
      const raw = (vh * 0.55 - rect.top) / (rect.height * 0.6 + vh * 0.3);
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const ease = progress * progress * (3 - 2 * progress);
  const count = challengePhrases.length;
  // the moving focus position across the phrase sequence
  const focus = ease * (count - 1);

  const persistent = (
    <p
      className="font-display text-2xl leading-[1.25] text-background md:text-4xl"
      style={
        reduced
          ? undefined
          : {
              opacity: 0.35 + ease * 0.65,
              transform: `translateY(${(1 - Math.min(1, ease * 1.4)) * 10}px)`,
            }
      }
    >
      Give me something to <span className="text-teal">figure out.</span>
    </p>
  );

  if (reduced) {
    return (
      <div ref={ref} className="relative mt-14 md:mt-16">
        <ul className="space-y-2 border-l-2 border-teal/40 pl-6">
          {challengePhrases.map((phrase) => (
            <li key={phrase} className="font-display text-xl uppercase tracking-wide text-background md:text-2xl">
              {phrase}
            </li>
          ))}
        </ul>
        <div className="mt-10">{persistent}</div>
      </div>
    );
  }

  if (stacked) {
    // staged mobile version: phrases step in one after another, no hover
    return (
      <div ref={ref} className="relative mt-14">
        <div aria-hidden className="absolute left-0 top-1 h-[calc(100%-5.5rem)] w-px bg-teal/30" />
        <ul className="space-y-7 pl-7">
          {challengePhrases.map((phrase, index) => {
            const appear = Math.min(1, Math.max(0, (ease * (count + 0.5) - index) / 0.9));
            const active = Math.max(0, 1 - Math.abs(focus - index));
            return (
              <li
                key={phrase}
                className="relative font-display text-2xl uppercase leading-tight"
                style={{
                  opacity: 0.15 + appear * 0.85,
                  color: active > 0.5 ? "var(--teal)" : "var(--background)",
                  transform: `translateX(${(1 - appear) * 14}px)`,
                  transition: "color 300ms linear",
                }}
              >
                <span
                  aria-hidden
                  className="absolute -left-7 top-[0.55em] h-px bg-teal"
                  style={{ width: `${appear * 16}px`, opacity: appear * 0.8 }}
                />
                {phrase}
              </li>
            );
          })}
        </ul>
        <div className="mt-10 pl-7">{persistent}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative mt-16">
      {/* one challenge sharpens into focus while the others recede as ghosts */}
      <div className="relative h-[13rem] w-full md:h-[15rem]">
        {challengePhrases.map((phrase, index) => {
          const distance = focus - index;
          const sharpness = Math.max(0, 1 - Math.abs(distance));
          return (
            <span
              key={phrase}
              aria-hidden={sharpness < 0.25}
              className="absolute left-0 top-1/2 whitespace-nowrap font-display uppercase leading-none text-background"
              style={{
                transform: `translateY(calc(-50% + ${distance * -1.6}rem)) scale(${0.92 + sharpness * 0.08})`,
                opacity: 0.08 + sharpness * 0.92,
                filter: `blur(${(1 - sharpness) * 2.5}px)`,
                letterSpacing: `${0.14 - sharpness * 0.1}em`,
                fontSize: `clamp(1.6rem, ${3 + sharpness * 1.4}vw, 4.4rem)`,
                color: sharpness > 0.6 ? "var(--teal)" : "var(--background)",
                transition: "color 300ms linear",
                willChange: "transform, opacity, filter",
              }}
            >
              {phrase}
            </span>
          );
        })}
        {/* teal tick marking the current focus */}
        <div
          aria-hidden
          className="absolute bottom-2 left-0 h-px bg-teal"
          style={{ width: `${(ease * 100).toFixed(2)}%`, opacity: 0.7 }}
        />
      </div>
      <div className="mt-8">{persistent}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative overflow-hidden bg-navy px-6 pt-24 pb-12 text-background md:px-12 md:pt-28 md:pb-14">
      {/* warm editorial tint — subtle separation from surrounding sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 15% 20%, color-mix(in oklab, var(--accent-yellow) 10%, transparent) 0%, transparent 55%), radial-gradient(90% 70% at 85% 90%, color-mix(in oklab, var(--accent-purple) 8%, transparent) 0%, transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-8 md:gap-x-10 md:gap-y-6">
          <div className="col-span-12 md:col-span-7 md:row-start-1">
            <Reveal>
              <p className="max-w-3xl font-display text-xl leading-relaxed text-background/90 md:text-lg">
                For a long time, I thought my career was a strange mix of unrelated things. I&rsquo;ve worked in
                salons, managed teams, worked with customers and distributors, built marketing, studied psychology and
                product design, and somehow ended up learning how AI systems work because I had an idea I
                couldn&rsquo;t leave alone.
              </p>
            </Reveal>
          </div>

          <Reveal className="col-span-12 self-center md:col-span-5 md:col-start-8 md:row-start-1">
            <h2 id="about-heading" className="text-right font-display text-[clamp(4.5rem,10.5vw,9.5rem)] uppercase leading-[0.82] text-background">About<span className="text-teal">.</span></h2>
          </Reveal>

          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <div className="space-y-4 text-[17px] leading-loose text-background/75 md:space-y-5 md:text-[15px] md:leading-relaxed">
                <p>Eventually, I realized I was looking for the connection in the wrong place.</p>
                <p>It wasn&rsquo;t the industry or the job title that mattered.</p>
                <p>It was what the work asked me to do.</p>
                <p>
                  I like being challenged. It could be a problem to solve, a skill to master, a process to perfect, a
                  system to improve, or an experience to design. That&rsquo;s what drives me.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-10">
            <Reveal delay={120}>
                <p className="text-center font-display text-xl leading-snug text-background md:text-2xl md:leading-snug">
                I want to <span className="text-teal">understand</span> it inside and out. I want to <span className="text-teal">learn</span> everything I can, <span className="text-teal">immerse</span> myself in it, and
                figure out how to make something <span className="text-teal">better</span> than it was before.
              </p>
            </Reveal>
          </div>

        </div>

        <ChallengeFocus />

      </div>
    </section>
  );
}

const experienceLetters = [
  { letter: "E", startSlot: 1, y: -18, rotate: -8 }, { letter: "X", startSlot: 3, y: 14, rotate: 7 },
  { letter: "P", startSlot: 0, y: -8, rotate: -5 }, { letter: "E", startSlot: 5, y: 20, rotate: 8 },
  { letter: "R", startSlot: 2, y: -16, rotate: 5 }, { letter: "I", startSlot: 4, y: 10, rotate: -7 },
  { letter: "E", startSlot: 8, y: -12, rotate: 6 }, { letter: "N", startSlot: 7, y: 17, rotate: -4 },
  { letter: "C", startSlot: 6, y: -7, rotate: 8 }, { letter: "E", startSlot: 9, y: 12, rotate: -6 },
];

function ExperienceHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setAssembled(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAssembled(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="border-b border-border pb-10 md:pb-12">
      <h2 id="experience-heading" aria-label="Experience" className="grid grid-cols-10 overflow-hidden font-display text-[clamp(1.85rem,8vw,7rem)] font-medium uppercase leading-[0.86]">
        {experienceLetters.map(({ letter, startSlot, y, rotate }, index) => (
          <span key={`${letter}-${index}`} aria-hidden="true" className="block text-center text-foreground motion-reduce:transform-none motion-reduce:transition-none" style={{ opacity: assembled ? 1 : 0.58, transform: assembled ? "translate3d(0, 0, 0) rotate(0deg)" : `translate3d(${(startSlot - index) * 100}%, ${y}px, 0) rotate(${rotate}deg)`, transition: "transform 1000ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease", transitionDelay: assembled ? `${index * 28}ms` : "0ms", willChange: "transform, opacity" }}>{letter}</span>
        ))}
      </h2>
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
  return (
    <section id="resume" aria-labelledby="experience-heading" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <ExperienceHeading />

        <Reveal>
          <div className="mt-12 flex flex-col items-center text-center">
            <h3 className="font-display text-2xl tracking-tight md:text-3xl">This is how I got here.</h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Different industries, different roles, different problems. Each one gave me something new to learn and
              another challenge to figure out.
            </p>
            <a
              href={resumePdf.url}
              download="Danielle_Bosworth_CX_Product_Design_Operations_Resume.pdf"
              className="eyebrow mt-10 inline-flex items-center gap-2 rounded-full border-2 border-teal bg-teal px-4 py-2 text-background transition-colors hover:bg-transparent hover:text-teal"
            >
              ↓ Download résumé (PDF)
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
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
        </div>

      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-border px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10">
          <div className="col-span-12 border-b border-teal pb-5 md:col-span-2 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <h2 id="contact-heading" aria-label="Contact" className="font-display text-[clamp(3rem,6vw,5.5rem)] uppercase leading-[0.78]">
              <span className="md:hidden">Contact<span className="text-teal">.</span></span>
              <span aria-hidden className="hidden md:flex md:flex-col md:items-center md:gap-1">
                {"CONTACT".split("").map((letter, index) => <span key={`${letter}-${index}`} className={index === 6 ? "text-teal" : undefined}>{letter}</span>)}
              </span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-10">
            <Reveal>
              <div className="inline-block"><h3 className="font-handwriting text-[clamp(4.5rem,10vw,8.5rem)] font-medium leading-[0.82] text-teal">Let&apos;s connect.</h3><span aria-hidden className="mt-3 block h-px w-full origin-left bg-teal" /></div>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 md:items-stretch">
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
