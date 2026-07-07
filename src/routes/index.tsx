import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { PlaceholderImage } from "@/components/placeholder-image";
import { caseStudies } from "@/lib/case-studies";
import { supabase } from "@/integrations/supabase/client";
import portrait from "@/assets/portrait.jpg.asset.json";
import resumePdf from "@/assets/resume.pdf.asset.json";
import earSketch from "@/assets/editorial/ear-sketch.png";
import eyeSketch from "@/assets/editorial/eye-sketch.png";
import fingerprintImg from "@/assets/fingerprint-light.png.asset.json";
import neuralImg from "@/assets/neural-light.png.asset.json";


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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />
      <Hero />
      <Marquee />
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
  return (
    <section className="relative overflow-hidden px-6 pt-32 pb-20 md:px-12 md:pt-48 md:pb-32">
      <HeroBackdrop />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
          <span className="eyebrow">№ 001 — Portfolio, 2026</span>
          <span className="eyebrow">Customer Experience, Design, and Strategy</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 items-stretch">
          <h1 className="col-span-12 flex flex-col justify-between font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.04em] md:col-span-8 md:order-2">
            <span className="block rise-in" style={{ animationDelay: "80ms" }}>Understanding <span className="italic">behavior</span><span className="text-teal">.</span></span>
            <span className="block rise-in" style={{ animationDelay: "220ms" }}>Designing <span className="italic">systems</span><span className="text-teal">.</span></span>
            <span className="block rise-in" style={{ animationDelay: "360ms" }}>Bridging <span className="italic">gaps</span><span className="text-teal">.</span></span>
          </h1>

          <div className="col-span-12 md:col-span-4 md:order-1 md:pt-2">
            <Reveal delay={120}>
              <ParallaxWrap>
                <div className="relative">
                  {/* soft radial glow behind portrait */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-8 md:-inset-12"
                    style={{
                      background:
                        "radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, var(--teal) 22%, transparent) 0%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <div className="relative overflow-hidden border-2 border-teal p-3 bg-charcoal shadow-xl card-lift">
                    <PlaceholderImage
                      src={portrait.url}
                      alt="Portrait of Danielle Bosworth"
                      label="Portrait"
                      caption="Danielle Bosworth"
                      ratio="4/5"
                      fit="cover-top"
                    />
                  </div>
                </div>
              </ParallaxWrap>
            </Reveal>
          </div>

        </div>

        <div className="mt-12 grid grid-cols-12 gap-6 border-t border-border pt-8 md:mt-16">
          <div className="col-span-12 max-w-2xl md:col-span-7 md:col-start-1">
            <Reveal delay={480}>
              <p className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
                People often tell one story — their behavior tells another. I
                design for the gap in between<span className="text-accent">.</span>
              </p>
            </Reveal>
            <Reveal delay={560}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                Before studying product design, I spent years working directly
                with customers. Those conversations taught me something research
                continues to confirm:
              </p>
            </Reveal>
            <Reveal delay={640}>
              <blockquote className="mt-5 border-l-2 border-teal pl-5 font-display text-xl leading-snug text-foreground md:text-2xl">
                What people say, what they do, and what they actually need are
                often three different things.
              </blockquote>
            </Reveal>
            <Reveal delay={720}>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
                My work focuses on understanding those gaps and designing better
                experiences around them.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Completing a Master of Business and Science in Product Design
                &amp; Innovation at Rutgers University.
              </p>
            </Reveal>

          </div>
          <div className="col-span-12 grid grid-cols-2 gap-6 md:col-span-4 md:col-start-9">
            <Stat k="175%" label="Revenue growth, branch ops" />
            <Stat k="+32%" label="Client retention" />
            <Stat k="04" label="Featured case studies" />
            <Stat k="MBS" label="Product Design, Rutgers" />
          </div>
        </div>
      </div>
    </section>
  );
}



function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const [fpVisible, setFpVisible] = useState(false);
  const [nnVisible, setNnVisible] = useState(false);

  useEffect(() => {
    // Delayed appearance — the viewer is reading, then slowly notices something is there.
    const t1 = setTimeout(() => setFpVisible(true), 1400);
    const t2 = setTimeout(() => setNnVisible(true), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    let tx = 0, ty = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      tx = ((e.clientX - cx) / rect.width) * -6;
      ty = ((e.clientY - cy) / rect.height) * -5;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* warm paper wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 20% 30%, color-mix(in oklab, var(--accent-yellow) 5%, transparent) 0%, transparent 60%), radial-gradient(60% 50% at 85% 75%, color-mix(in oklab, var(--teal) 4%, transparent) 0%, transparent 65%)",
        }}
      />
      <div ref={ref} className="absolute inset-0" style={{ willChange: "transform" }}>
        {/* Fingerprint — staggered behind portrait / upper-left. Fades in slowly then breathes. */}
        <img
          src={fingerprintImg.url}
          alt=""
          className="absolute select-none hero-breathe-fp"
          style={{
            top: "clamp(-160px, -10vw, -60px)",
            left: "clamp(-220px, -14vw, -100px)",
            width: "clamp(620px, 68vw, 1060px)",
            height: "auto",
            opacity: fpVisible ? 0.28 : 0,
            transform: fpVisible ? undefined : "scale(0.94)",
            transformOrigin: "38% 42%",
            transition: "opacity 4.5s cubic-bezier(0.4, 0, 0.2, 1), transform 6s cubic-bezier(0.4, 0, 0.2, 1)",
            mixBlendMode: "multiply",
            WebkitMaskImage:
              "radial-gradient(ellipse 62% 62% at 38% 42%, black 20%, rgba(0,0,0,0.75) 55%, transparent 88%)",
            maskImage:
              "radial-gradient(ellipse 62% 62% at 38% 42%, black 20%, rgba(0,0,0,0.75) 55%, transparent 88%)",
            filter: "contrast(1.05)",
          }}
        />
        {/* Neural network — starts up near "Designing systems" upper-right and drifts down. */}
        <img
          src={neuralImg.url}
          alt=""
          className="absolute select-none hero-breathe-nn"
          style={{
            top: "clamp(40px, 8vw, 140px)",
            right: "clamp(-200px, -12vw, -80px)",
            width: "clamp(620px, 66vw, 1000px)",
            height: "auto",
            opacity: nnVisible ? 0.34 : 0,
            transform: nnVisible ? undefined : "scale(0.94)",
            transformOrigin: "52% 38%",
            transition: "opacity 4.8s cubic-bezier(0.4, 0, 0.2, 1), transform 6.5s cubic-bezier(0.4, 0, 0.2, 1)",
            mixBlendMode: "multiply",
            WebkitMaskImage:
              "radial-gradient(ellipse 62% 58% at 52% 38%, black 22%, rgba(0,0,0,0.7) 60%, transparent 92%)",
            maskImage:
              "radial-gradient(ellipse 62% 58% at 52% 38%, black 22%, rgba(0,0,0,0.7) 60%, transparent 92%)",
            filter: "contrast(1.08)",
          }}
        />
      </div>
    </div>
  );
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
          <span
            key={i}
            className="font-display text-2xl tracking-tight md:text-3xl"
          >
            {t} <span className="text-accent soft-pulse">✦</span>
          </span>
        ))}
      </div>
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
              Four projects on UX research, product design, and
              <span className="italic text-muted-foreground"> system-level thinking</span>
              <span className="text-accent">.</span>
            </h2>
          </div>
        </Reveal>

        <div className="divide-y divide-border">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 100}>
              <Link
                to="/work/$slug"
                params={{ slug: cs.slug }}
                className="group block py-10 md:py-14"
              >
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
                    <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
                      {cs.subtitle}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {cs.tags.map((t) => (
                        <span
                          key={t}
                          className="eyebrow rounded-full border border-border px-3 py-1 transition-all duration-300 hover:border-teal hover:text-teal hover:-translate-y-0.5"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="eyebrow arrow-slide link-underline ml-auto hidden md:inline">
                        Read case <span className="arrow" aria-hidden>→</span>
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

  const baseImg: React.CSSProperties = {
    position: "absolute",
    filter: "invert(1) grayscale(1) contrast(0.9)",
    mixBlendMode: "screen",
    transition: "opacity 3.2s cubic-bezier(0.4, 0, 0.2, 1)",
    userSelect: "none",
    pointerEvents: "none",
  };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 0 }}
    >
      {/* Ear — spans top of section down past the quote, mostly cropped left. Barely-there ghost. */}
      <img
        src={earSketch}
        alt=""
        loading="lazy"
        width={1024}
        height={1024}
        className="sketch-breathe-ear"
        style={{
          ...baseImg,
          top: "clamp(-120px, -6vw, -40px)",
          left: "clamp(-520px, -30vw, -260px)",
          width: "clamp(1400px, 95vw, 2000px)",
          transition: "opacity 6s cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDelay: "1800ms",
          opacity: visible ? 0.11 : 0,
        }}
      />
      {/* Eye — nearly full-width across the strategy area, lower-right, slightly more visible. */}
      <img
        src={eyeSketch}
        alt=""
        loading="lazy"
        width={1024}
        height={1024}
        className="sketch-breathe-eye"
        style={{
          ...baseImg,
          bottom: "clamp(-360px, -22vw, -200px)",
          right: "clamp(-420px, -22vw, -220px)",
          width: "clamp(1500px, 105vw, 2200px)",
          transition: "opacity 6.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transitionDelay: "3200ms",
          opacity: visible ? 0.09 : 0,
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
                <span aria-hidden className="font-display text-5xl leading-none text-teal">“</span>
                <h2 className="mt-2 font-display text-4xl tracking-tight md:text-5xl">
                  One <span className="text-teal">ear</span> on the customer, one <span className="text-teal">eye</span> on the business.
                </h2>
                <figcaption className="eyebrow mt-4 text-background/60">— Operating philosophy</figcaption>
              </figure>
            </div>
          </div>



          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="font-display text-base leading-relaxed text-background/80 md:text-lg">
                I started in{" "}
                <span className="text-lg text-teal tracking-wide md:text-xl">
                  customer-facing leadership
                </span>
                , developed a deep curiosity about{" "}
                <span className="text-lg text-teal tracking-wide md:text-xl">
                  human behavior
                </span>
                , and pursued{" "}
                <span className="text-lg text-teal tracking-wide md:text-xl">
                  psychology
                </span>{" "}
                and{" "}
                <span className="text-lg text-teal tracking-wide md:text-xl">
                  product design
                </span>{" "}
                to better understand people and systems. Today I use{" "}
                <span className="text-lg text-teal tracking-wide md:text-xl">
                  research, strategy, and design thinking
                </span>{" "}
                to uncover{" "}
                <span className="text-lg text-teal tracking-wide md:text-xl">
                  insights
                </span>{" "}
                and build experiences that bridge customer needs and business
                goals.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
              <Reveal delay={100}>
                <p className="text-base leading-relaxed text-background/80">
                  My background blends psychology, product design, and years of
                  customer-facing leadership — from running a high-volume salon
                  branch to driving measurable growth through outreach, service
                  design, and CRM improvements. Today I shape education,
                  brand strategy, and digital operations for a professional
                  haircare company — always with the customer perspective at
                  the center.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-base leading-relaxed text-background/80">
                  I'm currently finishing an MBS in Product Design &amp;
                  Innovation at Rutgers. I'm at my best where customer insight
                  meets systems thinking — using research, analytics, and
                  AI-assisted workflows to turn complex problems into clear,
                  human-centered solutions.
                </p>
              </Reveal>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-background/20 pt-8 md:grid-cols-4">
              {[
                ["Strategy", "Positioning, roadmap input, VOC"],
                ["CX", "Journey mapping, service design"],
                ["Product", "UX research, IA, prototyping"],
                ["Marketing", "Content, social, brand, SEO"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-display text-lg">{k}</div>
                  <div className="eyebrow mt-1 text-background/60">{v}</div>
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
      year: "May 2025 — Now",
      role: "Product Specialist & Marketing Coordinator",
      org: "Magic Sleek · Manalapan, NJ",
      detail:
        "Bridging customer insight, brand strategy, and digital operations: educational content, social and email, trade show execution, Tableau/GA4 reporting, and an AI-powered internal knowledge assistant.",
    },
    {
      year: "Jan — May 2025",
      role: "Product Design Extern · MissTeePRO",
      org: "Rutgers MBS Externship",
      detail:
        "Competitive and ingredient research for professional haircare; built an Airtable research library and synthesized findings into product roadmap recommendations.",
    },
    {
      year: "2024 — Present",
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
    "Figma", "Miro", "Canva", "Adobe Creative Cloud", "CapCut",
    "Tableau", "GA4", "Search Console", "Salesforce", "Airtable",
    "Notion", "Shopify", "WordPress", "Webflow", "Meta Business Suite",
    "ChatGPT", "Gemini", "ElevenLabs",
  ];
  const skills = [
    "Product Strategy",
    "Customer Experience (CX)",
    "Customer Insights & VOC",
    "Journey Mapping",
    "Service Design",
    "Content Strategy",
    "Educational Content",
    "Copywriting & Editing",
    "Social Media & Brand",
    "SEO & Analytics",
    "Information Architecture",
    "Knowledge Management",
    "Process Improvement",
    "AI-Assisted Workflows",
    "Systems Thinking",
  ];
  return (
    <section id="resume" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 grid grid-cols-12 gap-6 border-b border-border pb-8">
          <span className="eyebrow col-span-12 md:col-span-2">§ Résumé</span>
          <h2 className="col-span-12 font-display text-2xl tracking-tight md:col-span-10 md:text-4xl">
            More than a designer, I've spent my career working at the intersection of{" "}
            <span className="text-teal">customers</span>,{" "}
            <span className="text-teal">operations</span>,{" "}
            <span className="text-teal">education</span>, and{" "}
            <span className="text-teal">product strategy</span>. My background combines{" "}
            <span className="text-teal">customer-facing leadership</span>,{" "}
            <span className="text-teal">psychology</span>,{" "}
            <span className="text-teal">research</span>, and{" "}
            <span className="text-teal">systems thinking</span>{" "}
            to solve problems from multiple perspectives.
          </h2>
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
                      <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                        {r.role}
                      </h3>
                      <div className="eyebrow mt-1">{r.org}</div>
                      <p className="mt-3 max-w-lg text-base text-muted-foreground">
                        {r.detail}
                      </p>
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
              download="Danielle_Bosworth_Resume.pdf"
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
      className="border-t border-border px-6 py-28 md:px-12 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6">
          <span className="eyebrow col-span-12 md:col-span-2">§ Contact</span>
          <div className="col-span-12 md:col-span-10">
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]">
                Let's bridge design, strategy,{" "}
                <span className="italic text-muted-foreground">and experience</span>
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
                  <ul className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-lg sm:text-xl">
                    {["Product Design", "UX Research", "Customer Experience", "Product Strategy"].map((s) => (
                      <li key={s} className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1">
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
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        phone: phone && phone.length > 0 ? phone : null,
        message,
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      });
      if (error) throw error;
      setStatus("sent");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("contact_messages insert failed", err);
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your message. You can email me directly instead.",
      );
    }
  }

  const inputCls =
    "mt-2 w-full border-b border-border bg-transparent py-2 font-display text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-teal focus:outline-none focus-visible:border-teal";

  return (
    <form onSubmit={onSubmit} className="border-l-0 md:border-l-2 md:border-teal md:pl-8">
      <span className="eyebrow">Send a message</span>
      <p className="mt-2 text-sm text-muted-foreground">
        Drop me a line here — messages land straight in my inbox.
      </p>

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
          <label className="eyebrow" htmlFor="cf-name">Name</label>
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
          <label className="eyebrow" htmlFor="cf-email">Email</label>
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
          <label className="eyebrow" htmlFor="cf-phone">Phone <span className="text-muted-foreground/60">(optional)</span></label>
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
          <label className="eyebrow" htmlFor="cf-message">Message</label>
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
          <p className="rise-in text-sm text-teal">
            Thanks — your message is on its way. I'll get back to you soon.
          </p>
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
      <span aria-hidden className="font-display text-xl leading-none">↑</span>
    </button>
  );
}

