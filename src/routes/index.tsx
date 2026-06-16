import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { caseStudies } from "@/lib/case-studies";
import portrait from "@/assets/portrait.jpg.asset.json";
import resumePdf from "@/assets/resume.pdf.asset.json";

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
    </div>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-32 pb-20 md:px-12 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2">
          <span className="eyebrow">№ 001 — Portfolio, 2026</span>
          <span className="eyebrow">Customer Experience, Design, and Strategy</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10 items-stretch">
          <h1 className="col-span-12 flex flex-col justify-between font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none tracking-[-0.04em] rise-in md:col-span-8 md:order-2">
            <span className="block">Understanding <span className="italic">behavior</span>.</span>
            <span className="block">Designing <span className="italic">systems</span>.</span>
            <span className="block">Bridging <span className="italic">gaps</span><span className="text-teal">.</span></span>
          </h1>

          <div className="col-span-12 md:col-span-4 md:order-1 md:pt-2">
            <Reveal delay={120}>
              <div className="overflow-hidden border-2 border-teal p-3 bg-charcoal shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <PlaceholderImage
                  src={portrait.url}
                  alt="Portrait of Danielle Bosworth"
                  label="Portrait"
                  caption="Danielle Bosworth"
                  ratio="4/5"
                  fit="cover-top"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6 border-t border-border pt-8 md:mt-16">
          <div className="col-span-12 max-w-2xl md:col-span-7 md:col-start-1">
            <p className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
              People often tell one story — their behavior tells another. I
              design for the gap in between<span className="text-accent">.</span>
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              Before studying product design, I spent years working directly
              with customers. Those conversations taught me something research
              continues to confirm: what people say, what they do, and what
              they actually need are often three different things. My work
              focuses on understanding those gaps and designing better
              experiences around them.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              Currently completing a Master of Business and Science (MBS) in
              Product Design &amp; Innovation at Rutgers University.
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-2 gap-6 md:col-span-4 md:col-start-9">
            <Stat k="175%" label="Revenue growth, branch ops" />
            <Stat k="+32%" label="Client retention" />
            <Stat k="03" label="Featured case studies" />
            <Stat k="MBS" label="Product Design, Rutgers" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, label }: { k: string; label: string }) {
  return (
    <div className="group border-t border-border pt-3 transition-colors duration-300 hover:border-teal">
      <div className="font-display text-2xl tracking-tight text-teal transition-transform duration-300 group-hover:-translate-y-0.5 sm:text-3xl">{k}</div>
      <div className="eyebrow mt-1 leading-tight">{label}</div>
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
            {t} <span className="text-accent">✦</span>
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
              Three projects on UX research, product design, and
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
                    <div className="overflow-hidden border-2 border-teal p-3 shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl bg-charcoal">
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
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-muted-foreground">
                        {cs.index}
                      </span>
                      <span className="eyebrow">{cs.discipline}</span>
                    </div>
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
                          className="eyebrow rounded-full border border-border px-3 py-1 transition-colors duration-300 hover:border-teal hover:text-teal"
                        >
                          {t}
                        </span>
                      ))}
                      <span className="eyebrow link-underline ml-auto hidden md:inline">
                        Read case →
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

function About() {
  return (
    <section id="about" className="bg-navy px-6 py-28 text-background md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-12 md:col-span-4 flex flex-col justify-center">
            <span className="eyebrow text-background/60">§ About</span>
            <h2 className="mt-6 font-display text-5xl tracking-tight md:text-6xl">
              One ear on the customer, one eye on the business.
            </h2>
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
          <h2 className="col-span-12 font-display text-4xl tracking-tight md:col-span-10 md:text-6xl">
            A path that blends customer-facing leadership, marketing operations,
            and applied product design.
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-8">
            <ol className="divide-y divide-border">
              {roles.map((r) => (
                <li key={r.role} className="grid grid-cols-12 gap-6 py-8">
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
                    className="eyebrow rounded-full border border-border px-3 py-1 transition-colors duration-300 hover:border-teal hover:text-teal"
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
                    className="eyebrow rounded-full border border-border px-3 py-1 transition-colors duration-300 hover:border-teal hover:text-teal"
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
            <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]">
              Let's bridge design, strategy,{" "}
              <span className="italic text-muted-foreground">and experience</span>
              <span className="text-accent">.</span>
            </h2>
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
                    className="mt-2 block break-all font-display text-xl link-underline sm:text-2xl"
                  >
                    /in/daniellelbosworth
                  </a>
                </div>
              </div>
              <div>
                <span className="eyebrow">Looking for</span>
                <p className="mt-2 font-display text-2xl">
                  Product Design, UX Research, Customer Experience, and Product Strategy opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <span className="eyebrow">© {new Date().getFullYear()} Danielle Bosworth</span>
        <span className="eyebrow">
          Set in Fraunces &amp; Inter Tight · Designed with intention
        </span>
      </div>
    </footer>
  );
}
