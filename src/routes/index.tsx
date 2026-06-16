import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { caseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Danielle Bosworth — Strategy, CX, Product & Marketing" },
      {
        name: "description",
        content:
          "Portfolio of Danielle Bosworth: a cross-functional specialist bridging customer insight, strategy, and business goals across product, CX, and marketing.",
      },
      { property: "og:title", content: "Danielle Bosworth — Strategy, CX, Product & Marketing" },
      {
        property: "og:description",
        content:
          "Selected case studies in product strategy, UX research, customer experience, and brand marketing.",
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
          <span className="eyebrow">Product Design / UX / Strategy</span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-10">
          <h1 className="col-span-12 font-display text-[clamp(2.5rem,9.5vw,8.5rem)] leading-[0.95] tracking-[-0.04em] rise-in md:col-span-8">
            A cross-functional
            <br />
            specialist bridging
            <br />
            <span className="italic text-muted-foreground">customer insight</span>
            <span className="text-accent">,</span> strategy
            <br />
            &amp; business goals<span className="text-accent">.</span>
          </h1>

          <div className="col-span-12 md:col-span-4 md:pt-2">
            <Reveal delay={120}>
              <PlaceholderImage
                label="Portrait"
                caption="Danielle Bosworth — upload photo here"
                ratio="4/5"
              />
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-12 gap-6 border-t border-border pt-8 md:mt-16">
          <div className="col-span-12 max-w-2xl md:col-span-7 md:col-start-1">
            <p className="font-display text-2xl leading-snug tracking-tight md:text-3xl">
              People often tell one story — their behavior tells another
              <span className="text-accent">.</span>{" "}
              <span className="text-muted-foreground">
                I design for the gap in between.
              </span>
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              I'm Danielle Bosworth — a marketing, product, and CX professional
              with a background in psychology, product design, and client-facing
              leadership. I work across research, content, and operations to
              translate what customers actually do into strategy, systems, and
              stories the business can act on.
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
    <div className="border-t border-border pt-3">
      <div className="font-display text-3xl tracking-tight">{k}</div>
      <div className="eyebrow mt-1">{label}</div>
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
                    <div className="overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                      <PlaceholderImage
                        label={`Project ${cs.index}`}
                        ratio="4/3"
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
                      <span className="text-accent">.</span>
                    </h3>
                    <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
                      {cs.subtitle}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      {cs.tags.map((t) => (
                        <span
                          key={t}
                          className="eyebrow rounded-full border border-border px-3 py-1"
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
    <section id="about" className="bg-foreground px-6 py-28 text-background md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <span className="eyebrow text-background/60">§ About</span>
            <h2 className="mt-6 font-display text-4xl tracking-tight md:text-5xl">
              An eye for behavior, a hand for systems.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="font-display text-2xl leading-snug tracking-tight md:text-4xl">
                I'm a product designer who started in an environment where
                <span className="italic"> understanding people </span>
                mattered just as much as technical skill — and that lens still
                shapes how I design today.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
              <Reveal delay={100}>
                <p className="text-base leading-relaxed text-background/80">
                  My background in cosmetology taught me to read behavior,
                  recognize unspoken needs, and translate them into outcomes
                  that felt right for each individual. That work strengthened
                  both my empathy and my eye for detail — and it still
                  influences how I think about aesthetics, communication, and
                  design.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-base leading-relaxed text-background/80">
                  Over time, the threads I once thought were scattered —
                  creativity, psychology, and problem-solving — became the
                  foundation of how I approach product design. I'm drawn to
                  patterns in behavior, friction in systems, and solutions that
                  bring clarity to complex workflows.
                </p>
              </Reveal>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-background/20 pt-8 md:grid-cols-4">
              {[
                ["Design", "Product, UX, interaction"],
                ["Research", "Interviews, card sorts, usability"],
                ["Strategy", "Customer experience, positioning"],
                ["Systems", "IA, workflows, design tokens"],
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
      year: "2024 — Now",
      role: "Product Designer — Independent",
      org: "Selected case studies & client projects",
      detail:
        "UX research, product design, and information architecture across travel, productivity, and open-source platforms.",
    },
    {
      year: "2023 — 2024",
      role: "Product Design Training",
      org: "Formal coursework & applied projects",
      detail:
        "Wireframing, prototyping, usability testing, and interaction design — paired with real-world client briefs.",
    },
    {
      year: "2018 — 2023",
      role: "Cosmetologist & Client Lead",
      org: "Independent practice",
      detail:
        "Years of one-on-one client work: reading behavior, surfacing unspoken needs, and translating them into outcomes.",
    },
  ];
  const tools = [
    "Figma", "Adobe XD", "Webflow", "Notion", "Maze", "Dovetail",
    "Miro", "FigJam", "Whimsical", "Loom",
  ];
  const skills = [
    "UX Research",
    "Information Architecture",
    "Wireframing & Prototyping",
    "Interaction Design",
    "Communication",
    "Customer Service & Experience",
  ];
  return (
    <section id="resume" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 grid grid-cols-12 gap-6 border-b border-border pb-8">
          <span className="eyebrow col-span-12 md:col-span-2">§ Résumé</span>
          <h2 className="col-span-12 font-display text-4xl tracking-tight md:col-span-10 md:text-6xl">
            A path that blends hands-on client work with formal design training.
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
                    className="eyebrow rounded-full border border-border px-3 py-1"
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
                    className="eyebrow rounded-full border border-border px-3 py-1"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#contact"
              className="eyebrow mt-10 inline-block link-underline"
            >
              Request full résumé →
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
              Let's bridge
              <br />
              design, strategy,
              <br />
              <span className="italic text-muted-foreground">and experience</span>
              <span className="text-accent">.</span>
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div>
                <span className="eyebrow">Email</span>
                <a
                  href="mailto:Danieleb278@gmail.com"
                  className="mt-2 block font-display text-2xl link-underline"
                >
                  Danieleb278@gmail.com
                </a>
              </div>
              <div>
                <span className="eyebrow">LinkedIn</span>
                <a
                  href="https://linkedin.com/in/daniellelbosworth"
                  className="mt-2 block font-display text-2xl link-underline"
                >
                  /in/daniellelbosworth
                </a>
              </div>
              <div>
                <span className="eyebrow">Looking for</span>
                <p className="mt-2 font-display text-2xl">
                  Cross-functional roles in product, UX, and CX.
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
