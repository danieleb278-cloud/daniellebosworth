import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { caseStudies } from "@/lib/case-studies";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "dscript — Product Strategy, UX & Marketing" },
      {
        name: "description",
        content:
          "Portfolio of dscript: product strategy, UX, and marketing case studies for early- and growth-stage teams.",
      },
      { property: "og:title", content: "dscript — Product Strategy, UX & Marketing" },
      {
        property: "og:description",
        content: "Selected case studies in product strategy, UX, and marketing.",
      },
    ],
  }),
  component: Index,
});

const marquee = [
  "Product Strategy",
  "UX Architecture",
  "Positioning",
  "Activation",
  "Go-to-Market",
  "Pricing",
  "Narrative Design",
  "Research",
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
    <section className="relative px-6 pt-40 pb-24 md:px-12 md:pt-56 md:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 mb-8 flex items-center justify-between md:col-span-12">
            <span className="eyebrow">№ 001 — Portfolio, Vol. VII</span>
            <span className="eyebrow hidden md:inline">Brooklyn / Remote</span>
          </div>
          <h1 className="col-span-12 font-display text-[clamp(3rem,10vw,9.5rem)] leading-[0.92] tracking-[-0.04em] rise-in">
            Strategy,
            <br />
            <span className="italic text-muted-foreground">structure</span>
            <span className="text-accent">,</span> and
            <br />
            the words in
            <br />
            between<span className="text-accent">.</span>
          </h1>
          <div className="col-span-12 mt-12 grid grid-cols-12 gap-6 border-t border-border pt-8">
            <p className="col-span-12 max-w-xl text-lg leading-relaxed md:col-span-7 md:col-start-1">
              I'm a product strategist, UX designer, and marketer helping early- and
              growth-stage teams turn ambitious products into legible businesses.
              Currently taking on two engagements this quarter.
            </p>
            <div className="col-span-12 grid grid-cols-2 gap-6 md:col-span-4 md:col-start-9">
              <Stat k="08" label="Years shipping" />
              <Stat k="34" label="Engagements" />
              <Stat k="11" label="Series A+ launches" />
              <Stat k="∞" label="Drafts thrown away" />
            </div>
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
            <span className="eyebrow col-span-12 md:col-span-2">§ Work</span>
            <h2 className="col-span-12 font-display text-4xl tracking-tight md:col-span-10 md:text-6xl">
              Three engagements, each chosen because the
              <span className="italic text-muted-foreground"> hard part </span>
              wasn't the obvious one.
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
                <div className="grid grid-cols-12 items-baseline gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-sm text-muted-foreground">
                      {cs.index}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="font-display text-3xl tracking-tight transition-transform duration-500 group-hover:-translate-y-1 md:text-5xl">
                      {cs.title}
                      <span className="text-accent">.</span>
                    </h3>
                    <p className="mt-3 max-w-xl text-base text-muted-foreground md:text-lg">
                      {cs.subtitle}
                    </p>
                  </div>
                  <div className="col-span-7 col-start-3 md:col-span-3 md:col-start-8">
                    <div className="flex flex-wrap gap-2">
                      {cs.tags.map((t) => (
                        <span
                          key={t}
                          className="eyebrow rounded-full border border-border px-3 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3 col-start-10 hidden text-right md:block md:col-span-2">
                    <span className="eyebrow link-underline">Read case →</span>
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
              An operator's eye, an editor's hand.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="font-display text-2xl leading-snug tracking-tight md:text-4xl">
                I built my first product team at twenty-four and have spent the
                decade since at the seam between
                <span className="italic"> what a product does </span>
                and
                <span className="italic"> what it means </span>
                to the people paying for it.
              </p>
            </Reveal>
            <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2">
              <Reveal delay={100}>
                <p className="text-base leading-relaxed text-background/80">
                  My background is unusual on purpose. I trained as an editor before
                  moving into product, which means I treat strategy documents,
                  interfaces, and pricing pages as the same artifact: a piece of
                  writing that has to argue its case quickly and stay readable for
                  a long time.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="text-base leading-relaxed text-background/80">
                  I work best with teams in the messy middle — somewhere between
                  the first ten customers and the first hundred. Past clients
                  include Series A SaaS, two healthtech companies, a freight
                  platform, and a handful of indie developer tools.
                </p>
              </Reveal>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-8 border-t border-background/20 pt-8 md:grid-cols-4">
              {[
                ["Strategy", "Positioning, pricing, narrative"],
                ["UX", "Onboarding, IA, research"],
                ["Marketing", "GTM, editorial, lifecycle"],
                ["Systems", "Design systems, brand voice"],
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
      year: "2023 — Now",
      role: "Independent — Product & Marketing Strategy",
      org: "dscript studio",
      detail:
        "Engagements with seed to Series B teams across SaaS, healthtech, and devtools.",
    },
    {
      year: "2021 — 2023",
      role: "Head of Product Marketing",
      org: "Compass Systems",
      detail:
        "Led repositioning during $40M Series B; rebuilt pricing and lifecycle programs.",
    },
    {
      year: "2018 — 2021",
      role: "Senior UX Designer",
      org: "Northstar Health",
      detail:
        "Owned patient onboarding and clinician dashboards across two product lines.",
    },
    {
      year: "2015 — 2018",
      role: "Editor & Strategist",
      org: "Field Quarterly",
      detail:
        "Independent magazine on systems, design, and the built environment.",
    },
  ];
  const tools = [
    "Figma", "Notion", "Linear", "Webflow", "Mixpanel", "Amplitude",
    "Maze", "Dovetail", "HubSpot", "GA4", "Framer", "Customer.io",
  ];
  return (
    <section id="resume" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 grid grid-cols-12 gap-6 border-b border-border pb-8">
          <span className="eyebrow col-span-12 md:col-span-2">§ Résumé</span>
          <h2 className="col-span-12 font-display text-4xl tracking-tight md:col-span-10 md:text-6xl">
            A decade across product, design, and editorial.
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
            <div className="rule-top mt-10 pt-6">
              <span className="eyebrow">Speaking</span>
              <p className="mt-3 text-sm text-muted-foreground">
                Config 2024 · UX London 2023 · SaaStr 2022
              </p>
            </div>
            <a
              href="/resume.pdf"
              className="eyebrow mt-10 inline-block link-underline"
            >
              Download PDF résumé →
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
              Have a hard
              <br />
              problem worth
              <br />
              <span className="italic text-muted-foreground">writing down</span>
              <span className="text-accent">?</span>
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
              <div>
                <span className="eyebrow">Email</span>
                <a
                  href="mailto:hello@dscript.studio"
                  className="mt-2 block font-display text-2xl link-underline"
                >
                  hello@dscript.studio
                </a>
              </div>
              <div>
                <span className="eyebrow">Calendar</span>
                <a
                  href="#"
                  className="mt-2 block font-display text-2xl link-underline"
                >
                  Book a 30-min intro
                </a>
              </div>
              <div>
                <span className="eyebrow">Elsewhere</span>
                <div className="mt-2 flex flex-col gap-1 font-display text-2xl">
                  <a href="#" className="link-underline">LinkedIn</a>
                  <a href="#" className="link-underline">Read.cv</a>
                  <a href="#" className="link-underline">Substack</a>
                </div>
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
        <span className="eyebrow">© {new Date().getFullYear()} dscript studio</span>
        <span className="eyebrow">
          Set in Fraunces &amp; Inter Tight · Built with intention
        </span>
      </div>
    </footer>
  );
}
