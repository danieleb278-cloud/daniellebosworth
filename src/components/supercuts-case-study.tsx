import { Reveal } from "@/components/reveal";
import type { CaseStudy } from "@/lib/case-studies";

function SectionHeader({ number, eyebrow, title }: { number: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted-foreground">{number} / 08</span>
        <span className="eyebrow text-teal">{eyebrow}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl tracking-tight md:text-5xl">
        {title}
        <span className="text-teal">.</span>
      </h2>
    </div>
  );
}

const systemNodes = [
  { label: "Customer experience", note: "What the visit actually felt like" },
  { label: "Staff capability & behavior", note: "Skill, confidence, consistency" },
  { label: "Daily operations", note: "Staffing, scheduling, service flow" },
  { label: "Local awareness & outreach", note: "Who knew the location existed" },
  { label: "Commercial performance", note: "The number everyone was watching" },
];

const interventions = [
  {
    lever: "Training & coaching",
    aim: "Service consistency",
    detail: "Worked with staff on service delivery and client conversations so the experience did not depend on who happened to be on the floor.",
  },
  {
    lever: "Contests & incentives",
    aim: "Engagement & accountability",
    detail: "Used contests and incentives to make performance visible and give the team something concrete to work toward together.",
  },
  {
    lever: "Operational & staffing changes",
    aim: "Capacity & reliability",
    detail: "Adjusted how the location was staffed and run so the schedule matched real demand and service could be delivered dependably.",
  },
  {
    lever: "Local outreach & business development",
    aim: "Demand generation",
    detail: "Built relationships with nearby businesses and pursued local outreach so the location was not waiting on walk-in traffic alone.",
  },
];

const loop = [
  { step: "Observe performance", note: "Weekly and monthly numbers plus what I saw on the floor" },
  { step: "Identify friction", note: "Where the experience or the operation was breaking down" },
  { step: "Intervene", note: "Training, incentive, staffing, or outreach change" },
  { step: "Monitor response", note: "Did the number and the behavior move together?" },
  { step: "Adjust", note: "Keep what worked, retire what did not" },
];

const demonstrates = [
  { title: "Service Operations", body: "Running and improving a live service location while it stayed open to customers." },
  { title: "Systems Thinking", body: "Treating the sales number as an output of connected people, process, and demand factors." },
  { title: "Customer Experience", body: "Designing for the consistency of the visit, not just the transaction at the end of it." },
  { title: "Performance Diagnosis", body: "Reading historical data for patterns before choosing where to intervene." },
  { title: "Team Enablement", body: "Coaching, incentives, and structure that let the team perform rather than be managed reactively." },
  { title: "Commercial Impact", body: "A measurable business result: 4×+ growth in monthly location sales." },
];

