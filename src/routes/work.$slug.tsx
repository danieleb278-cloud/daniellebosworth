import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/reveal";
import { PlaceholderImage } from "@/components/placeholder-image";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.study.title} — dscript case study` },
          { name: "description", content: loaderData.study.summary },
          { property: "og:title", content: `${loaderData.study.title} — dscript` },
          { property: "og:description", content: loaderData.study.summary },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 font-display text-4xl">Case study not found</h1>
        <Link to="/" className="eyebrow mt-6 inline-block link-underline">
          Back to index →
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div>
          <h1 className="font-display text-3xl">Something went wrong.</h1>
          <button onClick={reset} className="eyebrow mt-4 link-underline">
            Try again
          </button>
        </div>
      </div>
    );
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study } = Route.useLoaderData() as { study: (typeof caseStudies)[number] };
  const currentIndex = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      {/* Header */}
      <section className="px-6 pt-40 pb-16 md:px-12 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex items-center justify-between border-b border-border pb-6">
            <Link to="/" className="eyebrow link-underline">
              ← Index
            </Link>
            <span className="eyebrow">
              Case {study.index} / {String(caseStudies.length).padStart(2, "0")}
            </span>
          </div>
          <Reveal>
            <span className="eyebrow">{study.discipline}</span>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,8vw,8rem)] leading-[0.95] tracking-[-0.03em]">
              {study.title}
              <span className="text-accent">.</span>
            </h1>
            <p className="mt-8 max-w-2xl font-display text-2xl leading-snug text-muted-foreground md:text-3xl">
              {study.subtitle}
            </p>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-border pt-8 md:grid-cols-4">
            {[
              ["Client", study.client],
              ["Year", study.year],
              ["Role", study.role],
              ["Duration", study.duration],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="eyebrow">{k}</dt>
                <dd className="mt-2 font-display text-lg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Hero image */}
      <section className="px-6 pb-16 md:px-12 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <PlaceholderImage
              label={`${study.title} — cover`}
              caption={`Fig. 01 — ${study.title}`}
              ratio="16/9"
            />
          </Reveal>
        </div>
      </section>

      {/* Pull quote */}
      <section className="border-y border-border bg-foreground px-6 py-20 text-background md:px-12 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="max-w-4xl font-display text-2xl leading-snug tracking-tight md:text-5xl">
            "{study.hero}"
          </p>
        </div>
      </section>

      {/* Context & challenge */}
      <section className="px-6 py-28 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6">
          <Reveal className="col-span-12 md:col-span-5">
            <span className="eyebrow">§ Context</span>
            <p className="mt-6 text-lg leading-relaxed">{study.context}</p>
          </Reveal>
          <Reveal delay={120} className="col-span-12 md:col-span-6 md:col-start-7">
            <span className="eyebrow">§ The challenge</span>
            <p className="mt-6 font-display text-2xl leading-snug md:text-3xl">
              {study.challenge}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-border px-6 py-28 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 grid grid-cols-12 gap-6">
            <span className="eyebrow col-span-12 md:col-span-2">§ Approach</span>
            <h2 className="col-span-12 font-display text-4xl tracking-tight md:col-span-10 md:text-5xl">
              Three moves, in sequence.
            </h2>
          </div>
          <ol className="divide-y divide-border">
            {study.approach.map((a, i) => (
              <Reveal key={a.title} delay={i * 80}>
                <li className="grid grid-cols-12 gap-6 py-10">
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-mono text-sm text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="col-span-10 font-display text-2xl tracking-tight md:col-span-5 md:text-3xl">
                    {a.title}
                  </h3>
                  <p className="col-span-10 col-start-3 text-base leading-relaxed text-muted-foreground md:col-span-5 md:col-start-8">
                    {a.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-t border-border bg-secondary px-6 py-28 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <span className="eyebrow">§ Outcomes</span>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3">
            {study.outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 100}>
                <div className="border-t border-border pt-6">
                  <div className="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-tight">
                    {o.metric}
                  </div>
                  <div className="eyebrow mt-4">{o.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Reflections */}
      <section className="px-6 py-28 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid grid-cols-12 gap-6">
            <span className="eyebrow col-span-12 md:col-span-2">§ Reflection</span>
            <p className="col-span-12 font-display text-3xl leading-snug tracking-tight md:col-span-9 md:text-5xl">
              {study.reflections}
            </p>
          </div>
        </div>
      </section>

      {/* Next */}
      <section className="border-t border-border">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group block px-6 py-20 md:px-12 md:py-28"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Next case — {next.index}</span>
              <span className="eyebrow link-underline">Continue →</span>
            </div>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em] transition-transform duration-500 group-hover:-translate-y-1">
              {next.title}
              <span className="text-accent">.</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              {next.subtitle}
            </p>
          </div>
        </Link>
      </section>

      <footer className="border-t border-border px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <span className="eyebrow">© {new Date().getFullYear()} dscript studio</span>
          <Link to="/" className="eyebrow link-underline">
            Back to index ↑
          </Link>
        </div>
      </footer>
    </div>
  );
}
