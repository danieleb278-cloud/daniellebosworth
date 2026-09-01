import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { SiteNav } from "@/components/site-nav";
import { ConnectionHero } from "@/components/connection-hero";
import { Reveal } from "@/components/reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { PlaceholderImage } from "@/components/placeholder-image";
import { caseStudies } from "@/lib/case-studies";
import { supabase } from "@/integrations/supabase/client";
const portraitUrl = "/home/portrait.svg";
import resumePdf from "@/assets/resume.pdf.asset.json";
import earSketch from "@/assets/editorial/ear-sketch.png";
import eyeSketch from "@/assets/editorial/eye-sketch.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Danielle Bosworth — Research, Strategy & Customer Experience" },
      {
        name: "description",
        content:
          "Portfolio of Danielle Bosworth: understanding human behavior and translating customer insight into business action through research, strategy, and design.",
      },
      { property: "og:title", content: "Danielle Bosworth — Research, Strategy & Customer Experience" },
      {
        property: "og:description",
        content:
          "Portfolio of Danielle Bosworth: understanding human behavior and translating customer insight into business action through research, strategy, and design.",
      },
      { property: "og:url", content: "https://daniellebosworth.lovable.app/" },
      { property: "og:image", content: `https://daniellebosworth.lovable.app${portraitUrl}` },
      { property: "og:image:alt", content: "Portrait of Danielle Bosworth" },
      { name: "twitter:image", content: `https://daniellebosworth.lovable.app${portraitUrl}` },
      { name: "twitter:title", content: "Danielle Bosworth — Research, Strategy & Customer Experience" },
      { name: "twitter:description", content: "Portfolio of Danielle Bosworth: understanding human behavior and translating customer insight into business action through research, strategy, and design." },
    ],
    links: [{ rel: "canonical", href: "https://daniellebosworth.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Danielle Bosworth",
          url: "https://daniellebosworth.lovable.app/",
          description:
            "Portfolio of Danielle Bosworth: research, strategy, and customer experience design.",
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
  robin: {
    connection:
      "A client-driven product/design engagement: Robin focused on understanding the existing job-search workflow — discovery, applications, resumes, interviews, and contacts — then validating UX improvements against real stakeholder requirements.",
    evidence:
      "Contextual inquiry, journey mapping, usability evaluation, and click-through testing informed recommendations presented to the client.",
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
      <CommercialImpact />
      <Work />
      <About />
      <Resume />
      <Contact />
      <Footer />
      <BackToTop />
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
  const [fieldCaseOpen, setFieldCaseOpen] = useState(false);

  function toggleFieldCase() {
    const nextOpen = !fieldCaseOpen;
    setFieldCaseOpen(nextOpen);
    if (nextOpen) {
      window.setTimeout(() => {
        document.getElementById("magic-sleek-field-case")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  }

  return (
    <section
      aria-labelledby="commercial-impact-heading"
      className="border-b border-border bg-charcoal px-6 py-24 text-background md:px-12 md:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="grid grid-cols-12 gap-6 border-b border-background/20 pb-8">
            <span className="eyebrow col-span-12 text-teal md:col-span-2">§ Commercial Impact</span>
            <h2
              id="commercial-impact-heading"
              className="col-span-12 max-w-5xl font-display text-4xl tracking-tight md:col-span-10 md:text-6xl"
            >
              <span className="block">Cross-functional work.</span>
              <span className="block italic text-background/60">
                Real business impact<span className="text-accent">.</span>
              </span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-background/20 bg-background/20 lg:grid-cols-3">
          {commercialImpact.map((item, i) => (
            <Reveal key={item.index} delay={i * 100}>
              <article className="group flex h-full flex-col bg-charcoal p-7 transition-colors duration-500 hover:bg-navy md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="eyebrow max-w-[18rem] text-teal">{item.category}</span>
                  <span className="font-mono text-xs text-background/40">{item.index} / 03</span>
                </div>

                <div className="mt-12">
                  <div className="font-display text-[clamp(2.7rem,5vw,5.25rem)] leading-[0.9] tracking-[-0.04em] text-background transition-transform duration-500 group-hover:-translate-y-1">
                    {item.outcome}
                  </div>
                  <div className="eyebrow mt-3 text-background/60">{item.outcomeLabel}</div>
                </div>

                <div className="mt-10 border-t border-background/20 pt-6">
                  <p className="font-display text-lg text-background">{item.context}</p>
                  <p className="mt-4 text-sm leading-relaxed text-background/70 md:text-base">{item.description}</p>
                </div>

                <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label="Related capabilities">
                  {item.tags.map((tag) => (
                    <li key={tag} className="eyebrow rounded-full border border-background/25 px-3 py-1 text-background/65">
                      {tag}
                    </li>
                  ))}
                </ul>

                {item.featuredCase && (
                  <button
                    type="button"
                    onClick={toggleFieldCase}
                    aria-expanded={fieldCaseOpen}
                    aria-controls="magic-sleek-field-case"
                    className="eyebrow arrow-slide mt-8 inline-flex w-fit items-center gap-2 text-teal link-underline"
                  >
                    {fieldCaseOpen ? "Close featured field case" : "View featured field case"}
                    <span className="arrow" aria-hidden>{fieldCaseOpen ? "↑" : "↓"}</span>
                  </button>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <MagicSleekFieldCase open={fieldCaseOpen} onToggle={toggleFieldCase} />
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
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <section
      id="magic-sleek-field-case"
      aria-labelledby="magic-sleek-case-heading"
      className="scroll-mt-24 mt-12 border border-background/20"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls="magic-sleek-case-content"
        className="group grid w-full grid-cols-12 gap-6 p-6 text-left transition-colors hover:bg-navy/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal md:p-9"
      >
        <div className="col-span-12 md:col-span-3">
          <span className="eyebrow text-teal">§ Featured Field Case</span>
          <span className="mt-3 block font-mono text-xs uppercase tracking-[0.16em] text-background/45">
            Magic Sleek · B2B partner expansion
          </span>
        </div>
        <div className="col-span-10 md:col-span-7">
          <h3
            id="magic-sleek-case-heading"
            className="font-display text-3xl leading-[1.05] tracking-tight text-background md:text-4xl"
          >
            Building the system behind a{" "}
            <span className="italic text-teal">~$56K distributor launch</span>
            <span className="text-accent">.</span>
          </h3>
        </div>
        <div className="col-span-2 flex items-center justify-end md:col-span-2">
          <span
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full border border-teal font-display text-2xl text-teal transition-transform duration-300 group-hover:scale-105"
          >
            {open ? "−" : "+"}
          </span>
          <span className="sr-only">{open ? "Close case study" : "Open case study"}</span>
        </div>
      </button>

      {open && (
        <div id="magic-sleek-case-content" className="border-t border-background/20 px-6 pb-12 pt-12 md:px-9 md:pb-16">
          <Reveal>
            <p className="max-w-4xl font-display text-2xl leading-relaxed text-background/90 md:text-3xl">
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
              onClick={onToggle}
              className="eyebrow shrink-0 text-teal link-underline"
            >
              Close case ↑
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="mb-16 grid grid-cols-12 gap-6 border-b border-border pb-8">
            <span className="eyebrow col-span-12 md:col-span-2">§ Selected Projects</span>
            <h2 className="col-span-12 font-display text-4xl tracking-tight md:col-span-10 md:text-6xl">
              Five projects on UX research, product design, and
              <span className="italic text-muted-foreground"> system-level thinking</span>
              <span className="text-accent">.</span>
            </h2>
          </div>
        </Reveal>

        <div className="divide-y divide-border">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 100}>
              <Link to="/work/$slug" params={{ slug: cs.slug }} className="group block py-10 md:py-14">
                <div className="grid grid-cols-12 gap-6 md:items-center md:gap-10">
                  {/* Image */}
                  <div className="col-span-12 md:col-span-5 md:order-2">
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
                  <div className="col-span-12 md:col-span-7 md:order-1">
                    <span className="font-mono text-sm text-muted-foreground">
                      {cs.index} / {String(caseStudies.length).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 font-display text-3xl tracking-tight transition-transform duration-500 group-hover:-translate-y-1 md:text-5xl">
                      {cs.title}
                      <span className="text-teal">.</span>
                    </h3>
                    <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">{cs.subtitle}</p>
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
      </div>
    </section>
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
    <section id="about" className="relative overflow-hidden bg-navy px-6 py-28 text-background md:px-12 md:py-40">
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
        <div className="grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-12 md:col-span-4 flex flex-col justify-center">
            <span className="eyebrow text-background/60">§ About</span>
            <div className="relative mt-6">
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
                lanes. I think of myself as an{" "}
                <span className="text-teal">interdepartmental translator</span>: turning research into product decisions,
                technical concepts into customer-facing experiences, disconnected processes into optimized workflows,
                and business goals into practical solutions.
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
        "Led daily operations, staff, and CX in a high-volume retail environment — drove ~175% revenue growth and +32% retention through outreach, CRM, and service-design improvements.",
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
    <section id="resume" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 border-b border-border pb-8">
          <span className="eyebrow">§ Experience</span>
        </div>

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
    <section id="contact" className="border-t border-border px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6">
          <span className="eyebrow col-span-12 md:col-span-2">§ Contact</span>
          <div className="col-span-12 md:col-span-10">
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]">
                Let's bridge design, strategy, <span className="italic text-muted-foreground">and experience</span>
                <span className="text-accent">.</span>
              </h2>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
              <div className="flex flex-col gap-8">
                <div>
                  <span className="eyebrow">Email</span>
                  <a
                    href="mailto:Danieleb278@gmail.com"
                    className="mt-2 block break-all font-display text-xl link-underline sm:text-2xl"
                  >
                    Danieleb278@gmail.com
                  </a>
                </div>
                <div>
                  <span className="eyebrow">LinkedIn</span>
                  <a
                    href="https://linkedin.com/in/daniellelbosworth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block break-all font-display text-xl link-underline sm:text-2xl"
                  >
                    /in/daniellelbosworth
                  </a>
                </div>
                <div>
                  <span className="eyebrow">Looking for</span>
                  <ul className="mt-3 flex flex-col gap-2 font-display text-lg sm:text-xl">
                    {[
                      "Roles at the intersection of product strategy, AI-enabled systems, and customer experience.",
                      "Adjacent directions: solutions consulting, innovation, implementation.",
                    ].map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
                      >
                        <span className="text-teal">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="eyebrow">Based in</span>
                  <p className="mt-2 font-display text-lg sm:text-xl">
                    New Jersey<span className="text-teal">.</span>{" "}
                    <span className="text-muted-foreground">
                      Open to onsite roles in central NJ, or remote anywhere.
                    </span>
                  </p>
                  <p className="mt-3 inline-block rounded-full border border-teal px-3 py-1 text-xs uppercase tracking-[0.18em] text-teal">
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
    <form onSubmit={onSubmit} className="border-l-0 md:border-l-2 md:border-teal md:pl-8">
      <span className="eyebrow">Send a message</span>
      <p className="mt-2 text-sm text-muted-foreground">Drop me a line here — messages land straight in my inbox.</p>

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

      <div className="mt-6 space-y-5">
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
            rows={4}
            className={inputCls + " resize-y"}
            placeholder="Tell me a bit about the role or project…"
          />
          {errors.message && <p className="mt-1 text-xs text-accent">{errors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="eyebrow inline-flex items-center gap-2 rounded-full border-2 border-teal bg-teal px-5 py-2 text-background transition-all duration-300 hover:bg-transparent hover:text-teal hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-wait"
        >
          {status === "sending" ? "Sending…" : "Send message →"}
        </button>

        {status === "sent" && (
          <p className="rise-in text-sm text-teal">Thanks — your message is on its way. I'll get back to you soon.</p>
        )}
        {status === "error" && errorMsg && (
          <p className="text-sm text-accent">
            {errorMsg}{" "}
            <a href="mailto:Danieleb278@gmail.com" className="text-teal link-underline">
              Danieleb278@gmail.com
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