export function SupercutsCaseStudy({ study }: { study: CaseStudy }) {
  return (
    <>
      {/* Hero statement */}
      <section className="border-y border-border bg-foreground px-6 py-20 text-background md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="max-w-4xl font-display text-2xl leading-snug tracking-tight md:text-5xl">
            The problem looked like sales. The system behind it was bigger
            <span className="text-teal">.</span>
          </p>
          <div className="mt-12 grid gap-8 border-t border-background/20 pt-8 sm:grid-cols-3">
            {study.outcomes.map((o) => (
              <div key={o.label}>
                <div className="font-display text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-[-0.04em] text-teal">
                  {o.metric}
                </div>
                <div className="eyebrow mt-3 text-background/60">{o.label}</div>
              </div>
            ))}
          </div>
          <p className="eyebrow mt-8 text-background/45">
            Location-level monthly sales. The starting figure is a range, so the comparison is approximate.
          </p>
        </div>
      </section>

      {/* 01 Business context */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <SectionHeader number="01" eyebrow="Business Context" title="An inherited, underperforming location" />
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I started at the East Brunswick store and was promoted to manage the North Brunswick location, which was
                underperforming when I took it over. Monthly sales were running roughly $4–5K.
              </p>
              <p>
                This was not a design exercise. It was a live operating business with staff, customers, schedules, and
                daily service delivery — every one of them a dependency of the others. My title was Location Manager;
                looking back, the work is closest to service design and operations strategy.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 Baseline */}
      <section className="bg-secondary/40 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <SectionHeader number="02" eyebrow="Establishing the Baseline" title="Read the pattern before touching anything" />
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I reviewed roughly six months of prior performance data. The goal was not to react to a single bad
                month, but to see what was consistently true about how the location performed.
              </p>
              <p>
                Alongside the numbers, I spent time observing day-to-day service delivery and staff behavior. The data
                told me the shape of the problem; watching the floor told me where it was coming from.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 System map */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <SectionHeader number="03" eyebrow="Diagnosing the System" title="Low sales were an outcome, not the cause" />
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Each part of the location fed the next. A staffing gap changed the service experience, the service
              experience changed whether clients came back, and local awareness determined whether new clients arrived
              at all. Sales sat at the end of that chain.
            </p>
            <figure className="mt-12">
              <ol className="grid gap-3 md:grid-cols-5">
                {systemNodes.map((n, i) => (
                  <li key={n.label} className="relative flex h-full flex-col border border-border bg-background p-5">
                    <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</span>
                    <span className="mt-3 font-display text-lg leading-snug">{n.label}</span>
                    <span className="mt-2 text-sm text-muted-foreground">{n.note}</span>
                    {i < systemNodes.length - 1 && (
                      <span aria-hidden className="absolute -right-3 top-1/2 hidden -translate-y-1/2 font-mono text-teal md:block">
                        ↔
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <figcaption className="eyebrow mt-4 text-muted-foreground">
                Fig. 01 · Portfolio synthesis of the turnaround approach — the service system behind the sales number.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 04 Interventions */}
      <section className="bg-charcoal px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <div className="mb-10">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-background/50">04 / 08</span>
                <span className="eyebrow text-teal">Intervention Strategy</span>
              </div>
              <h2 className="mt-4 font-display text-3xl tracking-tight text-background md:text-5xl">
                Coordinated levers, not isolated tactics<span className="text-teal">.</span>
              </h2>
            </div>
            <p className="max-w-3xl text-base leading-relaxed text-background/70 md:text-lg">
              No single change was going to move the location. The interventions were run together so improvements in
              one area were not undone by weakness in another.
            </p>
            <div className="mt-12 grid gap-px bg-background/20 md:grid-cols-2">
              {interventions.map((it) => (
                <div key={it.lever} className="bg-charcoal p-7 md:p-8">
                  <span className="eyebrow text-teal">{it.aim}</span>
                  <h3 className="mt-3 font-display text-2xl text-background">{it.lever}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-background/70 md:text-base">{it.detail}</p>
                </div>
              ))}
            </div>
            <figcaption className="eyebrow mt-4 text-background/45">
              Fig. 02 · Portfolio synthesis of the intervention levers used during the turnaround.
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* 05 Feedback loop */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <SectionHeader number="05" eyebrow="Feedback Loop" title="A practical management loop, run monthly" />
            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {loop.map((l, i) => (
                <li key={l.step} className="border-t-2 border-teal pt-4">
                  <span className="font-mono text-xs text-teal">0{i + 1}</span>
                  <div className="mt-2 font-display text-lg leading-snug">{l.step}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{l.note}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              There was no formal dashboard or research program behind this — it was performance reporting, observation,
              and a habit of checking whether a change actually held before moving on to the next one.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 06 Outcome */}
      <section className="border-y border-border bg-foreground px-6 py-24 text-background md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-background/50">06 / 08</span>
              <span className="eyebrow text-teal">Commercial Outcome</span>
            </div>
            <div className="mt-10 grid items-end gap-10 md:grid-cols-[1fr_auto_1fr]">
              <div>
                <span className="eyebrow text-background/55">Baseline</span>
                <div className="mt-3 font-display text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-[-0.04em]">
                  ~$4–5K
                </div>
                <p className="eyebrow mt-3 text-background/50">Monthly location sales</p>
              </div>
              <div aria-hidden className="font-display text-4xl text-teal md:pb-6">→</div>
              <div>
                <span className="eyebrow text-teal">After ~13 months</span>
                <div className="mt-3 font-display text-[clamp(2.5rem,7vw,5rem)] leading-none tracking-[-0.04em] text-teal">
                  $20K+
                </div>
                <p className="eyebrow mt-3 text-background/50">Monthly location sales · 4×+ growth</p>
              </div>
            </div>
            <p className="mt-10 max-w-3xl text-base leading-relaxed text-background/70 md:text-lg">
              These are location-level monthly sales. Because the starting point was a range of roughly $4–5K, the 4×+
              comparison is approximate. The growth followed the coordinated changes across people, operations,
              experience, and local demand rather than any one tactic.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 07 What this demonstrates */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <SectionHeader number="07" eyebrow="What This Demonstrates" title="Systems thinking inside a live business" />
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {demonstrates.map((d) => (
                <div key={d.title}>
                  <h3 className="font-display text-xl">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08 Reflection */}
      <section className="bg-secondary/40 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1100px]">
          <Reveal>
            <SectionHeader number="08" eyebrow="Reflection" title="The number was the signal" />
            <p className="max-w-4xl font-display text-2xl leading-snug tracking-tight md:text-4xl">
              The sales number was the signal, not the diagnosis. The turnaround came from treating the location as an
              interconnected service system rather than trying to fix one metric in isolation
              <span className="text-teal">.</span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
